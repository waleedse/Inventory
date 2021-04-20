import Axios from 'axios';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
          invoice:[],
          invoice_products:[]
        }
    }

   componentDidMount(){

       Axios.post('/api/get_invoice_by_id',{id:this.props.match.params.id}).then(res=>{
           console.log(res);
           this.setState({
               invoice:res.data,
               invoice_products:res.data.invoice_products
           })
       })
   }
    render() {
        return (
            <div>
                <div className="top_section_title_div">
                    <h2 className="section_title">Invoice #{this.props.match.params.id} Detailes</h2>
                </div>
                <div className="card  mt-2 p-2">
                    <div className="row">
                        <div className="row ml-3 px-3 ">
                            <label className="input_label" for="exampleInputEmail1">Subtotal</label>
                            <h5 className="ml-2">Rs, {this.state.invoice.subtotal}</h5>
                        </div>
                        <div className="row ml-3 px-3 ">
                            <label className="input_label" for="exampleInputEmail1">Discount</label>
                            <h5 className="ml-2">Rs, {this.state.invoice.discount}</h5>
                        </div>
                        <div className="row ml-3 px-3 text-right">
                            <label className="input_label" for="exampleInputEmail1"> Grand Total</label>
                            <h5 className="ml-2">Rs, {this.state.invoice.grandtotal}</h5>
                        </div>
                    </div>
                </div>
                <table className="table table-hover table-bordered table-striped mt-3">
                    <thead>
                        <th>Sr</th>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </thead>
                    <tbody>
                        {
                            this.state.invoice_products.map((data,index)=>{
                               return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{data.product_id}</td>
                                        <td>{data.product.name}</td>
                                        <td>{data.retail_price}</td>
                                        <td>{data.qty}</td>
                                        <td>{data.qty * data.retail_price}</td>
                                    </tr>
                               )
                            })
                        }
                        {
                            this.state.nodata ?
                            <tr className="text-center"><td colSpan="6">No records </td></tr>:null
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(InvoiceDetails);
