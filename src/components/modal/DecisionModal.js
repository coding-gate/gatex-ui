import React from 'react'
import { XSquare } from 'react-bootstrap-icons'
import classes from './modal.module.css'

export default function DecisionModal(props) {
    const { hideModal } = props
    React.useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideModal()
            }
        })
    }, [hideModal])
    return (
        <div className={classes.modal}>
            <div className={props.modalIsOpen ? classes.backdrop : classes.backdrop + " " + classes.backdropHidden}>
                <div className={props.modalIsOpen ? classes.modalBody + ' ' + classes.modalOpen : classes.modalBody}>
                    <div className='bg-light font-weight-bold p-2 w-100 d-flex justify-content-between'>{props.title}
                        <XSquare className={classes.closeBtn} onClick={props.hideModal} />
                    </div>
                    <div className='bg-white'>
                    </div>
                    <div className='bg-light text-center p-3'>
                        {props.confirmationMessage}
                        <br/>
                        <br/>
                    <button onClick={props.hideModal} className="btn btn-outline-primary mr-3">Cancel</button>
                    <button onClick={() => {hideModal() ;props.confirmActionHandler(props.id)}} className="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
