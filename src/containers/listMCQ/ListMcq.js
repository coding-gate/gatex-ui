import React, { Component } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import PrintTable from '../../components/pagination/PrintTable';
import withPagination from '../../hoc/withPagination';
import withAlert from '../../hoc/withAlert'
import AlertMessage from '../../components/alert/AlertMessage';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'react-bootstrap-icons'

//import axios from '../../utils/AxiosWithToken'
import axios from 'axios'

import * as webUtil from '../../utils/WebUtil'
import * as QueryString from "query-string"

class ListMcq extends Component {
    state={
        isLoading:true
    }

    TABLE_HEADER = [{ field: "ID", class: "col-1" },
    { field: "Type", class: "col-1" },
    { field: "Question", class: "col-8" },
    { field: " ", class: "col-2" }]

    RECORDS=[{}]

    initilizedPagination=(records)=>{
        let allRecords=records            
        this.props.initPagination(allRecords); 
    }

    componentDidMount() {

       //let uriComponent='/gatexapi/mcqQuestions/byUser';

        const params = QueryString.parse(this.props.location.search)
        if(params.search){
            //uriComponent='/gatexapi/mcqQuestions/search?'+params.search
        }

        //axios.get(webUtil.URL+uriComponent)
        axios.get('https://gatex-exam-default-rtdb.firebaseio.com./question.json')
        .then(response=> {
                this.RECORDS=Object.values(response.data);
                this.initilizedPagination(this.RECORDS)
                this.setState({isLoading:false})           
             }
        )
        .catch(error => {
            webUtil.handleError(error, this.props);
        })

    }

    viewHandler = (index) => {

        console.log(document.getElementById('display'+index).classList)
        document.getElementById('display'+index).classList.add('show')  
        console.log(document.getElementById('display'+index).classList)
    }

    editHandler = (id) => {
        this.props.history.push('/addMcq?questionId='+this.RECORDS[this.props.startPageIndex+id]['id']);
    }

    deleteHandler = (id) => {
        axios.delete(webUtil.URL+'/gatexapi/mcqQuestions/'+this.RECORDS[this.props.startPageIndex+id]['id'])
        .then(()=>{
                this.props.setAlert({type:'success',message:'Succesfully deleted'})
                this.RECORDS.splice(this.props.startPageIndex+id,1);
                this.initilizedPagination(this.RECORDS)
            })
            .catch(error => {
                webUtil.handleError(error, this.props);
            })         
    }


    render() {
        return (<div>
            {/* bread crumb */}
            <div className="row" >
                <Breadcrumb elements={[
                    { url: '/', level: 'Home' },
                    { url: '#', level: 'MCQ List' }
                ]} />
            </div>
           
            <div className="row mb-2">
                <div className="col col-md-10 offset-1" >
                    <div className="d-flex justify-content-between">
                    <Link to="/searchMcq" className="btn btn-sm btn-light btn-outline-primary">
                        <Search /> Search
                    </Link>

                    <Link to="/addMcq" className="btn btn-sm btn-light btn-outline-primary">
                        <Plus style={{fontSize:'1.3rem'}} /> Add New
                    </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-3">
                    <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert} />
                </div>
            </div>
            {this.state.isLoading ? 
            <div 
                style={{width:'5rem',height:'5rem'}} 
                className="spinner-border d-block my-4 mx-auto">
            </div>
        :
            <PrintTable tableHeader={this.TABLE_HEADER} tableBody={this.props.tableBody}
                option={{ view: this.viewHandler, edit: this.editHandler, delete: this.deleteHandler }} />}
        </div>)
    }

}

export default withAlert(withPagination(ListMcq));
