import Axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { connect } from 'react-redux';

class Addproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            sub_categories:[],
            all_subcategories:[],
            cat_id:'',
            p_code:'',
            p_name:'',
            p_quantity_type:'',
            p_enabled:true,
            error_string:'',
            loading:false,
            purchase_price:0,
            retail_price:0,
            stock:0
        }
    }
    p_code(e){
        this.setState({
            p_code:e.target.value
        })
    }
    p_name(e){
        this.setState({
            p_name:e.target.value
        })
    }
    purchase_price(e){
        this.setState({
            purchase_price:e.target.value
        })
    }
    retail_price(e){
        this.setState({
            retail_price:e.target.value
        })
    }
    stock(e){
        this.setState({
            stock:e.target.value
        })
    }
    p_description(e){
        this.setState({
            p_description:e.target.value
        })
    }
    p_varient_type(e){
        this.setState({
            p_varient_type:e.target.value
        })
    }
    p_quantity_type(e){
        this.setState({
            p_quantity_type:e.target.value
        })
    }
    p_enabled(e){
        this.setState({
            p_enabled:!this.state.p_enabled
        })
    }
    p_featued(e){
        this.setState({
            p_featued:!this.state.p_featued
        })
    }
    p_retail(e){
        this.setState({
            p_retail:!this.state.p_retail
        })
    }
    out_of_stock(e){
        this.setState({
            out_of_stock:!this.state.out_of_stock
        })
    }
    short_p_description(e){
        this.setState({
            short_p_description:e.target.value
        })
    }
    p_distribution(e){
        this.setState({
            p_distribution:e.target.value
        })
    }
    componentDidMount(){
        let senderdata = {
            user:this.props.user.id
        }
        Axios.post('/api/get_allcategories',senderdata).then(res=>{
            this.setState({
                categories:res.data
            })
        })

    }
    //creating new varient
    add_varient() {
        let temp_arr = this.state.varients;
        temp_arr.push({ type: '', varient: '', price: 0 })
        this.setState({
            varients: temp_arr
        })
    }

    cat_id(e){
        this.setState({
            cat_id:e.target.value
        })
    }



    handleSubmit(e) {
        e.preventDefault();

        let senderdata = {
            product_code:this.state.p_code,
            product_name: this.state.p_name,
            product_quantity_type: this.state.p_quantity_type,
            p_enabled:this.state.p_enabled,
            category_id:this.state.cat_id,
            purchase_price:this.state.purchase_price,
            retail_price:this.state.retail_price,
            stock:this.state.stock,
            user:this.props.user.id
        }
        this.setState({
            loading:true
        })
        console.log(senderdata);
        Axios.post('/api/add_product', senderdata)
            .then(res => {
                this.setState({
                    loading:false
                })
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                    })
                this.props.history.push('products-list');

                }else{
                   this.setState({
                       error_string:res.data.msg
                   })
                }

        });

    }



    render() {
        return (
            <div id="addproducts" >
                <div className="top_section_title_div">
                    <h2 className="section_title">Add New Product</h2>
                </div>
                <div >
                    <div className="card p-3 content_card_div mt-4 mb-5">
                        <div className="row col-md-12">
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Product code</label>
                                <input onChange={this.p_code.bind(this)} type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Product Name</label>
                                <input onChange={this.p_name.bind(this)}  type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>


                           <div class="form-group input_div col-md-6">
                               <label className="input_label" for="exampleInputEmail1">Category</label>
                               <select onChange={this.cat_id.bind(this)} type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  >
                                   <option value="">Choose..</option>
                                   {
                                       this.state.categories.map((data,index)=>{
                                           return(
                                           <option key={index} value={data.id}>{data.cname}</option>
                                           )
                                       })
                                   }
                               </select>
                           </div>

                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Purchase Price</label>
                                <input onChange={this.purchase_price.bind(this)}  type="number" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Retail Price</label>
                                <input onChange={this.retail_price.bind(this)}  type="number" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Available Stock</label>
                                <input onChange={this.stock.bind(this)}  type="number" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  />
                            </div>
                        </div>

                        <div className="row col-md-12">

                            <div class="form-group input_div   col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Quantity type</label>
                                <select onChange={this.p_quantity_type.bind(this)}  type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  >
                                    <option value="">Choose..</option>
                                    <option value="Piece">Piece</option>
                                    <option value="KG">KG</option>
                                    <option value="Pack">Pack</option>

                                </select>
                            </div>
                        </div>


                        <div className=" input_div col-md-5">
                            <div className="row">
                                <input onChange={this.p_enabled.bind(this)} checked={this.state.p_enabled}  type="checkbox" className="ml-3 mt-1"></input>
                                <h5 className="ml-2 input_label">Product Enabled</h5>
                            </div>
                            <p className="ml-3 ">Show Product on Website and Allow purchasing of product.</p>
                        </div>

                        {
                            this.state.error_string != ''?
                            <p className="text-danger  ml-3">{this.state.error_string}</p>
                            :null
                        }
                        <div className="submit_btn">
                            <button onClick={this.handleSubmit.bind(this)} style={{width:'150px'}} className="btn btn-success ml-3 mb-5">
                                {
                                    this.state.loading ?
                                    <div id="displayspinner" >
                                    <div className="spinner-border small_loader  ml-2 spinner_format"  role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                  </div>
                                  :<>Add Product</>
                                }
                                </button>
                        </div>
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
export default connect(mapStateToProps)(Addproduct);
