import React, { Component } from 'react'

import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import AlertMessage from '../../components/alert/AlertMessage'

import TestForm from './Test/Form'
import TestQuestions from './Test/TestQuestions'
import withAlert from '../../hoc/withAlert'
import ReviewTest from './Test/ReviewTest'

class CreateTest extends Component {

    state = {
        step: 3,
        title: '',
        selectedQuestions: [],
        date:'',
        time:'',
        timeLimit:''
    }

    updateState = (field, value) => {
        console.log(field,'----',value)
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

    render() {

        let body;

        switch(this.state.step){
            case 1 : body = <TestForm state = {this.state} setAlert={this.props.setAlert} updateState={this.updateState} />
                    break;
            case 2 : body = <TestQuestions
                                updateState={this.updateState}
                                setAlert={this.props.setAlert}
                                deleteSelectedQuestion={this.deleteSelectedQuestion}
                                selectedQuestions={this.state.selectedQuestions}
                                selectQuestion={this.selectQuestion} />
                    break;
            case 3 : body = <ReviewTest updateState={this.updateState} state={this.state} /> 
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

                <StepProgress steps='3' step={this.state.step} />

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
