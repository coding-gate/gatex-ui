import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import FormClass from '../../utils/FormClass';
import AlertMessage from '../../components/alert/AlertMessage';

import * as actionType from '../../store/actions'
import * as webUtil from '../../utils/WebUtil'
import withAlert from '../../hoc/withAlert'
import { Link } from 'react-router-dom';

class Login extends FormClass  {

    state = {
        ...this.state,
        isLoading:false
    }
    
    getTokenAndSave = () => {
        
        let body = new FormData();
        body.set('username', this.state.fields['userName']);
        body.set('password', this.state.fields['password']);
        body.set('grant_type', 'password');

        const header = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa("gatexui:secret")
            }
        }
        this.setState({isLoading:true})
        axios.post(webUtil.getApiUrl() + '/oauth/token', body, header)
            .then(response => {
                const tokenData = webUtil.parseJwt(response.data.access_token);
                console.log(tokenData);

            const payload = {
                accessToken: response.data.access_token,
                userRole: tokenData.authorities,
                userName:tokenData.user_name
            }
            this.props.onSaveJwtToken(payload);
            this.props.history.push("/");
        }).catch(error => {
            webUtil.handleError(error, this.props);
            this.setState({isLoading:false})
        })
    }
   

    submitHandeler = () => {        

        if (this.validateEmpty('userName')
            & this.validateEmpty('password')
        ) {
            this.clearFieldCss();
            this.getTokenAndSave();
        }else{
           this.applyValidationCss();     
        }  
    }

   

    render() {
        return (
            <div>                             
                <div className="row">
                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '#', level: 'Login' }
                    ]} />
                </div>               
                <div className="row justify-content-center">
                    <div style={{maxWidth:'400px'}} className="border p-4 col-md-5" >                   
                        <h5 align="center">Enter Credentials</h5>
                        <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert}/>  
                        <div className="form-group">
                            <label>User ID :</label>
                            <input className={this.getClassName('userName')} name="userName" placeholder="Enter user id"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>
                        <div className="form-group">
                            <label>Password :</label>
                            <input type="password" className={this.getClassName('password')} name="password" placeholder="Enter password"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)}
                                onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this.submitHandeler();
                                        }
                                      }} 
                                />
                                <div className='mt-2 text-right'>
                                    <small><Link to='/forgotPassword'>Forgot Password ?</Link></small>                       
                                </div>
                        </div>
                        <div className="form-group">
                            <button 
                                className="btn btn-primary d-block mx-auto" 
                                onClick={this.submitHandeler}
                            >
                                <span className={this.state.isLoading ? "spinner-border spinner-border-sm" : 'd-none'}>
                                    </span>
                                    {this.state.isLoading ? ' Loading...':' Submit'}</button>
                        </div>
                        <div className='my-3' style={{position:'relative'}}>
                            <hr/>
                            <p 
                                style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)'}} 
                                className='text-secondary bg-white px-3'>OR</p>
                        </div>
                        <div className='text-center'>
                            Don't Have an Account ? &nbsp;&nbsp; 
                            <span><Link to="/register?ac=user">Register Here</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onSaveJwtToken: (payload)=>dispatch({type: actionType.SAVE_JWT_TOKEN, payload: payload})
    }
}

export default connect(null, mapDispatchToProps)(withAlert(Login));