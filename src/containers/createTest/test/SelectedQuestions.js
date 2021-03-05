import classes from '../../listMCQ/questions.module.css'
import { Trash, Eye } from 'react-bootstrap-icons'
import React from 'react'

export default function SelectedQuestions(props) {

    const errorMessages={selectedQuestions:'Please Select At Least One Question'};

    const back = () => {
        props.setAlert(null)
        props.updateState('step',2)
    }

    const deleteSelectedQuestion = (questionId) => {
        let selectedQuestions = [...props.state.fields.selectedQuestions]
        selectedQuestions = selectedQuestions.filter(ques => ques.id !== questionId)
        props.updateState('selectedQuestions',selectedQuestions )
    }

    return (
        <div className='col-12 col-md-9 my-4 border p-5 mt-5 mx-auto '>
            <p className="lead text-center p-3">
                <span className='border-bottom pb-1'>
                    {props.state.fields.selectedQuestions.length>0 ? 'Selected Questions' : 'No Questions Selected'}
                </span>
            </p>
            {props.state.fields.selectedQuestions
                .map((ques, index) => 
                <div key={index} className='d-flex col-12 col-md-9 col-lg-8 mx-auto align-items-center rounded border p-2 mb-3'>
                    <p className='mb-0 d-flex col-10'>
                        <b className='text-nowrap'>{'Q-' + Number(index + 1)} :&nbsp; </b>
                        <span className={classes.textBlock} dangerouslySetInnerHTML={{__html:ques.text}}></span>
                    </p>
                    <div
                        onClick={() => props.showModal(ques)}
                        className="text-right text-primary col-1"> <Eye style={{ cursor: 'pointer', fontSize: '1.2rem' }} /> </div>
                    <div
                        
                        onClick={() => deleteSelectedQuestion(ques.id)}
                        className="text-right text-primary col-1"> <Trash style={{ cursor: 'pointer', fontSize: '1.2rem' }} /> </div>
                </div>)}
                <div className="d-flex align-items-end row">
                    <button onClick={back} className="btn d-block ml-auto mr-4 btn-outline-primary">Back</button>
                    <button onClick={() => props.handleNext(errorMessages, 4)} className="btn d-block btn-primary">Proceed</button>
                </div>
        </div>
    )
}