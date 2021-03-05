import React, { Component } from 'react'
import axios from '../../../utils/AxiosWithToken'
import Select from 'react-select'
import * as webUtil from '../../../utils/WebUtil'
import * as Settings from '../../../utils/SiteSettings'
import withPagination from '../../../hoc/withPagination'
import PrintTable from '../../../components/pagination/PrintTable'
import ReactHtmlParser from 'react-html-parser'



class TestQuestions extends Component {
    state={
        hashTagParam:null,
        complexityParam:null,
        isLoading:true,
    }

    errorMessages={selectedQuestions:'Please Select At Least One Question'};

    TABLE_HEADER = [{ field: " ", class: "col-1" },
    { field: "ID", class: "col-1" },
    { field: "Type", class: "col-1" },
    { field: "Question", class: "col-6" },
    { field: " ", class: "col-3" }]

    allQuestions=[]
    
    filteredQuestions = []

    componentDidMount(){

        axios.get(webUtil.getApiUrl() + `/mcqQuestions/search?lang=${this.props.state.fields.language.value}&`)
            .then(res => res.data)
            .then(data => {
                this.allQuestions=[...data]
                this.filteredQuestions=[...data]
                this.initializePagination(this.allQuestions)
                this.setState({isLoading:false})
            })
    }

    initializePagination = (data) => {
        let formatted = data.map((e,index)=>{ return [index+1,e['type'].toUpperCase(),ReactHtmlParser( e['text']),{id:e['id']}]}) 
        this.props.initPagination(formatted)

    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.hashTagParam!==this.state.hashTagParam || prevState.complexityParam!==this.state.complexityParam ){
            this.filteredQuestions = [...this.allQuestions]
            if(this.state.hashTagParam){
                this.filteredQuestions = this.filteredQuestions.filter(ques => ques.tags.map(tag=>tag.value.toLowerCase()).some(elem => elem.includes(this.state.hashTagParam.value.toLowerCase())))
            }
            if(this.state.complexityParam){
                this.filteredQuestions = this.filteredQuestions.filter(ques => ques.complexity.value.toLowerCase()===this.state.complexityParam.value.toLowerCase()) 
            }
            this.initializePagination(this.filteredQuestions)
        }

    }

    fetchModalData = id => {
        this.props.showModal(this.filteredQuestions[this.props.startPageIndex+id])
    }

    selectQuestion = (id) => {
        let selectedQuestions = [...this.props.state.fields.selectedQuestions]
        selectedQuestions = selectedQuestions.map(ques=> ques.id).includes(this.filteredQuestions[this.props.startPageIndex+id]['id']) ? selectedQuestions.filter(ques => ques.id!==this.filteredQuestions[this.props.startPageIndex+id]['id']) : [...selectedQuestions, this.filteredQuestions[this.props.startPageIndex+id]]
        this.props.updateState('selectedQuestions',selectedQuestions)
    }

    back = () => {
        this.props.setAlert(null)
        this.props.updateState('step',1)
    }

    render() {

        return (
            <div className='col-12 col-md-9 py-4 mx-auto border'>

                <div  className="row">
                    <p 
                    style={{position:'absolute',top:'0',left:'0'}} 
                    className="p-2 border-bottom border-right mx-auto text-capitalize text-center">
                        Selected Topic : <b> {this.props.state.fields.language.label}</b>
                        </p>
                    <p 
                    style={{position:'absolute',top:'0',right:'0'}} 
                    className="p-2 border-bottom border-left mx-auto text-capitalize text-center">
                        Selected : <b>
                                        {this.props.state.fields.selectedQuestions.length}
                                   </b> 
                    </p>
                </div>

                <div 
                    style={{position:'relative',marginTop:'4rem'}} 
                    className="row col-12 col-lg-9 p-3 pt-5 border rounded border-info mx-auto">
                    <p 
                        className='lead py-1 px-3 bg-white border border-info' 
                        style={{position:'absolute',top:'-1.2rem',left:'1.5rem',borderRadius:'15px'}}>
                    Filter</p>
                        <div className='col-12 mx-auto my-2 col-md-6'>
                            <Select 
                                isClearable
                                placeholder='Hashtags'
                                onChange={(val) => this.setState({hashTagParam:val})}
                                options={Settings.tagsOptions}/>
                        </div>

                        <div className='col-12 mx-auto my-2 col-md-6'>
                            <Select 
                                isClearable
                                placeholder='Complexity'
                                onChange={(val) => this.setState({complexityParam:val})}
                                options={Settings.complexityOption}/>
                        </div>
                </div>
                

                <div className="mx-auto mt-4 col-12 col-lg-9 px-0">
                    {this.state.isLoading ? 
                    <div 
                    style={{width:'5rem',height:'5rem'}} 
                    className="spinner-border d-block my-4 mx-auto">
                </div>
                    
                    : this.props.tableBody.length ? 
                <PrintTable 
                    selected={this.props.state.fields.selectedQuestions}
                    tableHeader={this.TABLE_HEADER} 
                    tableBody={this.props.tableBody}
                    option={{ view: this.fetchModalData, select: this.selectQuestion }} />
                    : 
                    <p className='p-2 bg-light font-weight-bold border text-center col-6 col-lg-3 mx-auto'>No Questions Found</p> }
                    
                </div>

                <div className="d-flex align-items-end row">
                    <button onClick={this.back} className="btn d-block ml-auto mr-4 btn-outline-primary">Back</button>
                    <button onClick={() => this.props.handleNext(this.errorMessages,3)} className="btn d-block mr-4 btn-primary">Proceed</button>
                </div>
                
            </div>
        )
    }
}

export default withPagination(TestQuestions)