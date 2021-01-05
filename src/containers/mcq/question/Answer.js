import React from 'react'
import AlertMessage from '../../../components/alert/AlertMessage';
import withAlert from '../../../hoc/withAlert';

function Answer(props) {
    const [alertObj, setAlertObj] = React.useState(null)

    function answerSelect(target, type) {
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

    const submit = () => {

        if (props.state.answer.length === 0) {
            setAlertObj({ message: 'Please Choose the Answer(s)', type: 'warning' })
            return
        }
        props.updateField("alertObj", null)

        props.updateField("step", 5)
    }



    let options = [...props.state.options]
    let body = options.map((option, index) => <div key={index} className="input-group mb-3">
        <div className="input-group-prepend">
            <div className="input-group-text">
                <input
                    type={props.state.type === 'mmcq' ? 'checkbox' : 'radio'}
                    name="answer"
                    value={option}
                    id={index}
                    onChange={(e) => answerSelect(e.target, props.state.type)}
                />
            </div>
        </div>
        <label style={{ cursor: 'pointer' }} className='form-control w-75' htmlFor={index}>{option}</label>
    </div>)
    return (
        <div>
            <AlertMessage alert={alertObj} reSetAlert={props.setAlert} />

            <h3 className='my-3 text-center lead'>{props.state.text}</h3>
            <h4 className='my-3 text-left'>Mark The Correct Answer(s):</h4>
            <div className='text-left list-unstyled' >
                {body}
            </div>

            <div className="mt-3 float-right">
                <button className="btn btn-secondary mx-2"
                    onClick={() => {
                        props.updateField("alertObj", null)
                        props.updateField('step', 3)
                    }}>
                    Back
                </button>
                <button className="btn btn-info"
                    onClick={submit}>
                    Proceed
                </button>
            </div>

        </div>
    )
}

export default withAlert(Answer)
