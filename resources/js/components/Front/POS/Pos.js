import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2';
class Pos extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            search_string:'',
            categories:[],
            qty:0,
            invoice_products:[],
            subtotal:0,
            grandtotal:0,
            discount:0,
            loading:false,
            filterproducts:[]
        }
    }

    componentDidMount(){
        let senderdata={
            user:this.props.user.id
        }
        Axios.post('/api/get_user_product',senderdata).then(res=>{
            this.setState({
                products:res.data
            })
        })
        Axios.post('/api/get_allcategories',senderdata).then(res=>{
            this.setState({
                categories:res.data
            })
        })
    }
    filterList(e) {
        let value  = e.target.value;
        if(value != ''){
            var updatedList = [];
            var List = this.state.products;
            for(var i=0;i<List.length;i++){
            updatedList = List.filter(
              (item) => Object.keys(item).some(key => item[key].toString().toUpperCase().search(value.toUpperCase()) !== -1)
            );

            }

              this.setState({
                filterproducts: updatedList,
            });
        }else{
            this.setState({
                filterproducts:[]
            })
        }

      }
    search(e){
        this.setState({
            search_string:e.target.value
        },function(){
            this.search_products();
        })
    }
    search_products(){
        let senderdata = {
            string:this.state.search_string,
            user:this.props.user.id
        }
        if(this.state.search_string != ''){
            Axios.post('/api/search_product',senderdata).then(res=>{
                console.log(res.data);
                this.setState({
                    products:res.data
                })
            })
        }
    }
    qty(val,index){
       let temp_ = this.state.products;
       temp_.map((data,ind)=>{
           if(index == ind){
               data.qty = val;
           }
       })
        this.setState({
            products:temp_
        },function(){
            this.calculate_totals();
        })
    }
    AddToBucket(data){
        if(data.qty != 0){
        let temp = this.state.invoice_products;
        let check = 0;
        temp.map(d=>{
            if(d.id == data.id){
                Swal.fire({
                    icon: 'error',
                    title: 'Product Added Already',
                    showConfirmButton: false,
                    timer: 1500
                    })
                check = 1;
            }
        })
        if(check == 0){
            temp.push(data);
            this.setState({
                invoice_products:temp
            },function(){
                this.calculate_totals();
            })
        }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Please Add Quantity.',
                showConfirmButton: false,
                timer: 1500
                })
        }
    }
    DeleteFromBucket(index){
        let temp = this.state.invoice_products;
        temp.splice(index,1);
        this.setState({
            invoice_products:temp
        })
    }
    calculate_totals(){
        let subtotal = 0;
        this.state.invoice_products.map(data=>{
            subtotal  = subtotal + data.qty * data.retail_price;
        })
        console.log(this.state.discount);
        this.setState({
            subtotal:subtotal,
            grandtotal: subtotal - this.state.discount
        })
    }
    discount(e){
        let val = e.target.value;
        this.setState({
            grandtotal: this.state.subtotal - val,
            discount:val
        })
    }
    generate_invoice(){
        let payload = {
            invoice_products:this.state.invoice_products,
            subtotal:this.state.subtotal,
            discount:this.state.discount,
            grandtotal:this.state.grandtotal,
            user:this.props.user.id,
        }
        this.setState({
            loading:true
        })
        Axios.post('/api/generate_invoice',payload,{
            responseType: 'blob'
        }).then(response=>{
            this.setState({
                loading:false,
                products:[],
                invoice_products:[],
                subtotal:0,
                grandtotal:0,
                discount:0,
                search_string:''
            })
            const file = new Blob(
                [response.data],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        })
    }
    save_invoice(){
        let payload = {
            invoice_products:this.state.invoice_products,
            subtotal:this.state.subtotal,
            discount:this.state.discount,
            grandtotal:this.state.grandtotal,
            user:this.props.user.id,
        }

        Axios.post('/api/save_invoice',payload).then(res=>{
            this.setState({
                products:[],
                invoice_products:[],
                subtotal:0,
                grandtotal:0,
                discount:0,
                search_string:''
            })
            Swal.fire({
                icon: 'success',
                title: 'Invoice #'+res.data.id+" Saved SuccessFully.",
                showConfirmButton: true,
                })
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6 " style={{background:'#f7f7f7'}}>
                    <h2 className="text-center">Invoice Bucket</h2>
                    <div style={{height:'350px'}} className="card card-signin my-3 p-3 animate_auth_modal">
                    {
                        this.state.invoice_products.length > 0 ?
                    <table className="table table-hover table-light table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Qty.</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.state.invoice_products.map((data,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.qty}</td>
                                                <td>{data.qty * data.retail_price}</td>
                                                <td>
                                                    <button onClick={this.DeleteFromBucket.bind(this)} className="btn btn-outline-danger"><i className="fas fa-trash-alt"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <div className="text-center p-5 mt-5 mb-5">
                            <img src="https://img.icons8.com/cotton/50/000000/fast-cart.png"/>
                            <h5>Your Bucket is Empty.</h5>
                        </div>
                    }

                    </div>
                        <div className="row">
                        <div className="col-md-6 p-2">
                        <div className="card card-signin  p-3 animate_auth_modal">
                            <h5>Subtotal
                                <span style={{float:'right'}}><strong>{this.state.subtotal}</strong></span>
                            </h5>
                            <div className="row p-3">
                                <label className="input_label" >Discount</label>
                                <input onChange={this.discount.bind(this)} type="number" class="form-control "  />
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6 p-2">
                            <div className="card card-signin p-3 animate_auth_modal ">
                                <h5>Grand Total
                                    <span style={{float:'right',fontSize:'30px'}}>
                                        <strong>{this.state.grandtotal}</strong></span>
                                </h5>

                            </div>
                            <div className=" row  mt-5 ">
                                            <h1 className="col-md-1"></h1>
                                            <button  onClick={this.generate_invoice.bind(this)} className=" ml-5 btn btn-success">
                                            {
                                    this.state.loading ?
                                    <div id="displayspinner" >
                                    <div className="spinner-border small_loader  ml-2 spinner_format"  role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                  </div>
                                  :<>
                                    <i className="fas fa-save"> </i> & <i className="fas fa-print"></i></>
                                }
                                              </button>
                                            <button  onClick={this.save_invoice.bind(this)}  className="btn btn-info ml-5"><i className="fas fa-save"> </i> Save</button>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                <div class="form-group">
                                <div className="row mb-2">
                                    <div className="col-md-6">
                                        <input autoFocus type="email" onChange={this.filterList.bind(this)} class="form-control ml-1 mt-2"
                                        aria-describedby="emailHelp" placeholder="Search by Id, code, Name" />
                                    </div>
                                    <div class="form-group input_div col-md-6 mt-2">
                                        <select onChange={this.filterList.bind(this)} type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  >
                                            <option value="">--Choose Category--</option>
                                            {
                                                this.state.categories.map((data,index)=>{
                                                    return(
                                                    <option key={index} value={data.id}>{data.cname}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    {/* <div className="col-md-2 ml-1">
                                        <button onClick={this.search_products.bind(this)} className="btn btn-success ml-1 mt-2">Search</button>
                                    </div> */}
                                </div>
                            </div>


                    <div className=" mt-4 mb-5 ">
                        <table className="table table-hover table-light table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                    <th>Select Qty.</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.filterproducts.map((data,index)=>{
                                        return(
                                            <tr key={"ind"+index}>
                                                <td>{index+1}</td>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.cname}</td>
                                                <td>{data.stock}</td>
                                                <td>{data.retail_price}</td>
                                                <td>
                                                    <input style={{width:'80px'}} value={data.qty || 0}  type="number" className="form-control" onChange={(e)=>{this.qty(e.target.value,index)}}></input>
                                                </td>
                                                <td>
                                                    <button onClick={this.AddToBucket.bind(this,data)} className="btn btn-outline-info"><i className="fas fa-plus-circle"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    this.state.products.length == 0 ?
                                    <tr><td colSpan="8" className="text-center">No records. Search Products to Add.</td></tr>:null
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(Pos);
