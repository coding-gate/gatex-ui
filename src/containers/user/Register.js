import React from 'react';
import axios from 'axios';

import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import FormClass from '../../utils/FormClass';
import AlertMessage from '../../components/alert/AlertMessage';

import * as webUtil from '../../utils/WebUtil'
import withAlert from '../../hoc/withAlert'

class Register extends FormClass {

    saveUser = () => {
        this.props.setAlert({type:'info',message:'Saving record...'});
        let fields={...this.state.fields};

        axios.post(webUtil.URL+'/users', fields).then(response=> {
            this.props.setAlert({type:'success',message:'Saved successfully.'});
         }).catch(error=>{
            webUtil.handleError(error, this.props);
        })
    }

    checkEquality = () => {
        if(this.state.fields["password"]===this.state.fields["pwd"] ){
            if(this.state.fields["pwd"]){
            this.validationCss['pwd'] = this.CSS_CLASS['success'];
            }
            return true;
        }else{
            this.validationCss["pwd"] = this.CSS_CLASS['error'];
            return false;
        }
    }

  

    validatePassword = (field) => {
        let password =this.state.fields[field];
        let isValid = this.isValidPassword(password);
        this.buildValidationCss(isValid, field);
        return isValid;
    }

    isValidPassword = (password) => {
        if(password){
            if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)) {
                return true;
            } 
       }
       return false;
    }    
   

    submitHandeler = () => {        
      this.validationCss=[];
        if (this.validateEmpty('id')
            & this.validateEmpty('name')
            & this.validateEmail('email')
            & this.validatePassword('password')
            & this.checkEquality()
        ) {
            this.clearFieldCss();
            this.saveUser();
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
                        <h5 align="center">Create Account</h5>
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
                            <label>Confirm Password :</label>
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
                        <div className="form-group">
                            <button className="btn btn-light btn-outline-primary" onClick={this.submitHandeler}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAlert(Register);