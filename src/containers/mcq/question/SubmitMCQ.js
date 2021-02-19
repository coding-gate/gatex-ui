import React from 'react'
import ViewQuestion from '../../ViewQuestion/ViewQuestion'
import axios from '../../../utils/AxiosWithToken'

import * as QueryString from "query-string"
import * as webUtil from '../../../utils/WebUtil'


export default function SubmitMCQ(props) {

    const submitHandler = () => {
        let question = {
            text:props.state.text,
            type:props.state.type,
            tags:props.state.tags,
            time:props.state.time,
            lang:props.state.lang,
            complexity:props.state.complexity,
            options:props.state.options[props.state.type],
        }

        if(props.state.isEditing){
            const params = QueryString.parse(props.location.search)
            question.id = params.questionId
        }

        console.log(question);

        props.updateField('isLoading',true)
        axios.post(webUtil.getApiUrl+'/mcqQuestions',question)
            .then(() => props.setAlert({type:'success',message:'Succesfully Saved'}))
            .then(() => {
                props.initializedState();
            })
            .catch(() => {
                props.setAlert({type:'danger',message:'Something Went Wrong, Try Again...'})
                props.updateField('isLoading',false)
            })
    }

    const cancel = () => {
        props.state.isEditing ? props.history.push('/mcqList') : props.initializedState()
    }
    
    return (
        <div>
            <ViewQuestion {...props} />
            <div className='float-right mr-3 mt-3'>

                <button 
                    className='btn btn-sm btn-outline-primary mx-3'
                    onClick={cancel}
                >{props.state.isEditing ? 'Cancel Update' : 'Cancel'}
                </button>
                <button 
                    className='btn btn-sm btn-primary'
                    onClick={submitHandler}
                >{props.state.isEditing ? 'Update' : 'Submit'}
                </button>
            </div>
        </div>
    )
}
