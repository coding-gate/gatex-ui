import React, { Component } from 'react'
import ListQuestion from '../../ListQuestion/ListQuestion'
import axios from 'axios'
import Select from 'react-select'

export default class TestQuestions extends Component {
    state={
        questions:[],
        subjectParam:null,
        complexityParam:null,
        isLoading:true,


    }

    subjectOptions = [
        { value: 'java', label: 'Java' },
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'Javascript' }
    ];

    complexityOption = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'complex', label: 'Complex' }
    ]

    componentDidMount(){
        axios.get('https://gatex-exam-default-rtdb.firebaseio.com/question.json')
            .then(res => res.data)
            .then(data => {
                for(let key in data ){
                    data[key].id = key
                    this.setState({questions : [...this.state.questions, data[key]],isLoading:false})
                }
            })
    }

    proceed = () => {
        if(!this.props.selectedQuestions.length>0){
            this.props.setAlert({type:'warning',message:'Please Enter Some Questions'})
        }
        this.props.setAlert(null)
        this.props.updateState('step',3)
    }

    back = () => {
        this.props.setAlert(null)
        this.props.updateState('step',1)
    }

    render() {

        let questions = this.state.questions

        if(this.state.complexityParam){
            questions = questions.filter(ques => ques.complexity.value.toLowerCase()===this.state.complexityParam.value.toLowerCase())
        }

        if(this.state.subjectParam){
            questions = questions.filter(ques => ques.subject.value.toLowerCase()===this.state.subjectParam.value.toLowerCase())
        }
        
        return (
            <div className='col-9 mx-auto border p-5'>

                <button data-toggle="modal" data-target="#exampleModal" className='ml-auto mb-4 d-block btn border btn-light'>Selected : <b>{this.props.selectedQuestions.length}</b> </button>

                <div 
                    style={{position:'relative'}} 
                    className="row col-12 col-lg-9 p-3 pt-5 border rounded border-info mx-auto">
                    <p 
                        className='lead py-1 px-3 bg-white border border-info' 
                        style={{position:'absolute',top:'-1.2rem',left:'1.5rem',borderRadius:'15px'}}>
                    Filter</p>
                        <div className='col-12 mx-auto my-2 col-md-6'>
                            <Select 
                            isClearable
                            placeholder='Filter By Subject'
                            value={this.state.subjectParam}
                            onChange={(val) => this.setState({subjectParam:val,complexityParam:null})}
                            options={this.subjectOptions}/>
                        </div>

                        <div className='col-12 mx-auto my-2 col-md-6'>
                            <Select 
                            isClearable
                            placeholder='Filter By Complexity'
                            value={this.state.complexityParam}
                            onChange={(val) => this.setState({complexityParam:val})}
                            options={this.complexityOption}/>
                        </div>
                </div>

                <div className="row mx-auto mt-4 col-12 col-lg-9">
                    {this.state.isLoading ? 
                    <div 
                        style={{width:'5rem',height:'5rem'}} 
                        className="spinner-border d-block mt-5 mx-auto">
                    </div> 
                    :
                    this.state.subjectParam ?
                        questions.length >0 ? 
                        <ListQuestion 
                            selectedQuestions={this.props.selectedQuestions} 
                            selectQuestion={this.props.selectQuestion} 
                            questions={questions} />
                        : 
                        <p className='mx-auto border p-3 lead'>No Questions Found...</p>
                    :
                    <p className='mx-auto border p-3 lead'>Please Select A Subject First...</p>
                }
                </div>

                <div className="d-flex align-items-end row">

                <button onClick={this.back} className="btn d-block ml-auto mr-4 btn-secondary">Back</button>
                <button onClick={this.proceed} className="btn d-block btn-info">Proceed</button>
                </div>

                <div className="modal fade mt-5" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Selected Questions:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span className='text-danger' aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.selectedQuestions
                                    .map((ques, index) => <div key={index} className='d-flex align-items-center rounded border p-2 mb-3 mx-auto col-12'>
                                        <p className='mb-0 col-10'>
                                            <b>{'Q-' + Number(index + 1)} :&nbsp; </b>
                                            {ques.text}
                                        </p>
                                        <div
                                            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                            onClick={() => this.props.deleteSelectedQuestion(ques.id)}
                                            className="text-right text-danger col-2"><b>&times;</b></div>
                                    </div>)}
                                {this.props.selectedQuestions.length>0 ? null: <h4 className="lead">No Questions Selected...</h4> }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
