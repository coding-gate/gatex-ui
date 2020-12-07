import React, { Component } from 'react';

import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import PrintTable from '../../components/pagination/PrintTable';
import withPagination from '../../hoc/withPagination';
import withAlert from '../../hoc/withAlert'
import AlertMessage from '../../components/alert/AlertMessage';

import * as webUtil from '../../utils/WebUtil'

import axiosWithToken from '../../utils/AxiosWithToken'


class ViewContacts extends Component {

   
    TABLE_HEADER = ['Name', 'Email', 'Comment']

    
    componentDidMount() {

        axiosWithToken.get('/contacts/secure').then(response=> {
            const record=response.data;
            let allRecords=record.map(e=>{ return [e['name'],e['email'],e['comment']]})            
            this.props.initPagination(allRecords); 
            if(!allRecords.length){
                 this.props.setAlert({type:'warning',message:'Record not found!'});
            }
          }).catch(error=>{
            webUtil.handleError(error, this.props);
         })
    }
    

    render() {
        return (<div>
            {/* bread crumb */}
            <div className="row" >
                <Breadcrumb elements={[
                    { url: '/', level: 'Home' },
                    { url: '#', level: 'view contacts' }
                ]} />
            </div>
            <PrintTable tableHeader={this.TABLE_HEADER} tableBody={this.props.tableBody} />    
            <div className="row">               
                  <div className="col-md-6 offset-3">
                  <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert}/> 
                  </div>              
            </div>        
        </div>)
    }

}

export default withAlert(withPagination(ViewContacts));
