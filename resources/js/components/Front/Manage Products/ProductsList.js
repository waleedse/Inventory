import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            search_string:'',
            categories:[],
            filteProducts:[]
        }
    }

    componentDidMount(){
        let senderdata={
            user:this.props.user.id
        }
        Axios.post('/api/get_user_product',senderdata).then(res=>{
            this.setState({
                products:res.data,
                filteProducts:res.data
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
            var updatedList = [];
            var List = this.state.products;
            for(var i=0;i<List.length;i++){
            updatedList = List.filter(
              (item) => Object.keys(item).some(key => item[key].toString().toUpperCase().search(value.toUpperCase()) !== -1)
            );

            }

              this.setState({
                filteProducts: updatedList,
            });
      }
    DeleteProduct(id,i){
        let senderdata={
            id:id
        }
        Axios.post('/api/deleteproduct',senderdata).then(res=>{

            var products = this.state.products;
            products.splice(i,1);
            this.setState({
                products:products
            })
        });
    }
    search(e){
        this.setState({
            search_string:e.target.value
        })
    }
    search_products(){
        let senderdata = {
            string:this.state.search_string,
            user:this.props.user.id
        }
        Axios.post('/api/search_product',senderdata).then(res=>{
            console.log(res.data);
            this.setState({
                products:res.data
            })
        })
    }
    render() {
        return (
            <div >
               <div className="top_section_title_div">
                    <h2 className="section_title">Products List</h2>
                </div>

                <div className="container-fluid">
                <div className="card content_card_div mt-4 mb-5">

                            <div class="form-group input_div col-md-12">
                                <div className="row mb-2">
                                    <div className="col-md-6">
                                        <input type="email" onChange={this.filterList.bind(this)} class="form-control ml-1 mt-2"
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
                                </div>
                            </div>

                        </div>
                    <div className=" mt-4 mb-5">
                        <table className="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Enabled</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.filteProducts.map((data,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.cname}</td>
                                                <td>{data.stock}</td>
                                                <td className={data.enabled == 1 ? 'text-success' : 'text-danger'} >{data.enabled == 1 ? 'Enabled' : 'Disabled'}</td>
                                                <td>
                                                <Link to={`/pos/edit-product/${data.id}`}>
                                                <button className="btn btn-success"> <i style={{color:'#ffffff'}} className="far fa-edit"> </i></button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    this.state.filteProducts.length == 0 ?
                                    <tr><td colSpan="8">No records founded</td></tr>:null
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
export default connect(mapStateToProps)(ProductsList);
