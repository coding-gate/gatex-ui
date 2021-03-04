import React from 'react'
import { CheckCircle } from 'react-bootstrap-icons'

export default function ViewQuestion(props) {
    let source = props.state.fields ? props.state.fields : props.state
    let options = Array.isArray(source.options) ? source.options : source.options[source.type]
    let optionList = options.map((option, index) => <div key={index} 
            className={option[1] ? "input-group border rounded border-success mb-3" : "input-group mb-3"} >
        <div className="input-group-prepend">
            <div className="input-group-text">
                {String.fromCharCode(index+65)}
            </div>
        </div>
        <div className='form-control  w-75'>
            {option[0]} 
            {option[1] ? <span className='text-success float-right'>
            <CheckCircle style={{fontSize:'1.2rem'}} />
            </span> : null} 
        </div>
    </div>)
    return (
        <div className='border p-3'>

            <div className="row px-3">
                <span className='lead font-weight-bold h4'>Question: &nbsp;</span>
                <h4 className='lead' dangerouslySetInnerHTML={{__html: source.text}}></h4>
            </div>

            <div className="row px-3">
                <h4 className='font-weight-bold lead'>Options: </h4>
                <div className="mt-3 w-100 pl-3">
                {optionList}
                </div>
            </div>

            <div className='row px-3 d-flex mt-4 justify-content-between'>
                <h4 className='lead'><span className='font-weight-bold'>Complexity: &nbsp;</span>{source.complexity.value}</h4>
                <h4 className='lead'><span className='font-weight-bold'>Time: &nbsp;</span>{source.time.value} min(s)</h4>
            </div>
        </div>
    )
}
