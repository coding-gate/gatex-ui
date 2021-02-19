import React from 'react'

function Answer(props) {

    function answerSelect(index) {
        let options = {...props.state.fields.options}
        if (props.state.fields.type === 'mmcq') {
            options[props.state.fields.type].forEach((option,i) => {
                if(i===index){
                    option[1] = !option[1]
                }
            })
        }
        else {
            options[props.state.fields.type].forEach((option,i) => {
                    option[1] = i===index
            })
        }
        props.updateField('options',options);
    }

    const proceed = () => {
        if (!props.state.fields.options[props.state.fields.type].some(option => option[1] === true)) {
            props.setAlert({ message: "Please Select At Least One Answer", type: 'warning' })
            return
        }
        props.setAlert(null)
        props.updateField("step", 5)
    }



    let options = [...props.state.fields.options[props.state.fields.type]]
    let body = options.map((option, index) => <div key={index} className="input-group mb-3">
        <div className="input-group-prepend">
            <div className="input-group-text">
                <input
                    type={props.state.fields.type === 'mmcq' ? 'checkbox' : 'radio'}
                    name="answer"
                    value={option[0]}
                    id={index}
                    checked={option[1]}
                    onChange={() => answerSelect(index)}
                />
            </div>
        </div>
        <label style={{ cursor: 'pointer' }} className='form-control w-75' htmlFor={index}>{option}</label>
    </div>)
    return (
        <div>
            <div className="row">
            <h4 className="col text-center lead" dangerouslySetInnerHTML={{__html:props.state.text}} />

            </div>
            <h4 className='my-3 text-left'>Mark The Correct Answer(s):</h4>
            <div className='text-left list-unstyled' >
                {body}
            </div>

            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-outline-primary mx-2 mx-2"
                    onClick={() => {
                        props.setAlert(null)
                        props.updateField('step', 3)
                    }}>
                    Back
                </button>
                <button className="btn btn-sm btn-primary"
                    onClick={proceed}>
                    Next
                </button>
            </div>

        </div>
    )
}

export default Answer
