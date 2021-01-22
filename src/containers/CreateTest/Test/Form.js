import React from 'react'

function Form(props) {

    const proceed = () => {
        if(!props.state.title){
            props.setAlert({type:'warning',message:'Please Enter A Title'})
            return
        }
        if(!props.state.date){
            props.setAlert({type:'warning',message:'Please Enter A Date'})
            return
        }
        if(!props.state.time){
            props.setAlert({type:'warning',message:'Please Enter A Time'})
            return
        }
        props.setAlert(null)
        props.updateState('step',2)
    }

    return (
        <div className='col-9 my-4 border p-5 mt-5 mx-auto '>
            <div className="row mb-4">
                <span className='h3'>Title of the test : &nbsp;&nbsp;</span>
                <input 
                    value={props.state.title} 
                    onChange={e => props.updateState('title',e.target.value)} 
                    type="text" 
                    className="form-control col-10 col-lg-6"/>
            </div>
            <div className="row">
                <span className='h3'>Scheduled Date and Time : &nbsp;</span>
                <input
                    type="date" 
                    value={props.state.date} 
                    onChange={e => props.updateState('date',e.target.value)}  
                    className='form-control  mb-2 col-lg-2 col-8 mr-4'/>
                <input 
                    type="time" 
                    value={props.state.time} 
                    onChange={e => props.updateState('time',e.target.value)}  
                    className='form-control  mb-2 col-lg-2 col-8'/>
            </div>

            <div className="row mt-5">
                <button onClick={proceed} className="btn btn-info d-block ml-auto">Proceed</button>
            </div>
        </div>
    )
}

export default Form
