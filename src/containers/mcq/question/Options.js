import React from 'react'


function Options(props) {

    function addOption() {
        let options = {...props.state.options, [props.state.type]:[...props.state.options[props.state.type],["",false]]}
        props.updateField('options', options)
    }

    function removeOption(index) {
        let options = {...props.state.options}
        options[props.state.type].splice(index, 1)
        props.updateField('options', options)
    }

    function updateOptionValue(index, value) {
        let options = {...props.state.options}
        options[props.state.type][index][0] = value;
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



    let options = [...props.state.options[props.state.type]]

    let optionLists = options.map((option, index) =>
        <div className="input-group mb-3" key={index + 1}>
            <div className="input-group-prepend">
                <div className="input-group-text">{String.fromCharCode(index + 65)}</div>
            </div>
            <input
                disabled={props.state.type === 'tf'}
                onChange={(e) => updateOptionValue(index, e.target.value)}
                value={option[0]}
                autoFocus
                className='form-control' type="text" />
            
            <button
                onClick={() => removeOption(index)}
                className={props.state.type === 'tf' ? 'd-none' : 'btn'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='text-danger' fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
        </div>)


    return (
        <div className='my-3'>
            <div className="row">
                <h4 className="col text-center lead" dangerouslySetInnerHTML={{__html:props.state.text}} />
            </div>

            <div className="my-3 d-flex justify-content-between align-items-center">
                <h4>{props.state.type === 'tf' ? 'Please Proceed To The Next Page...' : 'Please Enter The Options:'}</h4>
                <button onClick={() => addOption()} className={props.state.type === 'tf' ? 'd-none' : 'btn btn-secondary d-block ml-auto'}>Add Options</button>
            </div>

            <div>
                <ul className='list-unstyled'>
                    {optionLists}
                </ul>
            </div>

            <div className="mt-3 float-right">
                <button className="btn btn-secondary mx-2"
                    onClick={() => {
                        props.setAlert(null)
                        props.updateField('step', 2)
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

export default Options