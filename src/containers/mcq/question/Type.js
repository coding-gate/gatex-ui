import React from 'react'
import AlertMessage from '../../../components/alert/AlertMessage';
import withAlert from '../../../hoc/withAlert';

function Type(props) {
    const [alertObj, setAlertObj] = React.useState(null)

    function updateTypeAndOption(type) {


        let options = [...props.state.options]
        let prvType = props.state.type;

        if (type === 'tf') {
            options = ['True', 'False']
        } else {
            if (prvType === 'tf') {
                options = ['']
            }
        }
        props.updateField('type', type)
        props.updateField('options', options)

    }

    const submit = () => {

        if (!props.state.type) {
            setAlertObj({ message: 'Please Choose a Type ', type: 'warning' })
            return
        }
        props.updateField("alertObj", null)

        props.updateField("step", 3)
    }


    let types = ['mmcq', 'mcq', 'tf']
    let list = types.map(type => <div key={type} className='form-group form-check'>
        <input
            onChange={(e) => updateTypeAndOption(e.target.value)}
            className='form-check-input'
            checked={props.state.type === type}
            type="radio"
            value={type}
            name="questionType"
            id={type}
        />
        <label
            className='form-check-label'
            htmlFor={type}>
            {type === 'tf' ? 'True/False' : type === 'mcq' ? 'MCQ' : 'MMCQ'}</label>
    </div>)
    return (
        <div className='my-3'>
            <AlertMessage alert={alertObj} reSetAlert={props.setAlert} />

            <div className="row">
                <h4 className="col text-center lead">{props.state.text}</h4>
            </div>

            <div className="row">
                <div className="col ">
                    <h4 className='my-3'>Select question type:</h4>
                    {list}
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-secondary mx-2"
                    onClick={() => {
                        props.updateField("alertObj", null)
                        props.updateField('step', 1)
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

export default withAlert(Type)