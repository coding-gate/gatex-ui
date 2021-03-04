import React, { Component } from 'react'
import axios from '../../../utils/AxiosWithToken'
import Select from 'react-select'
import * as webUtil from '../../../utils/WebUtil'
import * as Settings from '../../../utils/SiteSettings'
import withPagination from '../../../hoc/withPagination'
import PrintTable from '../../../components/pagination/PrintTable'


class TestQuestions extends Component {
    state={
        questions:[],
        hashTagParam:null,
        complexityParam:null,
        isLoading:true,
    }

    TABLE_HEADER = [{ field: " ", class: "col-1" },
    { field: "ID", class: "col-1" },
    { field: "Type", class: "col-1" },
    { field: "Question", class: "col-6" },
    { field: " ", class: "col-3" }]

    componentDidMount(){

        axios.get(webUtil.getApiUrl() + `/mcqQuestions/search?lang=${this.props.state.fields.subject.value}&`)
            .then(res => res.data)
            .then(data => {
                this.setState({isLoading:false,questions:[...data]},() => {
                    this.state.questions.map((e,index)=>{ return [index+1,e['type'],e['text']]}) 
                    this.props.initPagination(this.state.questions)
                })
            })
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.hashTagParam!==this.state.hashTagParam || prevState.complexityParam!==this.state.complexityParam ){
            let questions = [...this.state.questions]
            if(this.state.hashTagParam){
                questions = questions.filter(ques => ques.tags.map(tag=>tag.value.toLowerCase()).some(elem => elem.includes(this.state.hashTagParam.toLowerCase())))
            }
            if(this.state.complexityParam){
                questions = questions.filter(ques => ques.complexity.value.toLowerCase()===this.state.complexityParam.value.toLowerCase()) 
            }
            this.props.initPagination(questions)
        }

    }

    selectQuestion = (data) => {
        let selectedQuestions = [...this.props.state.fields.selectedQuestions]
        selectedQuestions = selectedQuestions.map(ques=> ques.id).includes(data.id) ? selectedQuestions.filter(ques => ques.id!==data.id) : [...selectedQuestions, data]
        this.props.updateState('selectedQuestions',selectedQuestions)
    }

    proceed = () => {
        if(!this.props.state.fields.selectedQuestions.length>0){
            this.props.setAlert({type:'warning',message:'Please Enter At least one question'})
            return
        }
        this.props.setAlert(null)
        this.props.updateState('step',3)
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
                        Selected Topic : <b> {this.props.state.fields.subject.label}</b>
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
                            <input 
                                type="text" 
                                className='w-100 form-control' 
                                onChange={e => this.setState({hashTagParam: e.target.value})} 
                                placeholder='Hashtag'/>
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
                    option={{ view: this.props.showModal, select: this.selectQuestion }} />
                    : 
                    <p className='p-2 bg-light font-weight-bold border text-center col-6 col-lg-3 mx-auto'>No Questions Found</p> }
                    
                </div>

                <div className="d-flex align-items-end row">
                    <button onClick={this.back} className="btn d-block ml-auto mr-4 btn-secondary">Back</button>
                    <button onClick={this.proceed} className="btn d-block mr-4 btn-info">Proceed</button>
                </div>
                
            </div>
        )
    }
}

export default withPagination(TestQuestions)