import React from 'react'

export default function SelectedQuestions(props) {

    const back = () => {
        props.setAlert(null)
        props.updateState('step',2)
    }

    const proceed = () => {
        if(!props.state.selectedQuestions.length>0){
            props.setAlert({type:'warning',message:'Please Enter Some Questions'})
            return
        }
        props.setAlert(null)
        props.updateState('step',4)
    }

    return (
        <div className='col-9 my-4 border p-5 mt-5 mx-auto '>
            <p className="lead text-center p-3">
                <span className='border-bottom pb-1'>
                    {props.state.selectedQuestions.length>0 ? 'Selected Questions' : 'No Questions Selected'}
                </span>
            </p>
            {props.state.selectedQuestions
                .map((ques, index) => 
                <div key={index} className='d-flex col-8 offset-2 align-items-center rounded border p-2 mb-3'>
                    <p className='mb-0 col-10'>
                        <b>{'Q-' + Number(index + 1)} :&nbsp; </b>
                        {ques.text}
                    </p>
                    <div
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => props.deleteSelectedQuestion(ques.id)}
                        className="text-right text-danger col-2"><b>&times;</b></div>
                </div>)}
                <div className="d-flex align-items-end row">
                    <button onClick={back} className="btn d-block ml-auto mr-4 btn-secondary">Back</button>
                    <button onClick={proceed} className="btn d-block btn-info">Proceed</button>
                </div>
        </div>
    )
}
