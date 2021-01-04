import React, { Component } from 'react'
import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import Text from './question/Text'
import Type from './question/Type'
import Options from './question/Options'
import Answer from './question/Answer'
import AlertMessage from '../../components/alert/AlertMessage'
import withAlert from '../../hoc/withAlert'

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
        if (this.state.text === '' || this.state.type === "" || !this.state.options.lengthg || !this.state.answer.length) {
            alert('Please Enter All Fields Properly...')
            return false
        }
        if(this.state.options.some(elem => elem==='')){
            alert(`Options Can't be blank...`)
            return false
        }
        this.setState({ step: 'submit' })


    }

    render() {
        let body
        switch (this.state.step) {
            case 1: body = <Text   
                updateField={this.updateField}
                state={this.state} />
                break
            case 2: body = <Type
                updateField={this.updateField}                
                state={this.state}/>
                break
            case 3: body = <Options
                updateField={this.updateField}                
                state={this.state} />
                break
            case 4: body = <Answer            
                updateField={this.updateField}
                state={this.state}/>
                break
           // Why this?
            case 'submit': body = <div className="alert mt-4 alert-success">
                <h4>  <svg height="2em" viewBox="0 0 16 16" className="text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    <path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z" />
                </svg> &nbsp; Question Submitted</h4>
            </div>
                break
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
                <AlertMessage alert={this.state.alertObj} reSetAlert={this.props.setAlert} />

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