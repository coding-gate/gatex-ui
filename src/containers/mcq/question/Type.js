import React from 'react'

function Type(props) {

    const stepAhead = () => {
        if (!props.state.type) {
            props.setAlert({ message: 'Please Choose a Type ', type: 'warning' })
            return
        }
        props.setAlert(null)
        
        props.updateField("step", 3)
    }


    let types = ['mmcq', 'mcq', 'tf']
    let list = types.map((type, index) => <div key={index} className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <input
                                                            type="radio"
                                                            checked={props.state.type === type}
                                                            value={type}
                                                            id={index}
                                                            onChange={(e) => props.updateField("type", e.target.value)}
                                                            />
                                                    </div>
                                                </div>
                                                <label style={{ cursor: 'pointer' }} className='form-control' htmlFor={index}>
                                                    {type === 'tf' ? 'True/False' : type === 'mcq' ? 'MCQ' : 'MMCQ'}</label>
                                            </div>)
    
    return (
        <div className='my-3'>
            <div className="row">
                <h4 className="col text-center lead" dangerouslySetInnerHTML={{__html:props.state.text}} />
            </div>

            <div className="row">
                <div className="col ">
                    <h4 className='my-3'>Select question type:</h4>
                    {list}
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-outline-primary mx-2"
                    onClick={() => {
                        props.setAlert(null)
                        props.updateField('step', 1)
                    }}>
                    Back
                </button>
                <button className="btn btn-sm btn-primary"
                    onClick={stepAhead}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Type