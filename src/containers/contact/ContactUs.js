import React  from 'react';
import axios from 'axios';

import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import FormClass from '../../utils/FormClass';
import AlertMessage from '../../components/alert/AlertMessage';

import * as webUtil from '../../utils/WebUtil'
import withAlert from '../../hoc/withAlert'


class ContactUs extends FormClass {   
   /*
    state = {       
        ...this.state,       
        statusMessage:null
    }*/

   

    saveComment=()=>{

        this.props.setAlert({type:'info',message:'Saving record...'});
        
        axios.post(webUtil.URL+'/contacts', this.state.fields).then(response=> {
            this.props.setAlert({type:'success',message:'Saved successfully.'});
         }).catch(error=>{
            webUtil.handleError(error, this.props);
        })
    }
   

    submitHandeler = () => { 
        if (this.validateEmpty('name')
            & this.validateEmail('email')
            & this.validateEmpty('comment')
        ) {
            this.clearFieldCss();
            this.saveComment();
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
                        { url: '#', level: 'contact' }
                    ]} />
                </div>                    
                <div className="row justify-content-center">
                    <div className="col-md-5" >                        
                        <h5 align="center">Contact Us </h5>
                        <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert}/>  
                        <div className="form-group">
                            <label>Full Name </label>
                            <input className={this.getClassName('name')} name="name" placeholder="Type Name"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>                        
                        <div className="form-group">
                            <label>Business Email</label>
                            <input className={this.getClassName('email')} name="email" placeholder="Type Business Email"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>
                        <div className="form-group">
                            <label>Comment</label>
                            <textarea className={this.getClassName('comment')} name="comment" placeholder="Comment"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-light" onClick={this.submitHandeler}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>)
    }

}

export default withAlert(ContactUs);