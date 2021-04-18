import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from  'axios'

import Swal from 'sweetalert2'

class ShowUsers extends Component {

    constructor(props) {
        super(props);
        this.state={
            users:[],

        }
    }
    componentDidMount(){
        let senderdata={
            token:window.localStorage.getItem('sa')
        }
        axios.post('/api/get_users',senderdata).then(res=>{
            this.setState({
                users:res.data
            })
        })
    }



    render() {


        return (
            <div>
                <div>
                    <div  className="card bg-light mt-1 " style={{borderRadius:'7px',boxShadow:'3px 3px 13px'}}>
                        <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
                                <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Users</h4>

                        </div>
                        <div className="card-body " style={{maxWidth: 'inherit'}}>
                            <table
                             style={{border:'2px solid #00bcd4'}}
                              className="table table-bordered table-hover table-striped ">
                                <thead>
                                    <tr  style={{fontWeight:'bold'}}>
                                        <td>Sr</td>
                                        <td>User Id</td>
                                        <td>User Name</td>
                                        <td>Business Name</td>
                                        <td>Business Address</td>
                                        <td>Mobile</td>
                                        <td>Total Products</td>
                                        <td>Status</td>
                                        <td colSpan="2">Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((data,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{data.id}</td>
                                                    <td>{data.username}</td>
                                                    <td>{data.fullname}</td>
                                                    <td>{data.fulladdress}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.stds}</td>
                                                    <td>{data.status}</td>
                                                    <td ><Link to={`/adminpanel/edit-user/${data.id}`}><button className="btn btn-warning"> <i style={{color:'#ffffff'}} className="far fa-edit"> </i></button></Link> </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}
export default ShowUsers;
