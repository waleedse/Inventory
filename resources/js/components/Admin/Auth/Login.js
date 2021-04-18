import React, { Component } from 'react';
import Axios from 'axios';

import Swal from 'sweetalert2'

class Userlogin extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            pass:'',
            loading:false,
            display_spinner:true,
            error_string:''
        }
    }
    componentDidMount(){
        let senderdata = {
            token:window.localStorage.getItem('sa')
          }
          Axios.post('/api/admin_check_auth',senderdata).then(res=>{
            this.setState({
                display_spinner:true
              })
            if(res.data.status == 200){
              this.props.history.push('/adminpanel');
            }
          })
    }

    username(e){
        this.setState({
            username:e.target.value
        })
    }
    pass(e){
        this.setState({
            pass:e.target.value
        })
    }
    login(e){
        e.preventDefault();
        if(this.state.username !='' && this.state.pass !=''){
            this.setState({
                loading:true
            })
            let senderdata = {
                username:this.state.username,
                password:this.state.pass
            }
            Axios.post('/api/admin_login',senderdata).then(res=>{
                this.setState({
                    loading:false
                })
                if(res.data.status == 200){
                    window.localStorage.setItem('sa',res.data.user.token);
                    this.props.history.push('/adminpanel');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Login Authentication Successfull',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else{
                 this.setState({
                     error_string:res.data.msg,
                 })
                }
            })
        }else{
           this.setState({
               error_string:'Error - please enter username and password.'
           })
        }

    }

    render() {
        return (
            <div style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',backgroundColor:'azure'}}>
                {
                    this.state.display_spinner ?
                    <div classNameName="adminlogin ">
                  <div className="container ">
                    <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5 animate_auth_modal">
                        <div className="card-body">
                            <div classNameName="site_logo">

                            </div>
                            <h5 className="card-title text-center "><img style={{width:'120px',height:'120px'}}  src={'/images/logo.png'}></img>
                            <br></br><span className="mt-3">Admin Log In</span></h5>
                            <form className="form-signin">
                            <div className="form-label-group">
                                <input onChange={this.username.bind(this)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                                <label for="inputEmail">Username</label>
                            </div>

                            <div className="form-label-group">
                                <input onChange={this.pass.bind(this)} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                                <label for="inputPassword">Password</label>
                            </div>
                            {
                                this.state.error_string !='' ?
                                <p className="text-danger text-center">{this.state.error_string}</p>
                                :null
                            }
                            <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                                {this.state.loading ?
                                    <div className="spinner-border text-light ml-2" style={{width:'25px',height:'25px'}} role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    : 'Login'
                                }


                                </button>
                            <hr className="my-4"/>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
                    :
                    <div id="displayspinner" style={{display:'block',marginLeft:'45%',marginTop:'20%'}}>
                        <div className="spinner-border text-info ml-2" style={{width:'60px',height:'60px'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
            </div>
                }

            </div>
        );
    }
}

export default Userlogin;
