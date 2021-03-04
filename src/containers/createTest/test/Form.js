import React from 'react'
import Select from 'react-select'

import * as Settings from '../../../utils/SiteSettings'

function Form(props) {

    const proceed = () => {
        if(!props.state.fields.title){
            props.setAlert({type:'warning',message:'Please Enter A Title'})
            return
        }
        if(!props.state.fields.subject){
            props.setAlert({type:'warning',message:'Please Enter A Subject'})
            return
        }
        props.setAlert(null)
        props.updateState('step',2)
    }

    return (
        <div className='col-9 my-4 border p-5 mt-5 mx-auto '>
            <div className="row col-12 mb-4">
                <span className='h3'>Title of the test : &nbsp;&nbsp;</span>
                <input 
                    value={props.state.fields.title ? props.state.fields.title : '' } 
                    onChange={e => props.updateState('title',e.target.value)} 
                    type="text" 
                    placeholder='Title'
                    className="form-control col-10 col-lg-6"/>
            </div>
            <div className="row col-12">
                <span className='h3'>Subject : &nbsp;</span>
                <div className='col-12 col-md-6'>
                <Select 
                    placeholder='Subject'
                    value={props.state.fields.subject}
                    onChange={(val) => props.changeSubject(val)}
                    options={Settings.langOptions}/>
                    </div>
                
            </div>

            <div className="row col-12 mt-5">
                <button onClick={proceed} className="btn btn-info d-block ml-auto">Proceed</button>
            </div>
        </div>
    )
}

export default Form