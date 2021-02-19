import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'

import AlertMessage from '../../components/alert/AlertMessage';
import Home from '../../components/body/Home';

import * as actionType from '../../store/actions'
import * as webUtil from '../../utils/WebUtil'
import withAlert from '../../hoc/withAlert'

class HomePage  extends Component  {


    componentDidMount() {

        if(this.props.isAdminAccountConfigured==="NA"){
                axios.get(webUtil.getApiUrl + '/users/adminAccountStatus').then(response => {
                    if(response.data==='NO'){
                        this.props.setAlert({ type: 'warning', message: 'Please create admin acount !' });
                    }
                    this.props.onAdminAccountState(response.data);
                }).catch(error => {
                    webUtil.handleError(error, this.props);
                })
       }else if(this.props.isAdminAccountConfigured==="NO"){
          this.props.setAlert({ type: 'warning', message: 'Please create admin acount !' });
       }
    }



    render() {        
        return (<div>
            <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert} />
            {this.props.isAdminAccountConfigured==='NO'
                ? <div className=" col">
                    <p >Please create application admin account. With taht you should be able to setup various configuration parametter.
                    please keep OTP handy to set up admin account.
                    </p>
                    <p > This is one time activity </p>
                    <Link to="/register?ac=admin"  className="btn btn-light btn-outline-primary">Setup admin</Link>
                </div>
                :<Home/>
            }
        </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAdminAccountState: (payload)=>dispatch({type: actionType.SAVE_SITE_INIT_STATE, payload: payload})
    }
}

const mapStateToProps = state =>{
    return {
        isAdminAccountConfigured: state.isAdminAccountConfigured
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(HomePage));
