import React from 'react';
import { ExclamationDiamond } from 'react-bootstrap-icons';
import Breadcrumb from '../breadcrumb/Breadcrumb'

const ErrorPage = () => {
    return (
        <div>
            <div className="row">
                <Breadcrumb elements={[
                    { url: '/', level: 'Home' },
                    { url: '#', level: 'Error' }
                ]} />
            </div>
            <div className="row">
                <div className="col-6 offset-3">
                    <div className={"alert text-center alert-danger"}>
                        <h4 className='mb-0'>  <ExclamationDiamond style={{fontSize:'1.5em'}} /> &nbsp; Error Encountered !</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;