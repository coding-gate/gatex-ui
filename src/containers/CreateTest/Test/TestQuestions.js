import React, { Component } from 'react'
import ListQuestion from '../../ListQuestion/ListQuestion'
import axios from 'axios'
import Select from 'react-select'

export default class TestQuestions extends Component {
    state={
        questions:[],
        hashTagParam:null,
        complexityParam:null,
        isLoading:true,
    }

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

        let questions = this.state.questions.filter(ques => ques.subject.value.toLowerCase()===this.props.state.subject.value.toLowerCase())


        if(this.state.complexityParam){
            questions = questions.filter(ques => ques.complexity.value.toLowerCase()===this.state.complexityParam.value.toLowerCase())
        }
        if(this.state.hashTagParam){
            questions = questions.filter(ques => ques.tag.map(tag=>tag.value.toLowerCase()).some(elem => elem.includes(this.state.hashTagParam.toLowerCase())))
        }
        
        return (
            <div className='col-9 mx-auto border p-5'>

                <div  className="row">
                    <p style={{position:'absolute',top:'0',left:'0'}} className="p-2 border-bottom border-right mx-auto text-capitalize text-center">Selected Topic : {this.props.state.subject.value}</p>
                    <p style={{position:'absolute',top:'0',right:'0'}} className="p-2 border-bottom border-left mx-auto text-capitalize text-center">Selected : <b>{this.props.selectedQuestions.length}</b> </p>
                </div>

                <div 
                    style={{position:'relative'}} 
                    className="row col-12 col-lg-9 p-3 pt-5 border rounded border-info mx-auto">
                    <p 
                        className='lead py-1 px-3 bg-white border border-info' 
                        style={{position:'absolute',top:'-1.2rem',left:'1.5rem',borderRadius:'15px'}}>
                    Filter</p>
                        <div className='col-12 mx-auto my-2 col-md-6'>
                            <input 
                                type="text" 
                                className='w-100 form-control' 
                                onChange={e => this.setState({hashTagParam:e.target.value})} 
                                placeholder='Hashtag'/>
                        </div>

                        <div className='col-12 mx-auto my-2 col-md-6'>
                            <Select 
                                isClearable
                                placeholder='Complexity'
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
                    questions.length >0 ? 
                        <ListQuestion 
                            selectedQuestions={this.props.selectedQuestions} 
                            selectQuestion={this.props.selectQuestion} 
                            questions={questions} />
                        : 
                        <p className='mx-auto border p-3 lead'>No Questions Found...</p>
                }
                </div>

                <div className="d-flex align-items-end row">
                    <button onClick={this.back} className="btn d-block ml-auto mr-4 btn-secondary">Back</button>
                    <button onClick={this.proceed} className="btn d-block btn-info">Proceed</button>
                </div>
                
            </div>
        )
    }
}
