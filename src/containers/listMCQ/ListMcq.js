import React, { Component } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import PrintTable from '../../components/pagination/PrintTable';
import AlertMessage from '../../components/alert/AlertMessage';
import DisplayModal from '../../components/modal/DisplayModal'
import ViewQuestion from '../viewQuestion/ViewQuestion'
import { Link } from 'react-router-dom';
import { Plus, Search } from 'react-bootstrap-icons'

import axios from '../../utils/AxiosWithToken'

import withAlert from '../../hoc/withAlert'
import withPagination from '../../hoc/withPagination';

import * as webUtil from '../../utils/WebUtil'
import * as QueryString from "query-string"
import DecisionModal from '../../components/modal/DecisionModal';

class ListMcq extends Component {

    state={
        isLoading:true,
        isFiltered:false,
        displayModalContent:null,
        displayModalIsOpen:false,
        decisionModalIsOpen:false,
        deletingIndex:null
    }
    

    TABLE_HEADER = [{ field: "ID", class: "col-1" },
    { field: "Type", class: "col-1" },
    { field: "Question", class: "col-7 col-xl-8" },
    { field: " ", class: "col-3 col-xl-2" }]

    RECORDS=[]

    initilizedPagination=(records)=>{
        let allRecords=records.map((e,index)=>{ return [index+1,e['type'],e['text']]})            
        this.props.initPagination(allRecords); 
    }

    componentDidMount() {

       let uriComponent='/mcqQuestions/byUser';

        const params = QueryString.parse(this.props.location.search)
        if(params.search){
            uriComponent='/mcqQuestions/search?'+params.search
            this.setState({isFiltered:true})
        }
        this.fetchUnfilteredData(uriComponent)

        
    }

    fetchUnfilteredData(uriComponent){
        axios.get(webUtil.getApiUrl()+uriComponent)
        .then(response=> {
                this.RECORDS = response.data
                this.initilizedPagination(this.RECORDS)
                this.setState({isLoading:false})           
             }
        )
        .catch(error => {
            webUtil.handleError(error, this.props);
        })
    }

    hideDecisionModal = () => {
        this.setState({decisionModalIsOpen:false,decisionModalContent:null,deletingIndex:null})
    }

    hideDisplayModal = () => {
        this.setState({displayModalIsOpen:false}, () => {
            setTimeout(() => {
                this.setState({displayModalContent:null} )
            },300)
        })
    }

    viewHandler = (id) => {
        this.setState({displayModalIsOpen:true, displayModalContent:this.RECORDS[this.props.startPageIndex+id]})
    }

    editHandler = (id) => {
        this.props.history.push('/addMcq?questionId='+this.RECORDS[this.props.startPageIndex + id]['id']);
    }

    showDecisionModal = (id) => {
        this.setState({decisionModalIsOpen:true,decisionModalContent:this.RECORDS[this.props.startPageIndex+id]},() => {
            setTimeout(() => {
                this.setState({deletingIndex:id})
            },300)
        })
    }

    deleteHandler = (id) => {
        axios.delete(webUtil.getApiUrl() + '/mcqQuestions/' +this.RECORDS[this.props.startPageIndex+id]['id'])
        .then(()=>{
                this.props.setAlert({type:'success',message:'Succesfully deleted'})
                this.RECORDS.splice(this.props.startPageIndex+id,1);
                this.initilizedPagination(this.RECORDS)
                this.setState({deletingIndex:null})
            })
            .catch(error => {
                webUtil.handleError(error, this.props);
                this.setState({deletingIndex:null})

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
                <div className="col col-md-8 mx-auto" >
                    <div className="d-flex justify-content-between">
                    {this.state.isFiltered ? <span>
                    <Link to="/searchMcq" className="btn btn-sm mr-3 btn-light btn-outline-primary">
                        <Search /> Filters
                    </Link>
                    <button 
                        onClick={() => {this.setState({isLoading:true,isFiltered:false},
                                                    () => {   
                                                            this.props.history.push('/mcqList');
                                                            this.fetchUnfilteredData('/mcqQuestions/byUser')
                                                           })
                                        }
                                } 
                        className="btn btn-sm btn-light btn-outline-primary">
                        Clear Filters
                    </button></span> : <Link to="/searchMcq" className="btn btn-sm btn-light btn-outline-primary">
                        <Search /> Filters
                    </Link> }

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
            <div>
                <DecisionModal 
                    id={this.state.deletingIndex}
                    confirmationMessage={'Are You Sure You Want To Delete This Question ?'}
                    confirmActionHandler={this.deleteHandler}
                    modalIsOpen={!!this.state.decisionModalIsOpen} 
                    title={'Confirmation Window'} 
                    hideModal={this.hideDecisionModal} />

                <DisplayModal 
                    modalIsOpen={!!this.state.displayModalIsOpen} 
                    title={'Question Details'} 
                    hideModal={this.hideDisplayModal}>
                    {this.state.displayModalContent ? <ViewQuestion state={this.state.displayModalContent} /> : null}
                </DisplayModal>
            </div>
            {this.state.isLoading ? 
            <div 
                style={{width:'5rem',height:'5rem'}} 
                className="spinner-border d-block my-4 mx-auto">
            </div>
        :
                <div className='col-md-8 px-0 mx-auto'>

            <PrintTable 
                tableHeader={this.TABLE_HEADER} 
                tableBody={this.props.tableBody}
                option={{ view: this.viewHandler, edit: this.editHandler, delete: this.showDecisionModal }} />
                </div>
                }
        </div>)
    }

}

export default withAlert(withPagination(ListMcq));
