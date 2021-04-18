import React, { Component } from 'react';
import Axios from  'axios';
import Swal from 'sweetalert2';
import  { image_base } from '../../Configs/base_url';

class UploadLogo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentName : '',
            Stdid:'',
            rollnum:'',
            secid:'',
            secname:'',
            fathername:'',
            class:'',
            image: '',
            urll:"",
            imagePreviewUrl: false,
            id: "upload-photo",
            imageArray: [],
            body: '',
            posts: [],
            imageurl:'',
            EmployeeName:'',
            EmpId:'',
            Designation:'',
            Gender:'',
            username:"",
            progress:0
        }

    }


    componentDidMount(){
        let senderdata={
            token:window.localStorage.getItem('sa'),
            id:this.props.match.params.id
        }
        axios.post('/api/getuserbyid',senderdata).then(res=>{
            this.setState({
                username:res.data.username,
                urll:image_base+res.data.logo
            })
        })
    }
    uploadfile(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('token', window.localStorage.getItem('al'));
        formData.append('id',this.props.match.params.id);
        let Configs = {
            headers: {
                token: window.localStorage.getItem('al'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {this.setState({
               progress: Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            })}
        }

        Axios.post('/api/upload_business_logo', formData, Configs).then(res => {
            this.setState({
                urll: image_base+res.data.url
            })
            if (res.data.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'File Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    }

    render() {
        return (
            <div>
                <div  className="card bg-light mt-1 " style={{borderRadius:'7px',boxShadow:'3px 3px 13px'}}>
                    <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px'}}>
                                <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Upload Business Logo </h4>
                    </div>
                    <div className="card-body " style={{maxWidth: 'inherit'}}>
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="hstyle">Uer Name: {this.state.username}</h2>



                            </div>
                            <div className="col-md-3">

                                <img style={{width:'200px',height:'200px',borderRadius:'7px'}} src={this.state.urll}></img>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="mt-3">
                                <label className="dark_label">Select File
                                {
                                    this.state.progress != "" ?
                                    <> {" "+this.state.progress}%</>
                                    :null
                                }
                                </label>
                                <input type="file" onChange={this.uploadfile.bind(this)}
                                    className="form-control col-md-8 text_area"
                                >
                                </input>
                            </div>
                            {
                                this.state.error_string != ''?
                                <p className="text-danger text-center">{this.state.error_string}</p>
                                :null
                            }
                            <br></br>
                            <br></br>
                            <br></br>


                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UploadLogo;
