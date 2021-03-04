import React, { Component } from 'react'

import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import AlertMessage from '../../components/alert/AlertMessage'
import withAlert from '../../hoc/withAlert'

import TestForm from './test/Form'
import TestQuestions from './test/TestQuestions'
import SelectedQuestions from './test/SelectedQuestions'
import SubmitTest from './test/SubmitTest'

import DisplayModal from '../../components/modal/DisplayModal'
import ViewQuestion from '../viewQuestion/ViewQuestion'

class CreateTest extends Component {

    state = {
        step: 1,
        fields:{},
        modalIsOpen:false,
        modalContent:null,
        isLoading:false
    }

    initializedState = () => {
        this.setState({
            step: 1,
            fields:{},
            modalIsOpen:false,
            modalContent:null,
            isLoading:false
        })

    }

    updateState = (field, value) => {
        if(field==='step'||field==='isLoading'){
            this.setState({[field]:value})
        }
        else{
            this.setState({fields:{...this.state.fields,[field]:value}})
        }
    }

    showModal = (content) => {
        document.body.style.overflow = 'hidden'
        this.setState({modalIsOpen:true, modalContent:content})
    }

    hideDisplayModal = () => {
        document.body.style.overflow = 'visible'

        this.setState({modalIsOpen:false}, () => {
            setTimeout(() => {
                this.setState({modalContent:null} )
            },300)
        })
    }

    changeSubject = (val) => {
        let fields = this.state.fields
        fields['subject'] =val
        fields['selectedQuestions'] = []
        this.setState({fields})
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
                                showModal={this.showModal}
                                updateState={this.updateState}
                                setAlert={this.props.setAlert}
                                selectQuestion={this.selectQuestion} />
                    break;
            case 3 : body = <SelectedQuestions 
                                updateState={this.updateState}
                                setAlert={this.props.setAlert}
                                state={this.state} /> 
                    break;
            case 4 : body = <SubmitTest 
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

                <DisplayModal 
                    modalIsOpen={this.state.modalIsOpen} 
                    title={'Question Details'} 
                    hideModal={this.hideDisplayModal}>
                    {this.state.modalContent ? <ViewQuestion state={this.state.modalContent} /> : null}
                </DisplayModal>
                
                <div className="my-4 col-12">
                    {body}
                </div>

            </div>
        )
    }
}

export default withAlert(CreateTest)