import React from 'react'
import ViewQuestion from '../ViewQuestion/ViewQuestion'

export default function SubmitMCQ(props) {
    
    return (
        <div>
            <ViewQuestion {...props} />
            <div className='float-right mr-3 mt-3'>

                <button 
                    className='btn btn-sm btn-outline-primary mx-3'
                    onClick={props.cancel}
                >{props.state.isRedirected ? 'Cancel Update' : 'Cancel'}
                </button>
                <button 
                    className='btn btn-sm btn-primary'
                    onClick={props.submit}
                >{props.state.isRedirected ? 'Update' : 'Submit'}
                </button>
            </div>
        </div>
    )
}
