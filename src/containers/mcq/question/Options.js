import React from 'react'
import { XCircle } from 'react-bootstrap-icons'


function Options(props) {

    function addOption() {
        let options = {...props.state.options, [props.state.fields.type]:[...props.state.options[props.state.fields.type],["",false]]}
        console.log(options);
        props.updateField('options', options)
    }

    function removeOption(index) {
        let options = {...props.state.options}
        options[props.state.type].splice(index, 1)
        props.updateField('options', options)
    }

    function updateOptionValue(index, value) {
        let options = {...props.state.options}
        options[props.state.fields.type][index][0] = value;
        props.updateField('options', options)
    }

    const submit = () => {
        if (props.state.type !== 'tf') {
            if (props.state.options[props.state.type].length < 3) {
                props.setAlert({ message: 'Please Enter At Least 3 Options', type: 'warning' })
                return
            }
            if (props.state.options[props.state.type].some(option => option[0].trim() === '')) {
                props.setAlert({ message: "Options Can't be Blank", type: 'warning' })
                return
            }
            if (!props.state.options[props.state.type].map(option => option[0]).every((elem, index, array) => array.indexOf(elem) === index)) {
                props.setAlert({ message: "Options Shouldn't Be Repeated", type: 'warning' })
                return
            }
        }
        props.setAlert(null)
        props.updateField("step", 4)
    }



    let options = [...props.state.options[props.state.fields['type']]]

    let optionLists = options.map((option, index) =>
        <div className="input-group mb-3" key={index + 1}>
            <div className="input-group-prepend">
                <div className="input-group-text">{String.fromCharCode(index + 65)}</div>
            </div>
            <input
                disabled={props.state.fields.type === 'tf'}
                onChange={(e) => updateOptionValue(index, e.target.value)}
                value={option[0]}
                autoFocus
                className='form-control' type="text" />
            
            <button
                onClick={() => removeOption(index)}
                className={props.state.fields.type === 'tf' ? 'd-none' : 'btn'}>
                <XCircle />
            </button>
        </div>)


    return (
        <div className='my-3'>
            <div className="row">
                <h4 className="col text-center lead" dangerouslySetInnerHTML={{__html:props.state.text}} />
            </div>

            <div className="my-3 d-flex justify-content-between align-items-center">
                <h4>{props.state.type === 'tf' ? 'Please Proceed To The Next Page...' : 'Please Enter The Options:'}</h4>
                <button 
                    onClick={() => addOption()} 
                    className={props.state.type === 'tf' ? 'd-none' : 'btn btn-sm btn-primary d-block ml-auto'}>
                        Add Options</button>
            </div>

            <div>
                <ul className='list-unstyled'>
                    {optionLists}
                </ul>
            </div>

            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-outline-primary mx-2"
                    onClick={() => {
                        props.setAlert(null)
                        props.updateField('step', 2)
                    }}>
                    Back
                </button>
                <button className="btn btn-sm btn-primary"
                    onClick={submit}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Options