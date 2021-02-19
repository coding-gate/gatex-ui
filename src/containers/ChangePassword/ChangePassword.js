import React from 'react'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import withAlert from '../../hoc/withAlert'
import FormClass from '../../utils/FormClass'


class ChangePassword extends FormClass {

    changePassword = () => {
        
    }

    submitHandler = () => {
        this.validationCss=[];
        if (this.validateEmpty('currentPassword')
            & this.validateEmpty('newPassword')
            & this.validatePassword('newPassword')
            & this.validateEquality("newPassword", "confirmPassword")
        ) {
            this.clearFieldCss();
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
                        { url: '#', level: 'Password Reset' }
                    ]} />
                </div>   
                <div className="mt-5">
                        <h3 className='text-center'>Password Reset Window</h3>
                        
                    <div className="p-3 mt-4 border mx-auto col-4">
                        <div className="form-group">
                            <label>Current Password :</label>
                            <input className={this.getClassName('default')} name="currentPassword" placeholder="Enter Current Password"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                        </div>
                        <div className="form-group">
                            <label>New Password :</label>
                            <input className={this.getClassName('newPassword')} name="newPassword" placeholder="Enter New Password"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                            <div className="invalid-feedback">Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password :</label>
                            <input className={this.getClassName('confirmPassword')} name="confirmPassword" placeholder="Enter New Password Again"
                                onChange={(event) => this.updateFieldState(event)}
                                onFocus={(event) => this.setCssAsDefault(event)} />
                            <div className="invalid-feedback">Password Should Match As Typed Earlier.</div>

                        </div>
                        <button onClick={this.submitHandler} className="btn mt-4 btn-outline-primary">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAlert(ChangePassword)