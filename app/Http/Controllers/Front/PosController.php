<?php

namespace App\Http\Controllers\Front;

use App\Category;
use App\Http\Controllers\Controller;
use App\Product;
use Validator;
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
        $new_cat->name = $request->name;
        $new_cat->user = $request->user;
        $new_cat->save();
    }

    public function update_category(Request $request){
        $up_cat = Category::find($request->id);
        $up_cat->name = $request->name;
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
    public function search_product(Request $request){
        $products = Product::where('id', 'like', '%' .$request->string. '%')
                    ->where('user', $request->user)
                    ->orWhere('code', 'like', '%' . $request->string . '%')
                    ->orWhere('name', 'like', '%' . $request->string . '%')
                    ->orWhere('category_id', 'like', '%' . $request->string . '%')
                    ->limit(100)->with('category')->get();

        return $products;
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
