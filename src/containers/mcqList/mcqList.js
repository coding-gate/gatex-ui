import React, { Component } from 'react'
import axios from 'axios'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import Select from 'react-select'
import ListQuestion from './ListQuestion/ListQuestion'

export default class mcqList extends Component {

    state={
        questions:[],
        isLoading:true,
        isDeleting:false,
        deletingIndex:null,
        isSelecting:false,
        searchParam:'',
        complexityParam:null,
        subjectParam:null,
    }

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

    deleteQuestion = (questionId,i) => {
        let index = this.state.questions.indexOf(this.state.questions.filter(ques =>ques.id===questionId)[0])
        this.setState({isDeleting:true,deletingIndex:i},()=> {
            let questions = this.state.questions
            questions.splice(index,1)
            setTimeout(()=>{
                this.setState({deletingIndex:false})
            },800)
            // axios.delete('https://gatex-exam-default-rtdb.firebaseio.com/question/'+questionId+'.json')
            //     .then(res => {
            //         this.setState({isDeleting:false,questions})
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     })
        })
    }

    render() {
        
        let questions = this.state.questions

        if(this.state.complexityParam){
            questions = questions.filter(ques => ques.complexity.value.toLowerCase()===this.state.complexityParam.value.toLowerCase())
        }

        if(this.state.subjectParam){
            questions = questions.filter(ques => ques.subject.value.toLowerCase()===this.state.subjectParam.value.toLowerCase())
        }
        
        if(this.state.searchParam){
            questions = questions.filter(ques => ques.tag.map(tag=>tag.value.toLowerCase()).some(val=>val.includes(this.state.searchParam.toLowerCase()))|| ques.text.toLowerCase().includes(this.state.searchParam.toLowerCase()))
        }
                                    
        return (
            <div >
                <div className="row">
                <Breadcrumb elements={[
                    { url: '/', level: 'Home' },
                    { url: '/#', level: 'MCQ List' },
                ]} />
                </div>

                <div className="row">
                    <div style={{minHeight:'calc(100vh - 170px)'}} className="col-md-3 col-lg-3 col-xl-2 border-right d-none d-md-block">
                        <p style={{fontSize:'20px'}} className='text-center bg-light py-2 font-weight-bold rounded border '>Repositories</p>
                        <p style={{cursor:'pointer',fontSize:'1.1rem'}} className='font-weight-bold pl-3'><u>Local Repository</u></p>
                        <p style={{cursor:'pointer',fontSize:'1.1rem'}} className='font-weight-bold pl-3'><u>Global Repository</u></p>
                    </div>

                    <div className="col-12 col-md-9 col-lg-9 col-xl-10">
                        <div className="col-9 mx-auto">
                            <div className="row">
                                <div className="col-12 col-xl-6 mb-3">
                                    <input 
                                    type="text" 
                                    placeholder='Search...' 
                                    onChange={(e) => this.setState({searchParam:e.target.value})}
                                    className='form-control'/>
                                </div>
                                
                                <div className="col-6 col-xl-3">
                                    <Select 
                                    isClearable
                                    placeholder='Filter By Complexity'
                                    value={this.state.complexity}
                                    onChange={(val) => this.setState({complexityParam:val})}
                                    options={this.complexityOption}/>
                                </div>
                                
                                <div className="col-6 col-xl-3">
                                    <Select 
                                    isClearable
                                    placeholder='Filter By Subject'
                                    value={this.state.complexity}
                                    onChange={(val) => this.setState({subjectParam:val})}
                                    options={this.subjectOptions}/>
                                </div>
                            </div>
                            
                        </div>
                    
                        <div className="row col-9 mx-auto bg-light p-2 my-3">
                            <div className="col-lg-10 col-8  text-center">Questions</div>
                            <div className="col-lg-1 col-2 text-center">Delete</div>
                            <div className="col-lg-1 col-2 text-center">Edit</div>
                        </div>

                        <div className="row mx-auto col-9 p-0">
                            {this.state.isLoading ? 
                                <div 
                                    style={{width:'5rem',height:'5rem'}} 
                                    className="spinner-border d-block mt-5 mx-auto"></div> 
                                : <ListQuestion 
                                    deletingIndex={this.state.deletingIndex}
                                    deleteQuestion={this.deleteQuestion}
                                    questions={questions} /> }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
