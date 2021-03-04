import React from 'react'
import ViewQuestion from '../../viewQuestion/ViewQuestion'
import axios from '../../../utils/AxiosWithToken'

import * as webUtil from '../../../utils/WebUtil'


export default function SubmitMCQ(props) {

    const submitHandler = () => {

        let question = {...props.state.fields}
        question.options = question.options[question.type]

        if(props.state.isEditing){
            question.id = props.state.id
        }


        props.updateField('isLoading',true)
        axios.post(webUtil.getApiUrl()+'/mcqQuestions',question)
            .then(() => {props.initializedState(); props.setAlert({type:'success',message:'Succesfully Saved'})})
            
            .catch((err) => {
                props.setAlert({type:'danger',message:'Something Went Wrong, Try Again...'})
                props.updateField('isLoading',false)
                webUtil.handleError(err, props.parentProps)
            })
    }

    const cancel = () => {
        props.state.isEditing ? props.parentProps.history.push('/mcqList') : props.initializedState()
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
