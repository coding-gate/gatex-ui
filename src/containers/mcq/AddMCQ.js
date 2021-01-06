import React, { Component } from 'react'
import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import Text from './question/Text'
import Type from './question/Type'
import Options from './question/Options'
import Answer from './question/Answer'
import AlertMessage from '../../components/alert/AlertMessage'
import withAlert from '../../hoc/withAlert'
import SubmitMCQ from './SubmitMCQ'

class AddQuestion extends Component {
    state = {
        step: 1,
        text: '',
        tag: null,
        subject: null,
        time: null,
        complexity: null,
        type: null,
        answer: [],
        options: [''],
        alertObj:null

    }

    updateField = (field, value)=>{
        //console.log("updateField", field, value)
        this.setState({[field]: value });

    }
   
    submitHandler = () => {
        let Question = {
            body: this.state.text,
            type: this.state.type,
            options: this.state.options,
            answer: this.state.answer,
            hashtags:this.state.hashtags
        }
        console.log(Question)
    }
    cancel = () => {
        this.setState({step: 1,
            text: '',
            tag: null,
            subject: null,
            time: null,
            complexity: null,
            type: null,
            answer: [],
            options: [''],
            alertMessage:null})
    }

    render() {
        let body
        switch (this.state.step) {
            case 1: body = <Text   
                updateField={this.updateField}
                setAlert={this.props.setAlert}
                state={this.state} />
                break
            case 2: body = <Type
                updateField={this.updateField}
                setAlert={this.props.setAlert}            
                state={this.state}/>
                break
            case 3: body = <Options
                updateField={this.updateField}
                setAlert={this.props.setAlert}            
                state={this.state} />
                break
            case 4: body = <Answer            
                updateField={this.updateField}
                setAlert={this.props.setAlert}
                state={this.state}/>
                break
            case 5: body = <SubmitMCQ            
                cancel={this.cancel}
                submit={this.submitHandler}
                state={this.state}/>
                break
           // Why this?
            default: body = "Body"
        }
        return (
            <div>
                <div className="row">

                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '#', level: 'Add Question' }
                    ]} />

                </div>
                <StepProgress steps='4' step={this.state.step} />
                <div className="col-8 mx-auto my-3">
                <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert} />
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8" >
                       {body}
                    </div>
                </div>
            </div>
        )
    }
}

export default withAlert(AddQuestion)