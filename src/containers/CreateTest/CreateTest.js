import React, { Component } from 'react'

import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import AlertMessage from '../../components/alert/AlertMessage'

import TestForm from './Test/Form'
import TestQuestions from './Test/TestQuestions'
import withAlert from '../../hoc/withAlert'
import ReviewTest from './Test/ReviewTest'

import Axios from 'axios'
import SelectedQuestions from './Test/SelectedQuestions'

class CreateTest extends Component {

    state = {
        step: 1,
        title: '',
        selectedQuestions: [],
        subject:null,
        timeLimit:'',
        isLoading:false
    }

    updateState = (field, value) => {
        //console.log(field,'----',value)
        this.setState({[field]:value})
    }

    selectQuestion = (checked, question) => {
        let selectedQuestions = this.state.selectedQuestions
        if (checked) {
            selectedQuestions = [...selectedQuestions, question]
        }
        else {
            selectedQuestions = selectedQuestions.filter(ques => ques.id !== question.id)
        }
        this.setState({ selectedQuestions })
    }

    deleteSelectedQuestion = (questionId) => {
        let selectedQuestions = this.state.selectedQuestions
        selectedQuestions = selectedQuestions.filter(ques => ques.id !== questionId)
        this.setState({ selectedQuestions })
    }

    changeSubject = (val) => {
        this.setState({subject:val, selectedQuestions:[]})
    }

    submitTest = () => {
        const test = {...this.state}
        delete test.step
        delete test.isLoading
        this.setState({isLoading:true,step:'5'}, () => {
            Axios.post(`https://gatex-exam-default-rtdb.firebaseio.com/test.json`,test)
                .then(() => this.setState({step: 1,
                                            title: '',
                                            selectedQuestions: [],
                                            date:'',
                                            time:'',
                                            timeLimit:'',
                                            isLoading:false},() => {this.props.setAlert({type:'success', message:'Test Successfully Created'})}))
                .catch(err => console.log(err))
            }
        )
    }

    render() {

        let body;

        switch(this.state.step){
            case 1 : body = <TestForm 
                                changeSubject={this.changeSubject}
                                state = {this.state} 
                                setAlert={this.props.setAlert} 
                                updateState={this.updateState} />
                    break;
            case 2 : body = <TestQuestions
                                state={this.state}
                                updateState={this.updateState}
                                setAlert={this.props.setAlert}
                                selectedQuestions={this.state.selectedQuestions}
                                selectQuestion={this.selectQuestion} />
                    break;
            case 3 : body = <SelectedQuestions 
                                updateState={this.updateState}
                                setAlert={this.props.setAlert}
                                deleteSelectedQuestion={this.deleteSelectedQuestion}
                                state={this.state} /> 
                    break;
            case 4 : body = <ReviewTest 
                                submit={this.submitTest} 
                                updateState={this.updateState} 
                                state={this.state} /> 
                    break;
            default : break;
        }

        return (
            <div>
                <div className="row">
                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '#', level: 'Create Test' },
                    ]} />
                </div>

                <StepProgress steps='4' step={this.state.step} />

                <div className="col-8 mx-auto my-3">
                    <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert} />
                </div>
                <div className="my-4 col-12">
                    {body}
                </div>

            </div>
        )
    }
}

export default withAlert(CreateTest)
