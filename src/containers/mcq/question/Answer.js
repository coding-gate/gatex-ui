import React from 'react'

export default function Answer(props) {

    function answerSelect(target, type){
        let answer = [...props.state.answer]
        if (type === 'mmcq') {
            if (target.checked) {
                answer = [...answer, target.value]
            }
            else {
                const index = answer.indexOf(target.value);
                if (index > -1) {
                    answer.splice(index, 1);
                }
            }
        }
        else {
            answer = [target.value]
        }
        props.updateField('answer', answer);
    }


   
    let options = [...props.state.options]
    let body = options.map((option,index) => <div key={index} className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                        <input
                                                            type={props.state.type==='mmcq'? 'checkbox':'radio'} 
                                                            name="answer"
                                                            value={option} 
                                                            id={index}
                                                            onChange={(e) => answerSelect(e.target, props.state.type)}
                                                        />
                                                    </div>
                                                </div>
                                                <label style={{cursor:'pointer'}} className='form-control w-75' htmlFor={index}>{option}</label>
                                            </div> )
    return (
        <div>
            <h3 className='my-3 lead'>{props.state.text}</h3>
            <h5 className='text-left'>Mark The Correct Answer(s):</h5>
            <div className='text-left pl-5 list-unstyled form-check' >
                {body}
            </div>

            <div className="mt-3 float-right">
                <button className="btn btn-light btn-outline-primary mx-2"
                    onClick={() => { props.updateField('step', 3) }}>
                    Back
                </button>
                <button className="btn btn-light btn-outline-primary"
                    onClick={() => { props.updateField('step', 4) }}>
                    Next
                </button>
            </div>

        </div>
    )
}
