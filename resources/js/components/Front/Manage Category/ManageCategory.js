import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            add_cat_display:false,
            categories:[]
        }
    }
    componentDidMount(){
        let senderdata = {
            token:window.localStorage.getItem('u'),
            user:this.props.user.id
        }
        Axios.post('/api/get_allcategories',senderdata).then(res=>{
            this.setState({
                categories:res.data
            })
        }).catch(e=>{
            console.log(e);
        })
    }
   add_category(){
       let senderdata = {
           name:this.state.name,
           user:this.props.user.id
       }
       Axios.post('/api/addcategory',senderdata).then(res=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Category Added',
            showConfirmButton: false,
            timer: 1500
          })
           this.componentDidMount();
       }).catch(e=>{
           console.log(e);
       })
   }
   name(e){
       this.setState({
           name:e.target.value
       })
   }
   manage_add_cat_display(){
    this.setState({
        add_cat_display: !this.state.add_cat_display
    })
   }
   onchange_category(val,id){
    let temp_arr = this.state.categories;
    temp_arr.map((data,index)=>{
        if(data.id == id){
            data.cname = val;
        }
    })
    this.setState({
        categories:temp_arr
    })
   }
   DeleteCategory(id,index){
    let senderdata={
      id:id
    }
    Axios.post('/api/delete_category',senderdata).then(res=>{

        var categories = this.state.categories;
        categories.splice(index,1);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Category Deleted',
            showConfirmButton: false,
            timer: 1500
          })
        this.setState({
            categories:categories
        })

    });
   }
   upcategory(id,name){
       let senderdata = {
           id:id,
           name:name
       }

       Axios.post('/api/update_category',senderdata).then(res=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Category Upated',
            showConfirmButton: false,
            timer: 1500
          })
       })
   }
    render() {
        return (
            <div id="addproducts"  >
                <div className="top_section_title_div">
                    <h2 className="section_title">Manage Category</h2>
                </div>

                <div >
                    <button onClick={this.manage_add_cat_display.bind(this)} className="btn btn-success mt-3">{this.state.add_cat_display? 'Close Add Category' : 'Add Category'} </button>
                    {
                        this.state.add_cat_display ?
                        <div className="card content_card_div mt-4 mb-5">
                        <div className="row col-md-12">
                            <div class="form-group input_div col-md-6">
                                <label className="input_label" for="exampleInputEmail1">Category Name</label>
                                <input type="email" onChange={this.name.bind(this)} class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Category Name" />
                            </div>
                        </div>
                        <div className="submit_btn">
                            <button onClick={this.add_category.bind(this)} className="btn btn-success ml-3 mb-5">Add Category</button>
                        </div>
                        </div>
                        :null
                    }
                   <div className="card content_card_div mt-4 mb-5">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th colSpan="2">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.categories.map((data,index)=>{
                                        return(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{data.id}</td>
                                                <td><input onChange={(e)=>{this.onchange_category(e.target.value,data.id)}} className="form-control" value={data.cname}></input></td>
                                                <td><button onClick={this.upcategory.bind(this,data.id,data.cname)} className="btn btn-warning">Update</button></td>
                                                <td><button className="btn btn-light" onClick={this.DeleteCategory.bind(this,data.id,index)}> <i  style={{color:'red'}}  className="fas fa-trash-alt"></i>
                                                        </button></td>
                                            </tr>
                                        )
                                    })
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
export default connect(mapStateToProps)(AddCategory);
