import React, {Component}  from 'react';
import Modal from '../components/modal/Modal'

const withModal = WrappedComponent  => {

    class WithModal extends Component {

        modalAction=null;

        state = { modal: { type: 'info', titleText: 'Info', bodyText: '', isVisible: false } }

        hideModel = (btn) => {   
            this.setState({ modal: {isVisible: false}});
            if(this.modalAction){
             this.modalAction(btn);
            }
        }

        openModel = (modalObj, action) => {
            this.modalAction=action;
            this.setState({ modal: {...modalObj, isVisible: true}});
           
        }

        render() {           
            return (
                <div>
                    <Modal modalProps={this.state.modal} clicked={this.hideModel} />
                    <WrappedComponent {...this.props} showModel={this.openModel} />
                </div>
            )
        }
    }
    return WithModal;
}

export default withModal;