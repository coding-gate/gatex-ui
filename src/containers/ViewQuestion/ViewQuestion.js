import React from 'react'

export default function ViewQuestion(props) {
    console.log(props.state);
    let options = props.state.options.map((option, index) => <div key={index} className="input-group mb-3">
        <div className="input-group-prepend">
            <div className="input-group-text">
                {String.fromCharCode(index+65)}
            </div>
        </div>
        <div className='form-control w-75' htmlFor={index}>{option}</div>
    </div>)
    let answers ="[ "+ props.state.answer + " ]"
    return (
        <div className='border p-3'>
            <h4 className='lead'><span className='font-weight-bold'>Question: &nbsp;</span>{props.state.text}</h4>
            <br/>
            <h4 className='font-weight-bold lead'>Options: </h4>
            <div className="mt-3 pl-3">
            {options}
            </div>
            <div className='d-flex mt-4 justify-content-between'>
                <h4 className='lead'><span className='font-weight-bold'>Answer(s): &nbsp;</span>{answers}</h4>
                <h4 className='lead'><span className='font-weight-bold'>Time: &nbsp;</span>{props.state.time.value} min(s)</h4>
            </div>

        </div>
    )
}
