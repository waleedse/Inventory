<?php

namespace App\Http\Controllers\Front;

use App\Category;
use App\Http\Controllers\Controller;
use App\Invoice;
use App\InvoiceProducts;
use App\Product;
use App\User;
use DateTime;
use Validator;
use PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addcategory(Request $request){
        $new_cat = new Category();
        $new_cat->cname = $request->name;
        $new_cat->user = $request->user;
        $new_cat->save();
    }

    public function update_category(Request $request){
        $up_cat = Category::find($request->id);
        $up_cat->cname = $request->name;
        $up_cat->save();
    }

    public function get_allcategories(Request $request){
        $cats = Category::where('user',$request->user)->get();
        return $cats;
    }
    public function delete_category(Request $request){
        $up_cat = Category::find($request->id);
        $up_cat->delete();
    }
    public function get_all_products(Request $request){
        $products = Product::where('user',$request->user)->with('category')->get();
        return $products;
    }
    public function get_product_by_id(Request $request){
        $products = Product::find($request->id);
        return $products;
    }
    public function add_product(Request $request){
        $validator = Validator::make($request->all(), [
            'product_code' => 'required',
            'product_name' => 'required',
            'product_quantity_type' => 'required',
            'category_id' => 'required',
            'purchase_price' => 'required',
            'retail_price' => 'required',
            'stock' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first(),'errors' => $validator->errors()];
            return $response;
        }
        $p_code = DB::table('products')
                        ->where('code',$request->p_code)
                        ->get();
        if(sizeof($p_code) == 0){
            $new_product = new Product();
            $new_product->name = $request->product_name;
            $new_product->code = $request->product_code;
            $new_product->qty_type = $request->product_quantity_type;
            $new_product->enabled = $request->p_enabled;
            $new_product->category_id = $request->category_id;
            $new_product->purchase_price = $request->purchase_price;
            $new_product->retail_price = $request->retail_price;
            $new_product->stock = $request->stock;
            $new_product->user = $request->user;
            $new_product->save();

                $response = ['status' => 200 , 'msg' => 'Product Added SuccessFully.'];
                return $response;
        }else{
            $response = ['status' => 219 , 'msg' => 'Product Code already exists.'];
            return $response;

        }

    }
    // Update Product
    public function update_product(Request $request){
        $validator = Validator::make($request->all(), [
            'product_code' => 'required',
            'product_name' => 'required',
            'product_quantity_type' => 'required',
            'category_id' => 'required',
            'purchase_price' => 'required',
            'retail_price' => 'required',
            'stock' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first(),'errors' => $validator->errors()];
            return $response;
        }
        $new_product = Product::find($request->product_id);
        $new_product->name = $request->product_name;
        $new_product->code = $request->product_code;
        $new_product->qty_type = $request->product_quantity_type;
        $new_product->enabled = $request->p_enabled;
        $new_product->category_id = $request->category_id;
        $new_product->purchase_price = $request->purchase_price;
        $new_product->retail_price = $request->retail_price;
        $new_product->stock = $request->stock;
        $new_product->save();
        $response = ['status' => 200 , 'msg' => 'Product Updated SuccessFully.'];
        return $response;
    }
    public function get_user_product(Request $request){
        $products = DB::table('products')->
        join('categories','products.category_id' ,'=','categories.id')
        ->where('products.user', $request->user)
        ->select('products.id','products.name','products.category_id','products.retail_price'
        ,'products.stock','products.qty','products.enabled','categories.cname')
        ->get();

        return $products;
    }

    public function save_invoice(Request $request){
        $invoice = new Invoice();
        $invoice->subtotal = $request->subtotal;
        $invoice->grandtotal = $request->grandtotal;
        $invoice->discount = $request->discount;
        $invoice->date = date("Y-m-d");
        $invoice->user_id = $request->user;
        $invoice->save();
        if(sizeof($request->invoice_products) > 0){
            foreach($request->invoice_products as $product){
                $InvoiceProduct = new InvoiceProducts();
                $InvoiceProduct->product_id = $product['id'];
                $InvoiceProduct->invoice_id = $invoice->id;
                $InvoiceProduct->retail_price = $product['retail_price'];
                $InvoiceProduct->qty = $product['qty'];
                $InvoiceProduct->save();
                $p = Product::find($product['id']);
                $p->stock = $p->stock - (int) $product['qty'];
                $p->save();
            }
        }
       return $invoice;
    }
    public function generate_invoice(Request $request){
        $invoice = new Invoice();
        $invoice->subtotal = $request->subtotal;
        $invoice->grandtotal = $request->grandtotal;
        $invoice->discount = $request->discount;
        $invoice->date = date("Y-m-d");
        $invoice->user_id = $request->user;
        $invoice->save();
        if(sizeof($request->invoice_products) > 0){
            foreach($request->invoice_products as $product){
                $InvoiceProduct = new InvoiceProducts();
                $InvoiceProduct->product_id = $product['id'];
                $InvoiceProduct->invoice_id = $invoice->id;
                $InvoiceProduct->retail_price = $product['retail_price'];
                $InvoiceProduct->qty = $product['qty'];
                $InvoiceProduct->save();
                $p = Product::find($product['id']);
                $p->stock = $p->stock - (int) $product['qty'];
                $p->save();
            }
        }
        $user = User::find($request->user);
        view()->share('invoice',$invoice);
        view()->share('user',$user);
        view()->share('invoice_products',$request->invoice_products);
        $pdf = PDF::loadView('Pdf/Invoice');
        $pdf->setPaper('A5', 'portrait');
        return $pdf->stream();
    }
    public function search_sales(Request $request){
        $invoice = Invoice::where('user_id',$request->user_id)->get();
        $sales = [];
        $invoice_totals = 0;
        $total_invoices = 0;
        $filter_invoices = [];
        foreach($invoice as $i){
            if(new DateTime($request->startdate) <= new DateTime($i->date) &&  new DateTime($request->enddate) >= new DateTime($i->date)){
                $invoice_totals = $invoice_totals + (int) $i->grandtotal;
                $total_invoices = $total_invoices + 1;
                $filter_invoices[] = $i;
            }
        }
        if(sizeof($filter_invoices) > 0 ){
            $response = ['status' => 200 , 'invoice_totals' => $invoice_totals , 'total_invoices' => $total_invoices , 'invoices' => $filter_invoices];
            return $response;
        }else{
            $response = ['status' => 404 , 'invoices' => $filter_invoices];
            return $response;
        }
    }
    public function print_sales_report(Request $request){
        $invoices = $this->search_sales($request);
        $user = User::find($request->user_id);
        $startdate = $request->startdate;
        $enddate = $request->enddate;
        $title = 'Invoices Sale Report';
        view()->share('invoices',$invoices);
        view()->share('startdate',$startdate);
        view()->share('enddate',$enddate);
        view()->share('title',$title);
        view()->share('user',$user);
        $pdf = PDF::loadView('Pdf/SalesReport');
        $pdf->setPaper('A4', 'portrait');
        return $pdf->stream();
    }
    public function get_invoice_by_id(Request $request){
        $invoice = Invoice::where('id',$request->id)->first();
        $invoice->invoice_products = InvoiceProducts::where('invoice_id',$request->id)->with('product')->get();
        return $invoice;
    }
    public function get_admin_dash_data(Request $request){
        $todays_invoices = Invoice::where('user_id',$request->user_id)->where('date',date("Y-m-d"))->get();
        $sales = 0;
        $revenue = 0;
        if(sizeof($todays_invoices) > 0 ){
            foreach($todays_invoices as $ti){
                $sales = $sales + sizeof(InvoiceProducts::where('invoice_id',$ti->id)->get());
                $revenue = $revenue + $ti->grandtotal;
            }
        }
        $products = Product::where('user',$request->user_id)->get();
        $o_dates = [];
        $charorders = Invoice::orderBy('id', 'DESC')->where('user_id',$request->user_id)->limit(100)->get();
        foreach($charorders as $o){
          if(sizeof($o_dates) > 0){
            $check = 0;
            foreach($o_dates as $od){
                if($od == $o->date){
                    $check = 1;
                }
            }
            if($check == 0){
                array_push($o_dates,$o->date);
            }
          }else{
            array_push($o_dates,$o->date);
          }
        }
        $dates_invoices = [];
        foreach($o_dates as $od){
            $dates_invoices[] = sizeof(Invoice::where('date',$od)->where('user_id',$request->user_id)->get());
        }

        $response = ['todays_invoices' => sizeof($todays_invoices),
        'todays_sales' => $sales , 'revenue' => $revenue ,
        'dates' => $o_dates , 'date_invoices' => $dates_invoices,
        'products' => sizeof($products)
        ];
        return $response;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
