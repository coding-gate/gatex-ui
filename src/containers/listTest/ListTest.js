import React, { Component } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import LockablePrintTable  from '../../components/pagination/LockablePrintTable'
import AlertMessage from '../../components/alert/AlertMessage';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'react-bootstrap-icons'

import axios from '../../utils/AxiosWithToken'

import withAlert from '../../hoc/withAlert'
import withPagination from '../../hoc/withPagination';

import * as webUtil from '../../utils/WebUtil'
import * as QueryString from "query-string"
import DecisionModal from '../../components/modal/DecisionModal';

class ListTest extends Component {

    state={
        isLoading:true,
        isFiltered:false,
        decisionModalIsOpen:false,
        lockModalIsOpen:false,
        deletingIndex:null,
        lockIndex:null
    }
    

    TABLE_HEADER = [
        { field: "ID", class: "col-1" },
        { field: "Topic", class: "col-2" },
        { field: "TimeLimit", class: "col-2" },
        { field: "Title", class: "col-4 col-xl-5" },
        { field: " ", class: "col-3 col-xl-2" },
]

    RECORDS=[]

    initilizedPagination=(records)=>{
        let allRecords=records.map((e,index)=>{ return [index+1,e['language'].value.toUpperCase(), e['timeLimit']+' Mins',e['title'],{isLocked : e['isLocked']}]})            
        this.props.initPagination(allRecords); 
    }

    componentDidMount() {
       let uriComponent='/mcqTest/byUser';
        const params = QueryString.parse(this.props.location.search)
        if(params.search){
            uriComponent='/mcqTest/search?'+params.search
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

    
    editHandler = (id) => {
        this.props.history.push('/createTest?testId='+this.RECORDS[this.props.startPageIndex + id]['id']);
    }
    
    showDecisionModal = (id) => {
        document.body.style.overflow = 'hidden'
        this.setState({decisionModalIsOpen:true,deletingIndex:id})
    }

    showLockModal = (id) => {
        this.setState({lockModalIsOpen:true,lockIndex:id})
    }

    lockhandler = (id) => {
        this.RECORDS[this.props.startPageIndex+id].isLocked = true
    }

    hideDecisionModal = () => {
        document.body.style.overflow = 'visible'
        this.setState({decisionModalIsOpen:false,deletingIndex:null})
    }

    hideLockModal = () => {
        document.body.style.overflow = 'visible'
        this.setState({lockModalIsOpen:false})
    }

    deleteHandler = (id) => {
        axios.delete(webUtil.getApiUrl() + '/mcqTest/' +this.RECORDS[this.props.startPageIndex+id]['id'])
        .then(()=>{
                this.props.setAlert({type:'success',message:'Succesfully deleted'})
                this.RECORDS.splice(this.props.startPageIndex+id,1);
                this.initilizedPagination(this.RECORDS)
                this.setState({deletingIndex:null})
            })
            .catch(error => {
                webUtil.handleError(error, this.props)
                this.setState({deletingIndex:null})

            })         
    }


    render() {
        return (<div>
            {/* bread crumb */}
            <div className="row" >
                <Breadcrumb elements={[
                    { url: '/', level: 'Home' },
                    { url: '#', level: 'Test List' },
                ]} />
            </div>
           
            <div className="row mb-2">
                <div className="col col-md-8 mx-auto" >
                    <div className="d-flex justify-content-between">
                    {this.state.isFiltered ? <span>
                    <Link to="/searchTest" className="btn btn-sm mr-3 btn-light btn-outline-primary">
                        <Search /> Filters
                    </Link>
                    <button 
                        onClick={() => {this.setState({isLoading:true,isFiltered:false},
                                                    () => {   
                                                            this.props.history.push('/testList');
                                                            this.fetchUnfilteredData('/mcqTest/byUser')
                                                           })
                                        }
                                } 
                        className="btn btn-sm btn-light btn-outline-primary">
                        Clear Filters
                    </button></span> : <Link to="/searchTest" className="btn btn-sm btn-light btn-outline-primary">
                        <Search /> Filters
                    </Link> }

                    <Link to="/createTest" className="btn btn-sm btn-light btn-outline-primary">
                        <Plus style={{fontSize:'1.3rem'}} /> Create New
                    </Link>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mx-auto">
                    <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert} />
                </div>
            </div>

            <div>
                <DecisionModal 
                    id={this.state.deletingIndex}
                    confirmationMessage={'Are You Sure You Want To Delete This Test ?'}
                    confirmActionHandler={this.deleteHandler}
                    modalIsOpen={this.state.decisionModalIsOpen} 
                    title={'Confirmation Window'} 
                    hideModal={this.hideDecisionModal} />
                <DecisionModal 
                    id={this.state.deletingIndex}
                    confirmationMessage={'Are You Sure You Want To Lock This Test ?'}
                    confirmActionHandler={this.lockhandler}
                    modalIsOpen={this.state.lockModalIsOpen} 
                    title={'Confirmation Window'} 
                    hideModal={this.hideLockModal} />
            </div>

            {this.state.isLoading ? 
                <div 
                    style={{width:'5rem',height:'5rem'}} 
                    className="spinner-border d-block my-4 mx-auto">
                </div>
                :
                <div className='col-md-8 px-0 mx-auto'>
                    <LockablePrintTable  
                        tableHeader={this.TABLE_HEADER} 
                        tableBody={this.props.tableBody}
                        option={{ lock: this.showLockModal, edit: this.editHandler, delete: this.showDecisionModal }}
                         />
                </div>
            }
        </div>)
    }
}

export default withAlert(withPagination(ListTest));
