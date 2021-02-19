import React, { Component } from 'react'

import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import AlertMessage from '../../components/alert/AlertMessage'

import Text from './question/Text'
import Type from './question/Type'
import Options from './question/Options'
import Answer from './question/Answer'
import SubmitMCQ from './question/SubmitMCQ'

import withAlert from '../../hoc/withAlert'
import axios from '../../utils/AxiosWithToken'

import * as QueryString from "query-string"
import * as webUtil from '../../utils/WebUtil'


class AddQuestion extends Component {
    
    state = {
        step: 1,
        fields:{},
        tags: null,
        options:{
                mmcq:[["",false]],
                mcq:[["",false]],
                tf:[['True',false],['False',false]]
                },
        isLoading:false,
        isEditing:false
    }

    initializedState=()=>{
        this.setState({
            step: 1,
            text: '',
            tags: null,
            lang: null,
            time: null,
            complexity: null,
            type: null,
            options:{mmcq:[["",false]],mcq:[["",false]],tf:[['True',false],['False',false]]},
            isLoading:false
        })

    }

    componentDidMount(){
        const params = QueryString.parse(this.props.location.search) 
        this.setState({isEditing:!!params.questionId})
        if(!!params.questionId){
            this.setState({isLoading:true},() => {
                axios.get(webUtil.getApiUrl+'/mcqQuestions/'+params.questionId)
                    .then(res => res.data)
                    .then(data => this.setState({complexity:data.complexity, 
                                                 type:data.type,
                                                 text:data.text,
                                                 lang:data.lang,
                                                 tags:data.tags,
                                                 time:data.time,
                                                 options:{...this.state.options,[data.type]:data.options},
                                                 isLoading:false}))
                    .catch(error => {
                        webUtil.handleError(error, this.props);
                    }) 
            })
        }
    }

    
    updateField = (field, value)=>{
        if(field==='step'||field==='options'){
            this.setState({[field]:value})
        }
        else{
            let fields = this.state.fields
            fields[field] = value
            this.setState({fields });
        }

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
            case 1: body = <Text   
                handleNext={this.handleNext}
                updateField={this.updateField}
                setAlert={this.props.setAlert}
                state={this.state} />
                break
            case 2: body = <Type
                handleNext={this.handleNext}
                updateField={this.updateField}
                setAlert={this.props.setAlert}            
                state={this.state}/>
                break
            case 3: body = <Options
                handleNext={this.handleNext}
                updateField={this.updateField}
                setAlert={this.props.setAlert}            
                state={this.state} />
                break
            case 4: body = <Answer
                handleNext={this.handleNext}            
                updateField={this.updateField}
                setAlert={this.props.setAlert}
                state={this.state}/>
                break
            case 5: body = <SubmitMCQ 
                handleNext={this.handleNext}
                setAlert={this.props.setAlert}
                initializedState={this.initializedState}
                updateField={this.updateField}
                state={this.state}/>
                break
            default: body = "Body"
        }

        if(this.state.isLoading) {
            body=  <div style={{width:'5rem',height:'5rem'}} 
                        className="spinner-border mx-auto d-block mt-5">
                    </div>
        }
        return (
            <div>
                <div className="row">

                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '/mcqList', level: 'MCQ List' },
                        { url: '#', level: this.state.isRedirected? 'Edit Question' : 'Add Question' }
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