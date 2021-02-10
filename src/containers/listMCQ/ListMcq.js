import React, { Component } from 'react';

import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import PrintTable from '../../components/pagination/PrintTable';
import withPagination from '../../hoc/withPagination';
import withAlert from '../../hoc/withAlert'
import AlertMessage from '../../components/alert/AlertMessage';
import { Link } from 'react-router-dom';

import axios from '../../utils/AxiosWithToken'
import * as webUtil from '../../utils/WebUtil'
import * as QueryString from "query-string"

class ListMcq extends Component {


    TABLE_HEADER = [{ field: "ID", class: "col-1" },
    { field: "Type", class: "col-1" },
    { field: "Question", class: "col-8" },
    { field: " ", class: "col-2" }]

    RECORDS=[]

    initilizedPagination=(records)=>{
        let allRecords=records.map((e,index)=>{ return [index+1,e['type'],e['text']]})            
        this.props.initPagination(allRecords); 
    }

    componentDidMount() {

       let uriComponent='/gatexapi/mcqQuestions/byUser';

        const params = QueryString.parse(this.props.location.search)
        if(params.search){
            uriComponent='/gatexapi/mcqQuestions/search?'+params.search
        }

        axios.get(webUtil.URL+uriComponent)
        .then(response=> {
                this.RECORDS=response.data;
                this.initilizedPagination(this.RECORDS)               
             }
        )

    }

    viewHandler = (id) => {
        alert("View " + this.RECORDS[this.props.startPageIndex+id]['id']);
    }

    editHandler = (id) => {
        this.props.history.push('/addMcq?questionId='+this.RECORDS[this.props.startPageIndex+id]['id']);
    }

    deleteHandler = (id) => {
        var response = window.confirm("Would you like to delete!");
        if (response === true) {
            axios.delete(webUtil.URL+'/gatexapi/mcqQuestions/'+this.RECORDS[this.props.startPageIndex+id]['id'])
            .then(()=>{
                this.props.setAlert({type:'success',message:'Succesfully deleted'})
                 this.RECORDS.splice(this.props.startPageIndex+id,1);
                 this.initilizedPagination(this.RECORDS)  
                })
        }              
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search mr-1" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>search</Link>
                    <Link to="/addMcq" className="btn btn-sm btn-light btn-outline-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                     </svg>
                        add new</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-3">
                    <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert} />
                </div>
            </div>
            <PrintTable tableHeader={this.TABLE_HEADER} tableBody={this.props.tableBody}
                option={{ view: this.viewHandler, edit: this.editHandler, delete: this.deleteHandler }} />
        </div>)
    }

}

export default withAlert(withPagination(ListMcq));
