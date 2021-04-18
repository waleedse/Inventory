import React, { Component } from 'react';
import '../../Index/index.css'
import Axios from 'axios';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Swal from 'sweetalert2'
import {connect} from 'react-redux';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            newpass:'',
            oldpass:'',
            confirm_pass:'',
            uid:this.props.user.uid,
            account_id:this.props.user.account_id

        }
    }

    SuccessToaster (msg) {

        toastr.options = {
          positionClass : 'toast-top-full-width',
          hideDuration: 300,
          timeOut: 3000
        }
        toastr.clear()
        setTimeout(() => toastr.success(msg), 300)
      }
    ErrorToaster (msg) {

        toastr.options = {
          positionClass : 'toast-top-full-width',
          hideDuration: 300,
          timeOut: 3000
        }
        toastr.clear()
        setTimeout(() => toastr.error(msg), 300)
    }
    newpass(e){
        this.setState({
            newpass:e.target.value
        })
    }
    confirmpass(e){
        this.setState({
            confirm_pass:e.target.value
        })
    }
    oldpass(e){
        this.setState({
            oldpass:e.target.value
        })
    }

    save_changes(e){
        e.preventDefault();
        if(this.state.oldpass != '' && this.state.newpass !='' && this.state.confirm_pass != ''){
            if(this.state.newpass == this.state.confirm_pass){
                let senderdata={
                    oldpass:this.state.oldpass,
                    newpass:this.state.newpass,
                    uid:this.state.account_id,
                }
                Axios.post('/api/alumni_change_pass',senderdata).then(res=>{
                    if(res.data == 1){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Password Changes SuccessFully',
                            showConfirmButton: false,
                            timer: 1500
                            })
                    }else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Invalid Old Password',
                            showConfirmButton: false,
                            timer: 1500
                            })
                    }

                })
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'New Password Does Not Matchs With Confirm Password',
                    showConfirmButton: false,
                    timer: 1500
                    })
            }
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Enter All Fields',
                showConfirmButton: false,
                timer: 1500
                })
        }
    }

    render() {
        return (
            <div style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',backgroundColor:'azure'}}>

                    <div id="change_pass_div" >
                    <div  className="card bg-light mt-1 " style={{borderRadius:'7px',boxShadow:'3px 3px 25px rgba(0,0,0,0.2)',width:'fit-content',display:'block',marginLeft:'auto',marginRight:'auto'}}>
                        <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px',padding:'3px'}}>
                            <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Change Password
                            </h4>
                        </div>
                        <div className="card-body " style={{maxWidth: 'inherit'}}>
                            <form>
                                <div className=" row col mt-2">
                                    <label className=" mt-2"  style={{fontWeight:'bold',color:'rgb(16, 117, 149)',width:'250px'}} >Old Password</label>
                                    <input autoFocus id="inputbox" type="password" required
                                    className=" col-sm-12 " onChange={this.oldpass.bind(this)}
                                    placeholder="Old Password"/>
                                </div >
                                <div className=" row col mt-2">
                                    <label className=" mt-2"  style={{fontWeight:'bold',color:'rgb(16, 117, 149)',width:'250px'}} >New Password</label>
                                    <input autoFocus id="inputbox" type="password" required
                                    className=" col-sm-12 " onChange={this.newpass.bind(this)}
                                    placeholder="New Password"/>
                                </div >
                                <div className=" row col mt-2">
                                    <label className=" mt-2"  style={{fontWeight:'bold',color:'rgb(16, 117, 149)',width:'250px'}} >Confirm Password</label>
                                    <input id="inputbox1" type="password" required
                                    className=" col-sm-12 " onChange={this.confirmpass.bind(this)}
                                    placeholder="Confirm Password"/>
                                </div >
                                <div className="justify-content-center mt-3" style={{textAlign:'center'}}>
                                    <button onClick={this.save_changes.bind(this)} type="submit" className="btn btn-info">Save</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(ChangePassword);
