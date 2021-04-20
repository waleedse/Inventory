import Axios from 'axios';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class SaleReport extends Component {
    constructor(props) {
        super(props);
        this.state={
            enddate:new Date(),
            startdate:new Date(),
            sales:[],
            nodata:true,
            total_sales:0,
            sales_total:0
        }
    }

    enddate(e){
        this.setState({
            enddate:e
        })
    }
    startdate(e){
        this.setState({
            startdate:e
        })
    }
    search_sales(){
        let senderdata = {
            startdate:this.state.startdate.getFullYear()+'/'+(parseInt(this.state.startdate.getMonth())+1)+'/'+this.state.startdate.getDate(),
            enddate:this.state.enddate.getFullYear()+'/'+(parseInt(this.state.enddate.getMonth())+1)+'/'+this.state.enddate.getDate(),
            user_id:this.props.user.id
        }
        console.log(senderdata);
        Axios.post('/api/search_sales',senderdata).then(res=>{

            if(res.data.status == 200){
                this.setState({
                    sales:res.data.invoices,
                    nodata:false,
                    total_sales:res.data.total_invoices,
                    sales_total:res.data.invoice_totals
                })
            }else{
                this.setState({
                    nodata:true
                })
            }
        })
    }
    print_report(){
        let senderdata = {
            startdate:this.state.startdate.getFullYear()+'/'+(parseInt(this.state.startdate.getMonth())+1)+'/'+this.state.startdate.getDate(),
            enddate:this.state.enddate.getFullYear()+'/'+(parseInt(this.state.enddate.getMonth())+1)+'/'+this.state.enddate.getDate(),
            user_id:this.props.user.id
        }
        Axios.post('/api/print_sales_report',senderdata,{
            responseType: 'blob'
        }).then(response=>{
            const file = new Blob(
                [response.data],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        })
    }
    render() {
        return (
            <div>
                <div className="top_section_title_div">
                    <h2 className="section_title">Sales Report</h2>
                </div>
                <div className="card p-2 ">

                        <label className="input_label" for="exampleInputEmail1">Search by Dates</label>
                        <div className="row col-md-12">
                            <DatePicker dateFormat="dd/MM/yyyy"  selected={this.state.startdate} className="form-control col-md-12" aria-describedby="emailHelp"  onChange={this.startdate.bind(this)} />
                            <p className="px-2">to</p>
                            <DatePicker dateFormat="dd/MM/yyyy"  selected={this.state.enddate} className="form-control col-md-12" aria-describedby="emailHelp"  onChange={this.enddate.bind(this)} />
                            <button onClick={this.search_sales.bind(this)} className="btn btn-success ml-2">Seacrh</button>
                            <button onClick={this.print_report.bind(this)} className="btn btn-info ml-2">Export PDF</button>
                        </div>

                </div>
                <div className="card  mt-2">
                    <div className="row">
                        <div className="row ml-3 px-3 ">
                            <label className="input_label" for="exampleInputEmail1">Total Invoices</label>
                            <h5 className="ml-2">{this.state.total_sales}</h5>
                        </div>
                        <div className="row ml-3 px-3 text-right">
                            <label className="input_label" for="exampleInputEmail1">Sales Total</label>
                            <h5 className="ml-2">Rs, {this.state.sales_total}</h5>
                        </div>
                    </div>
                </div>
                <table className="table table-hover table-bordered table-striped mt-3">
                    <thead>
                        <th>Sr</th>
                        <th>Invoice ID</th>
                        <th>Date</th>
                        <th>SubTotal</th>
                        <th>Discount</th>
                        <th>Grand Total</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            this.state.sales.map((data,index)=>{
                               return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{data.id}</td>
                                        <td>{data.date}</td>
                                        <td>{data.subtotal}</td>
                                        <td>{data.discount}</td>
                                        <td>{data.grandtotal}</td>
                                        <td>
                                            <Link to={`/pos/invoice-details/${data.id}`}>
                                            <button className="btn btn-outline-success"> <i  className="far fa-eye"> </i></button>
                                            </Link>
                                        </td>
                                    </tr>
                               )
                            })
                        }
                        {
                            this.state.nodata ?
                            <tr className="text-center"><td colSpan="7">No records </td></tr>:null
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
export default connect(mapStateToProps)(SaleReport);
