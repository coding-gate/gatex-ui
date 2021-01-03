import React from 'react'




export default function Options(props) {

    function addOption () {
        let options = [...props.state.options, ""]
        props.updateField('options', options)
    }

    function removeOption(index) {
        let options = [...props.state.options]
        options.splice(index, 1)
        props.updateField('options', options)
    }  
  
    function updateOptionValue (index, value) {
        let options = [...props.state.options]
        options[index] = value;
        props.updateField('options', options)
    } 




   let options = [...props.state.options]

    let optionLists = options.map((option, index) =>
        <div className="input-group mb-2" key={index + 1}>
            <div className="input-group-prepend">
                <span className="input-group-text">{index + 1}:</span>
            </div>
            <input
                disabled={props.type === 'tf'}
                onChange={(e) => updateOptionValue(index, e.target.value)}
                value={option}
                className='form-control' type="text" />
            <button
                onClick={()=>removeOption(index)}
                className={props.type === 'tf' ? 'd-none' : 'btn'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='text-danger' fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
        </div>)
            

    return (
        <div className='my-3'>
            <h4 className='lead'>{props.state.text}</h4>
            <div className="d-flex justify-content-between">

            <h4>{props.type==='tf'?'Please Proceed To The Next Page...':'Please Enter The Options:'}</h4>
            <button onClick={()=>addOption()} className={props.type === 'tf' ? 'd-none' : 'btn btn-secondary my-3 d-block ml-auto'}>Add Options</button>
            </div>
            <div>
                <ul className='list-unstyled'>
                    {optionLists}
                </ul>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-light btn-outline-primary mx-2"
                    onClick={() => { props.updateField('step', 2) }}>
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
