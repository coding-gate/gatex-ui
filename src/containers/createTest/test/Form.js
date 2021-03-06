import React from 'react'
import Select from 'react-select'

import * as Settings from '../../../utils/SiteSettings'

function Form(props) {

    const errorMessages={title:'Please Enter a Title.',
           language:'Please Select a Language'
        };

    return (
        <div className='col-12 col-md-9 my-4  p-3 mt-5 mx-auto '>
            <div className="">

            <div className="d-flex flex-column mx-auto col-12 col-md-9 col-lg-6 mb-4">
                <span className='h5'>Title of the test : &nbsp;&nbsp;</span>
                <input 
                    value={props.state.fields.title ? props.state.fields.title : '' } 
                    onChange={e => props.updateState('title',e.target.value)} 
                    type="text" 
                    placeholder='Title'
                    className="form-control"/>
            </div>
            <div className="d-flex flex-column mx-auto col-12 col-md-9 col-lg-6">
                <span className='h5'>Language : &nbsp;</span>
                <div className=''>
                <Select 
                    placeholder='Language'
                    value={props.state.fields.language}
                    onChange={(val) => props.updateState('language',val)}
                    options={Settings.langOptions}/>
                    </div>
                
                </div>
            </div>

            <div className="row col-12 mt-3">
                <button onClick={() => props.handleNext(errorMessages,2)} className="btn btn-primary d-block ml-auto">Next</button>
            </div>
        </div>
    )
}

export default Form