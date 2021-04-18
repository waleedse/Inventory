import React, { Component } from 'react';
import axios from  'axios'
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
    class Newuser extends Component {
        constructor(props) {
            super(props);
            this.state={
                username:'',
                pass:'',
                planid:'',
                fulladdresas:'',
                ShortAddress:'',
                fullname:'',
                shortname:'',
                phone:'',
                plans:[],
                shift:''


            }
        }

        Onsubmit(e){
            e.preventDefault();
            if(this.state.username !='' && this.state.pass !=''&&  this.state.fulladdresas!=''&& this.state.ShortAddress!=''&& this.state.fullname
            !=''&& this.state.shortname!='' ){
                let senderdata ={
                    username:this.state.username,
                    pass:this.state.pass,
                    fulladdresas:this.state.fulladdresas,
                    ShortAddress:this.state.ShortAddress,
                    fullname:this.state.fullname,
                    shortname:this.state.shortname,
                    phone:this.state.phone,
                    token:window.localStorage.getItem('sa')
                }
                    axios.post('/api/add_user',senderdata).then(res=>{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User Successfull',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    this.props.history.push("/adminpanel/users-list") ;
                })
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'User Not Added',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }

        username(e){
              this.setState({
                username:e.target.value
              })
        }
        shift(e){
            this.setState({
              shift:e.target.value
            })
        }
        pass(e){
            this.setState({
              pass:e.target.value
            })
        }
        planid(e){
            this.setState({
              planid:e.target.value
            })
        }
        fulladdresas(e){
            this.setState({
                fulladdresas:e.target.value
            })
        }
        ShortAddress(e){
            this.setState({
                ShortAddress:e.target.value
            })
        }
        fullname(e){
            this.setState({
              fullname:e.target.value
            })
        }
        shortname(e){
            this.setState({
              shortname:e.target.value
            })
        }
        phone(e){
            this.setState({
              phone:e.target.value
            })
        }
        render() {
            return (
                <div>
                    <div  className="card bg-light " style={{borderRadius:'7px',boxShadow:'3px 3px 13px'}}>
                        <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
                            <h4 className="card-title  ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Add New User</h4>
                        </div>
                        <div className="card-body  " style={{maxWidth: 'inherit',display:'block',paddingLeft:'10%'}}>
                            <div  className="col-sm-2">
                            <h1></h1>
                            </div>
                            <div className="col-sm-10">
                                <form  onSubmit={this.Onsubmit.bind(this)} >
                                    <div className=" row col form-group">

                                    <label className=" mt-2" style={{fontWeight:'bold'}}>UserName</label>
                                        <input type="name" required   className="form-control col-sm-6 " onChange={this.username.bind(this)} placeholder="Enter  User Name"/>
                                    </div>
                                    <div className=" row col form-group">

                                    <label className=" mt-2" style={{fontWeight:'bold'}}>Password</label>
                                        <input type="name" required    className="form-control col-sm-6 " onChange={this.pass.bind(this)} placeholder="Enter  Password"/>
                                    </div>


                                    <div className=" row col form-group">

                                    <label className=" mt-2" style={{fontWeight:'bold'}}>Business Full Name</label>
                                        <input type="name" required    className="form-control col-sm-6 " onChange={this.fullname.bind(this)} placeholder="Enter  Full Name"/>
                                    </div>
                                    <div className=" row col form-group">

                                    <label className=" mt-2" style={{fontWeight:'bold'}}>Business Short Name</label>
                                        <input type="name" required   className="form-control col-sm-6 " onChange={this.shortname.bind(this)} placeholder="Enter  Short Address"/>
                                    </div>
                                    <div className=" row col form-group">

                                    <label className=" mt-2" style={{fontWeight:'bold'}}>Business Full Address</label>
                                        <input type="name" required    className="form-control col-sm-6 " onChange={this.fulladdresas.bind(this)} placeholder="Enter  Full Address"/>
                                    </div>
                                    <div className=" row col form-group">

                                    <label className=" mt-2" style={{fontWeight:'bold'}}>Business Short Address</label>
                                        <input type="name" required    className="form-control col-sm-6 " onChange={this.ShortAddress.bind(this)} placeholder="Enter  Short Address"/>
                                    </div>
                                    <div className=" row col form-group">

                                    <label className=" mt-2" style={{fontWeight:'bold'}}>User Phone</label>
                                        <input type="name" required    className="form-control col-sm-6 " onChange={this.phone.bind(this)} placeholder="Enter Phone"/>
                                    </div>
                                    <div className="mt-2" >
                                    <label className=" mt-2" style={{fontWeight:'bold'}}></label>
                                        <Button type="submit"  size="medium" variant="contained"
                                        style={{backgroundColor:'#21bf73',color:'white'}}>Save</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

export default Newuser;
