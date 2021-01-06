import { Component } from 'react';

class FormClass extends Component {

    validationCss = [];    

    CSS_CLASS = {default:"form-control", error:"form-control is-invalid", success:"form-control is-valid" }

    state = {
        fields:[],
        fieldStyle: [],
    }; 
   

    updateFieldState = (event) => {
        const name = event.target.name;
        let fields={...this.state.fields};
        fields[name]=event.target.value;      
        this.setState({fields});
    }

    setCssAsDefault = (event) => {
        const field = event.target.name
        let fieldStyle = { ...this.state.fieldStyle }
        fieldStyle[field] = this.CSS_CLASS['default'];
        this.setState({fieldStyle});
    }

    clearFieldCss = () => {
        this.setState({fieldStyle:[]});
    }
    

      

    validateEmpty = (field) => {     
        if(this.state.fields[field]){
            this.validationCss[field] = this.CSS_CLASS['success'];
            return true;
        }else{
            this.validationCss[field] = this.CSS_CLASS['error'];
            return false;
        }
    }

    buildValidationCss = (isValid, field) => {
        if (isValid) {
            this.validationCss[field] = this.CSS_CLASS['success'];
        } else {
            this.validationCss[field] = this.CSS_CLASS['error'];
        }
    }

    

    isValidEmail = (email) => {
        if(email){
            if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/)) {
                return true;
            } 
       }
       return false;
    } 

    validateEmail = (field) => {
        let email =this.state.fields[field];
        let isValid = this.isValidEmail(email);
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
    
    validatePassword = (field) => {
        let password =this.state.fields[field];
        let isValid = this.isValidPassword(password);
        this.buildValidationCss(isValid, field);
        return isValid;
    }

    validateEquality = (source, copy) => {
        if(this.state.fields[copy]&&(this.state.fields[source]===this.state.fields[copy]) ){
            this.validationCss[copy] = this.CSS_CLASS['success'];
            return true;
        }else{
            this.validationCss[copy] = this.CSS_CLASS['error'];
            return false;
        }
    }
    
    applyValidationCss = () => {
        this.setState({fieldStyle: this.validationCss });
    }

    getClassName = (name) => {
       const className=this.state.fieldStyle[name];
         if(className){
             return className;
         }else{
            return  this.CSS_CLASS['default'];
         }
    }

}

export default FormClass;