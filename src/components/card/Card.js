import React from 'react'

export default function Card(props) {
    return (
        <div style={{ width: '200px', height: '150px' }} className="card bg-light">
            <div className='mt-3 mx-auto'>
                <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-question-diamond" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    {props.path}
                </svg>
            </div>
            <div className="card-body text-center">{props.title}</div>
        </div>
    )
}
