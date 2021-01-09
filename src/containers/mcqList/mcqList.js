import React, { Component } from 'react'
import axios from 'axios'
import classes from './mcqList.module.css'
import ViewQuestion from '../ViewQuestion/ViewQuestion'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { Link } from 'react-router-dom'

export default class mcqList extends Component {

    state={
        questions:[],
        isLoading:true,
        isDeleting:false,
        deletingIndex:null
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

    deleteQuestion = (questionId,index) => {
        this.setState({isDeleting:true, deletingIndex:index},()=> {
            let questions = this.state.questions
            questions.splice(index,1)
            axios.delete('https://gatex-exam-default-rtdb.firebaseio.com/question/'+questionId+'.json')
                .then(res => {
                    this.setState({isDeleting:false,deletingIndex:null,questions})
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }
    render() {
        let editButton = <>
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </>

        let delButton = <>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </>

        let questions = this.state.questions
                            .map((ques,i) => 
                                            <div className='w-100' key={i}>
                                                <div 
                                                style={{borderRadius:'10px'}}  
                                                className={classes.question + ' border border-rounded d-flex align-items-center mb-3'}
                                                >
                                                    <div
                                                        data-toggle="collapse" 
                                                        data-target={`#question${i}`}
                                                        className="col-md-10 border-right p-2 pl-3 col-8">
                                                        <span><b>Q-{i+1} : &nbsp;</b></span>
                                                        {ques.text}
                                                    </div>

                                                    <div 
                                                        className="col-md-1 col-2 p-2 border-right text-center"> 
                                                        <svg 
                                                            data-toggle="collapse" 
                                                            data-target={`#delete${i}`}
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            width="28" 
                                                            height="28" 
                                                            fill="currentColor" 
                                                            className={classes.delIcon} 
                                                            viewBox="0 0 16 16">
                                                        {delButton}
                                                        </svg>
                                                    </div>

                                                    <div className="col-md-1 col-2 h-100 p-2 text-center">
                                                        <Link className='text-secondary' to={'/addMcq?questionId='+ques.id} >

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                width="28" 
                                                                height="28" 
                                                                fill="currentColor" 
                                                                className={classes.editIcon}
                                                                viewBox="0 0 16 16">
                                                            {editButton}
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div id={`delete${i}`} className='collapse'>
                                                    <div className='mb-3 w-50 mx-auto border border-danger p-3'>

                                                    <p className='text-center'>Are You Sure You Want To Delete The Question ??</p> 
                                                    <div className='d-flex justify-content-center'>
                                                        <button data-toggle="collapse" 
                                                                data-target={`#delete${i}`} 
                                                                className='btn btn-warning mr-4'>Cancel</button>

                                                        <button 
                                                                onClick={() => this.deleteQuestion(ques.id,i)} 
                                                                className='btn btn-danger ml-4'>Confirm</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div style={{position:'relative'}} className='collapse w-100 mb-3' id={`question${i}`}>
                                                    <ViewQuestion state={ques} />
                                                    <span 
                                                        data-toggle="collapse" 
                                                        data-target={`#question${i}`} 
                                                        style={{cursor:'pointer',position:'absolute', top:'0rem',right:'1rem',fontSize:'2.5rem',  color:'red'}}>&times;</span>
                                                </div>
                                            </div>
                                            )
        if(this.state.isDeleting){
            questions[this.state.deletingIndex] = <div 
                                style={{width:'5rem',height:'5rem'}} 
                                className="spinner-border d-block my-4 mx-auto">
                            </div>
        }

        return (
            <div >
                <div className="row">
                <Breadcrumb elements={[
                    { url: '/', level: 'Home' },
                    { url: '/#', level: 'MCQ List' },
                ]} />
                </div>
                <div className="col-9 d-flex justify-content-between mx-auto">
                    <button className="btn btn-info">
                        <Link to='addMcq' className='text-white'>
                            Add New Question
                        </Link>
                    </button>
                    <div className='text-right'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
</svg>
                    </div>
                </div>
                <div className="row col-9 mx-auto bg-light p-2 my-3">
                    <div className="col-md-10 col-8  text-center">Questions</div>
                    <div className="col-md-1 col-2 text-center">Delete</div>
                    <div className="col-md-1 col-2 text-center">Edit</div>
                </div>
                <div className="row mx-auto w-75">
                    {this.state.isLoading ? 
                        <div 
                            style={{width:'5rem',height:'5rem'}} 
                            className="spinner-border d-block mt-5 mx-auto"></div> 
                        : questions}
                </div>
            </div>
        )
    }
}
