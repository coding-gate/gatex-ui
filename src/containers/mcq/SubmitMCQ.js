import React from 'react'
import ViewQuestion from '../ViewQuestion/ViewQuestion'

export default function SubmitMCQ(props) {
    
    return (
        <div>
            <ViewQuestion {...props} />
            <div className='float-right mr-3 mt-3'>

                <button 
                    className='btn mx-3 btn-danger'
                    onClick={props.cancel}
                >{props.state.isRedirected ? 'Cancel Update' : 'Cancel'}
                </button>
                <button 
                    className='btn btn-success'
                    onClick={props.submit}
                >{props.state.isRedirected ? 'Update' : 'Submit'}
                </button>
            </div>
        </div>
    )
}
