import React from 'react'
import { XSquare } from 'react-bootstrap-icons'
import classes from './modal.module.css'

export default function DisplayModal(props) {
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
            <div onClick={hideModal} className={props.modalIsOpen ? classes.backdrop : classes.backdrop + " " + classes.backdropHidden}>
                <div onClick={e => e.stopPropagation()} className={props.modalIsOpen ? classes.modalBody + ' ' + classes.modalOpen : classes.modalBody}>

                    <div className='bg-light font-weight-bold p-2 w-100 d-flex justify-content-between'>{props.title}
                        <XSquare className={classes.closeBtn} onClick={props.hideModal} />
                    </div>
                    <div className='bg-white'>{props.children}</div>
                    <div className="p-3 bg-light"><button onClick={props.hideModal} className="btn d-block ml-auto btn-primary">Close</button></div>
                </div>
            </div>
        </div>
    )
}
