import React, {Component}  from 'react';

const withAlert = WrappedComponent  => {

    class WithAlert extends Component {

        state = {alert:null}

        setAlertMessage = (alertObj) =>{
            this.setState({alert:alertObj});
        }

        render() {           
            return (
                <div>
                    <WrappedComponent {...this.props} alert={this.state.alert} setAlert={this.setAlertMessage}/>
                </div>
            )
        }
    }
    return WithAlert;
}

export default withAlert;