import React from 'react'

export default function Type(props) {

  function updateTypeAndOption(type){

    let options=[...props.state.options]
    let prvType=props.state.type;

    if(type==='tf'){
        options = ['True', 'False']
    }else{
        if(prvType==='tf'){
            options = ['']
        }
    }
    props.updateField('type', type)
    props.updateField('options', options)

  }


    let types = ['mmcq','mcq','tf']
    let list = types.map(type => <div key={type} className='form-group form-check'>
                                    <input 
                                        onChange={(e) => updateTypeAndOption(e.target.value)} 
                                        className='form-check-input' 
                                        checked={props.state.type===type} 
                                        type="radio" 
                                        value={type} 
                                        name="questionType" 
                                        id={type} 
                                    />
                                    <label 
                                        className='form-check-label' 
                                        htmlFor={type}>
                                    {type==='tf'?'True/False':type==='mcq'?'MCQ':'MMCQ'}</label>
                                </div>)
    return (
        <div className='mt-3'>

            <div className="row">
                <div className="col">{props.state.text}</div>
            </div>

            <div className="row">
                <div className="col ">
                    <h5 >Select question type:</h5>
                    {list}
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-light btn-outline-primary mx-2"
                    onClick={() => { props.updateField('step', 1) }}>
                    Back
                </button>
                <button className="btn btn-light btn-outline-primary"
                    onClick={() => { props.updateField('step', 3) }}>
                    Next
                </button>
            </div>
        </div>
    )
}
