import React, { Component } from 'react'
import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import AlertMessage from '../../components/alert/AlertMessage'
import withAlert from '../../hoc/withAlert'

import GeneralField from './component/GeneralFields'
import CodeField from './component/CodeFields'
import ValidateTest from './component/ValidateTest'

class AddCodeQuestion extends Component {
    state = {
        fields: {},
        tagOptions: null,
        step: 1,
        isLoading: false
    }

    clearFields = () => {
        let fields = { ...this.state.fields };
        for (var key in fields) {
            fields[key] = null;
        }
        this.setState({ fields });
    }

    updateFromField = (name, value) => {
        let fields = { ...this.state.fields };
        fields[name] = value;
        this.setState({ fields });
    }

    updateStateField = (name, value) => {
        if (name === 'step') {
            this.props.setAlert(null)
        }
        this.setState({ [name]: value });
    }


    handleNext = (errorMessages, nextVal) => {

        for (var key in errorMessages) {
            let field = this.state.fields[key];
            if (field == null || field === '') {
                this.props.setAlert({ type: 'warning', message: errorMessages[key] })
                return
            }
        }
        this.props.setAlert(null)
        this.setState({ step: nextVal });
    }

    render() {

        let body
        switch (this.state.step) {
            case 1: body = <GeneralField updateFromField={this.updateFromField}
                updateStateField={this.updateStateField}
                setAlert={this.props.setAlert}
                handleNext={this.handleNext}
                state={this.state} />
                break
            case 2: body = <CodeField updateFromField={this.updateFromField}
                updateStateField={this.updateStateField}
                setAlert={this.props.setAlert}
                handleNext={this.handleNext}
                state={this.state} />
                break
            case 3: body = <ValidateTest updateFromField={this.updateFromField}
                updateStateField={this.updateStateField}
                setAlert={this.props.setAlert}
                handleNext={this.handleNext}
                state={this.state} />
                break
            default: body = "Body"

        }

        return (
            <div>
                <div className="row">

                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '/mcqList', level: 'MCQ List' },
                        { url: '#', level: this.state.isRedirected ? 'Edit Question' : 'Add Question' }
                    ]} />

                </div>
                <StepProgress steps='3' step={this.state.step} />
                <div className="col-8 mx-auto my-3">
                    <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert} />
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8" >
                        {this.state.isLoading
                            ? <div style={{ width: '5rem', height: '5rem' }}
                                className="spinner-border mx-auto d-block mt-5">
                            </div>
                            : body
                        }
                    </div>
                </div>
            </div>
        )
    }

}


export default withAlert(AddCodeQuestion)