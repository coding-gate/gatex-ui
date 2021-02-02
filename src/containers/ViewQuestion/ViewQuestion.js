import React from 'react'

export default function ViewQuestion(props) {
    let options = Array.isArray(props.state.options) ? props.state.options : props.state.options[props.state.type]
    let optionList = options.map((option, index) => <div key={index} 
            className={option[1] ? "input-group border rounded border-success mb-3" : "input-group mb-3"} >
        <div className="input-group-prepend">
            <div className="input-group-text">
                {String.fromCharCode(index+65)}
            </div>
        </div>
        <div className='form-control  w-75' htmlFor={index}>
            {option[0]} 
            {option[1] ? <span className='text-success float-right'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>
            </span> : null} 
        </div>
    </div>)
    //let answers ="[ "+ options.filter(option => option[1]).map(option => option[0]) + " ]"
    return (
        <div className='border p-3'>
            <h4 className='lead'><span className='font-weight-bold'>Question: &nbsp;</span>{props.state.text}</h4>
            <br/>
            <h4 className='font-weight-bold lead'>Options: </h4>
            <div className="mt-3 pl-3">
            {optionList}
            </div>
            <div className='d-flex mt-4 justify-content-between'>
                <h4 className='lead'><span className='font-weight-bold'>Complexity: &nbsp;</span>{props.state.complexity.value}</h4>
                <h4 className='lead'><span className='font-weight-bold'>Time: &nbsp;</span>{props.state.time.value} min(s)</h4>
            </div>

        </div>
    )
}
