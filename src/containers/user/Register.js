import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import * as QueryString from "query-string"
import * as actionType from '../../store/actions'


import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import FormClass from '../../utils/FormClass';
import AlertMessage from '../../components/alert/AlertMessage';

import * as webUtil from '../../utils/WebUtil'
import withAlert from '../../hoc/withAlert'
import { Link } from 'react-router-dom';


class Register extends FormClass {

    saveUser = (params) => {
        this.props.setAlert({type:'info',message:'Saving record...'});
        let fields={...this.state.fields};
        fields.type = params.ac

        axios.post(webUtil.URL+'/gatexapi/users', fields).then(response=> {
            this.props.setAlert({type:'success',message:'Saved successfully.'});
            if(params.ac==='admin'){
              this.props.onAdminAccountState('YES')
            }
         }).catch(error=>{
            webUtil.handleError(error, this.props);
        })
    }

   

    validateAppKey = (params) => {
        if(params.ac==='admin'){
           return this.validateEmpty('key');
        }else{
            return true;
        }
    }
   

    submitHandeler = () => {        
      this.validationCss=[];
      const params = QueryString.parse(this.props.location.search);
        if (this.validateEmpty('id')
            & this.validateEmpty('name')
            & this.validateEmail('email')
            & this.validatePassword('password')
            & this.validateEquality("password", "pwd")
            & this.validateAppKey(params)
        ) {
            this.clearFieldCss();
            this.saveUser(params);
        }else{
           this.applyValidationCss();     
        }  
    }

   

    render() {
        const params = QueryString.parse(this.props.location.search);
        return (
            <div>                             
                <div className="row">
                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '#', level: 'Register' }
                    ]} />
                </div>               
                <div className="row justify-content-center">
                    <div style={{maxWidth:'600px'}} className="border p-4 col-md-5" >                   
                        <h5 align="center">Create {params.ac} acount</h5>
                        <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert}/>  
                        <div className="form-group">
                            <label>User ID :</label>
                            <input className={this.getClassName('id')} name="id" placeholder="Enter user ID"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>
                        <div className="form-group">
                            <label>Name :</label>
                            <input className={this.getClassName('name')} name="name" placeholder="Enter Name"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>
                        <div className="form-group">
                            <label>Password :</label>
                            <input type="password" className={this.getClassName('password')} name="password" placeholder="Enter password"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                             <div className="invalid-feedback">Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:</div>
                        </div>  
                        <div className="form-group">
                            <label>Confirm password :</label>
                            <input type="password" className={this.getClassName('pwd')} name="pwd" placeholder="Enter password again"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>  
                        <div className="form-group">
                            <label>Email :</label>
                            <input type="email" className={this.getClassName('email')} name="email" placeholder="Enter email"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>  
                        {params.ac==='admin'
                            ?<div className="form-group">
                            <label>Application Key :</label>
                            <input type="password" className={this.getClassName('key')} name="key" placeholder="Enter key"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                            </div>
                            :null
                        }                      
                        <div className="form-group">
                            <button className="btn btn-primary d-block mx-auto" onClick={this.submitHandeler}>Submit</button>
                        </div>
                        <div className='my-3' style={{position:'relative'}}>
                            <hr/>
                            <p style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)'}} className='text-secondary bg-white px-3 text-center'>OR</p>
                        </div>
                        <div className='text-center'>
                            Already Have an Account ? &nbsp;&nbsp; 
                            <span><Link to="/login">Login Here</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        onAdminAccountState: (payload)=>dispatch({type: actionType.SAVE_SITE_INIT_STATE, payload: payload})
    }
}

export default connect(null, mapDispatchToProps)(withAlert(Register));