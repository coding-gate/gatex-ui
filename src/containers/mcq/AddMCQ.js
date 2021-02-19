import React, { Component } from 'react'

import StepProgress from '../../components/stepProgress/stepProgress'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import AlertMessage from '../../components/alert/AlertMessage'

import Text from './question/Text'
import Type from './question/Type'
import Options from './question/Options'
import Answer from './question/Answer'
import SubmitMCQ from './SubmitMCQ'

import withAlert from '../../hoc/withAlert'
import axios from 'axios'

import * as QueryString from "query-string"
import * as webUtil from '../../utils/WebUtil'


class AddQuestion extends Component {
    
    state = {
        step: 1,
        text: '',
        tags: null,
        lang: null,
        time: null,
        complexity: null,
        type: null,
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
        //console.log('Mounted');
    }

    
    updateField = (field, value)=>{
        //console.log("updateField", field, value)
        this.setState({[field]: value });

    }
   
    submitHandler = () => {
        let question = {
            text:this.state.text,
            type:this.state.type,
            tags:this.state.tags,
            time:this.state.time,
            lang:this.state.lang,
            complexity:this.state.complexity,
            options:this.state.options[this.state.type],
        }

        if(this.state.isEditing){
            const params = QueryString.parse(this.props.location.search)
            question.id = params.questionId
        }

        console.log(question);

        this.setState({isLoading:true},() => {
            axios.post(webUtil.URL+'/gatexapi/mcqQuestions',question)
                .then(() => this.props.setAlert({type:'success',message:'Succesfully Saved'}))
                .then(() => {
                    this.initializedState();
                })
                .catch(() => {
                    this.props.setAlert({type:'danger',message:'Something Went Wrong, Try Again...'}
                )})
                //.then(()=>this.props.history.push('/mcqList'))
            })
    }


    /*
    updateHandler = () => {
        let question = {
            text:this.state.text,
            type:this.state.type,
            tags:this.state.tags,
            time:this.state.time,
            lang:this.state.lang,
            complexity:this.state.complexity,
            options:this.state.options[this.state.type],
        }
        this.setState({isLoading:true},() => {
            axios.put('https://gatex-exam-default-rtdb.firebaseio.com/question/'+ QueryString.parse(this.props.location.search).questionId+'.json',question)
                .then(() => this.props.setAlert({type:'success',message:'Question Successfully Updated'}))
                .then(() => this.props.history.push('/addMcq'))
                .catch(() => {
                    this.props.setAlert({type:'danger',message:'Something Went Wrong, Try Again...'}
                )})
                //.then(()=>this.props.history.push('/mcqList'))
            })
    }

    */
    
    cancel = () => {
        this.state.isEditing ? this.props.history.push('/mcqList') : this.initializedState()
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
                                update={this.updateHandler}
                                state={this.state}/>
                            break
           // Why this?
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