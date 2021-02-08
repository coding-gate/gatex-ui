import Axios from 'axios'
import React, { Component } from 'react'
import withAlert from '../../hoc/withAlert'
import AlertMessage from '../../components/alert/AlertMessage'
import Timer from '../../components/timer/timer';

class Exam extends Component {

    state = {
        questionNo: 1,
        questions: [],
        timeLimit:null,
        isLoading: true,
        examStarted:false,
        submitted:false,
        selectedAnswers: []
    }

    examQuestions = React.createRef()

    componentDidMount() {
        // if(this.state.examStarted && window.performance.navigation.type===1){
        //     this.submitExam()
        //     return
        // }
        this.checkFocus()
        Axios.get('https://gatex-exam-default-rtdb.firebaseio.com/test/-MRueLydQmkGp69T2C2b.json')
            .then(res => { 
                    let answers=[]
                    res.data.selectedQuestions.forEach(question => {
                        let ans = []
                        question.options.forEach(() => ans = [...ans,false])
                        answers = [...answers,ans]
                    })
                    this.setState({ questions: res.data.selectedQuestions,timeLimit:res.data.timeLimit,selectedAnswers:answers, isLoading: false }) 
            })
        
    }
    
    checkFocus= () => {
        setInterval(() => {
            if(this.state.examStarted && document.hidden){
                this.submitExam()
            }
        },1000)
    }

    answerSelect (index) {
        let selectedAnswers = { ...this.state.selectedAnswers }
        let questionIndex = this.state.questionNo-1

        if (this.state.questions[questionIndex].type === 'mmcq') {
            selectedAnswers[questionIndex]
                .forEach((_,i) => i===index ? 
                    selectedAnswers[questionIndex][i] = !selectedAnswers[questionIndex][i] : null )
        }

        else{
            selectedAnswers[questionIndex] = selectedAnswers[questionIndex].map((_,i) => i===index  )
        }

        this.setState({selectedAnswers})
    }

    answerClear = () => {
        let selectedAnswers = { ...this.state.selectedAnswers }
        let questionIndex = this.state.questionNo-1

        selectedAnswers[questionIndex]
                .forEach((_,i) => selectedAnswers[questionIndex][i] = false)

        this.setState({selectedAnswers})

    }

    startExam = () => {
        this.setState({examStarted:true},() => {
            this.autoSubmit = setTimeout(this.submitExam, this.state.timeLimit*60*1000)
        })
        
    }

    submitExam = () => {
        this.setState({isLoading:true},() =>{
            this.props.setAlert({type:'success',message:'Your Answers Have Been Submitted !'})
            setTimeout(() => {
                this.setState({submitted:true,isLoading:false})
            },1000)
            // Axios.post('url', 'body')
            //     .then(() => {
            //         this.setState({submitted:true})
            //     })
        })
    }

    render() {
        
        let questionIndices = []

        for (let i = 0; i < this.state.questions.length; i++) {
            questionIndices = [...questionIndices, <p 
                                                    className={this.state.questionNo === i + 1 ? 
                                                        'btn btn-light mr-3 active font-weight-bold' : 
                                                        'btn btn-light mr-3 font-weight-bold'} 
                                                    onClick={() => this.setState({ questionNo: i + 1 })} 
                                                    key={i}>Q - {i + 1}</p>]
        }

        return this.state.isLoading ?
            <div
                style={{ width: '5rem', height: '5rem' }}
                className="spinner-border d-block my-4 mx-auto">
            </div>
            :
            this.state.submitted ? 
            <div className="p-3 my-5 mx-auto col-10 col-lg-8 col-xl-6 offset-3">
                <AlertMessage alert = {this.props.alert}  reSetAlert={this.props.setAlert} /> 
                <p className="display-4 text-center">Please Close This Window Now.</p>
            </div>
            :
            this.state.examStarted ?
            ( 
                <div className='my-5 d-md-flex'>

                    <div className='col-md-3 col-lg-2 col-xl-1 border-right d-md-flex flex-row flex-md-column '>
                        {questionIndices}
                    </div>
                    <div className='bg-light border border-danger px-3' style={{position:'absolute', right:'0',top:'0',width:'11rem'}}>
                        <Timer time={this.state.timeLimit} />
                    </div>
                    <div className='mx-auto col-6'>

                        <p className='h3 mb-4 font-weight-normal text-center'>{this.state.questions[this.state.questionNo - 1].text}</p>
                        {
                            this.state.questions[this.state.questionNo - 1].options
                                .map((option, index) =>
                                    <div key={index} className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input
                                                    type={this.state.questions[this.state.questionNo - 1].type === 'mmcq' ? 'checkbox' : 'radio'}
                                                    name="answer"
                                                    value={option[0]}
                                                    id={index}
                                                    checked={this.state.selectedAnswers[this.state.questionNo-1][index]}
                                                    onChange={() => this.answerSelect(index)}
                                                />
                                            </div>
                                        </div>
                                        <label style={{ cursor: 'pointer' }} className='form-control w-75' htmlFor={index}>{option}</label>
                                    </div>)
                        }
                        
                        {
                            this.state.selectedAnswers[this.state.questionNo-1].some(elem => elem===true) ? 
                            <>
                            <button onClick={this.answerClear} className="btn btn-light my-3 border">Clear Selection</button>
                            <br/>
                            </>
                            : null
                        }
                        

                        <button
                            onClick={() => this.setState(prevState => ({ questionNo: prevState.questionNo - 1 }))}
                            className={this.state.questionNo === 1 ? 'd-none' : " btn btn-info"}>
                            Back</button>
                        <button
                            onClick={() => this.setState(prevState => ({ questionNo: prevState.questionNo + 1 }))}
                            className={this.state.questionNo === this.state.questions.length ? 'd-none' : "float-right btn btn-info"}>
                            Next</button>
                        <button
                            onClick={() => {
                                clearTimeout(this.autoSubmit)
                                this.submitExam()
                            }}
                            className={this.state.questionNo !== this.state.questions.length ? 'd-none' : "my-4 mx-auto w-50 btn-block btn btn-success"}>
                            Submit</button>
                    </div>
                </div>
            )
            :
            <div className='mt-4'>
                <h1 className='display-3 text-center mx-auto col-10 col-lg-8'>Welcome to the Gatex Exam</h1>
                <p className="h2 text-center mx-auto col-10 col-lg-8 col-xl-6 mt-4">Remember the rules before starting the exam</p>
                <ul className='p-3 my-4 pl-5 border mx-auto col-10 col-lg-8 col-xl-6'>
                    <li className='mb-2 font-weight-bold'>If You Refresh the page, The Exam will be auto-submitted.</li>
                    <li className='mb-2 font-weight-bold'>If you don't submit before the timer ends ({this.state.timeLimit} mins), The exam will be auto submitted. </li>
                    <li className='mb-2 font-weight-bold'>If you change the current window, The exam will be cancelled</li>
                </ul>

                <button onClick={this.startExam} className="btn btn-info my-3 d-block mx-auto">Start The Exam</button>
            </div>
    }
}

export default withAlert(Exam)