import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import FormClass from '../../utils/FormClass';
import AlertMessage from '../../components/alert/AlertMessage';

import * as actionType from '../../store/actions'
import * as webUtil from '../../utils/WebUtil'
import withAlert from '../../hoc/withAlert'

class Login extends FormClass {

    getTokenAndSave = () => {
        let body = new FormData();
        body.set('username', this.state.fields['userName']);
        body.set('password', this.state.fields['password']);
        body.set('grant_type', 'password');

        const header = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa("itman:secret")
            }
        }

        axios.post(webUtil.URL + '/oauth/token', body, header).then(response => {
            const tokenData = webUtil.parseJwt(response.data.access_token);

            const payload = {
                accessToken: response.data.access_token,
                userRole: tokenData.authorities
            }
            this.props.onSaveJwtToken(payload);
            this.props.history.push("/");
        }).catch(error => {
            webUtil.handleError(error, this.props);
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
                        { url: '#', level: 'login' }
                    ]} />
                </div>               
                <div className="row justify-content-center">
                    <div className="col-md-5" >                   
                        <h5 align="center">Enter credentials</h5>
                        <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert}/>  
                        <div className="form-group">
                            <label>User name</label>
                            <input className={this.getClassName('userName')} name="userName" placeholder="Type User Name"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                            <div className="invalid-feedback">User name can not be empty</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className={this.getClassName('password')} name="password" placeholder="Type password"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)}
                                onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this.submitHandeler();
                                        }
                                      }} 
                                />
                        </div>                        
                        <div className="form-group">
                            <button className="btn btn-light" onClick={this.submitHandeler}>Submit</button>
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