import React from 'react'

export default function DecisionModal(props) {
    return (
        <div className="modal fade" id={"decision"+props.id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirmation Window</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-left">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={props.confirmActionHandler}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
