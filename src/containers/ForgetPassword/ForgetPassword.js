import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ForgetPassword extends Component {
    
    constructor(props) {
        super(props)
        for(let i=0;i<6;i++){
            this[`ref${i}`] = React.createRef()
        }
    }
    
    state={
        code:[],
        sent:false
    }
    

    setCodeAndChangeFocus = (val,i) => {
        if(val.length>1){
            return false
        }
        let code = [...this.state.code]
        code[i]= val.match(/[a-zA-Z0-9]/) ? val : ""
        this.setState({code})
        if(i<5&&val!==""){
            this[`ref${i+1}`].current.focus()
        }
    }

    submit = () => {
        let code = ""
        this.state.code.forEach(letter => {
            code+=letter[0]
        })
        
        this.setState({code:[]})
        console.log(code);
    }

    render() {
        let input = []
        for(let i=0;i<6;i++){
            input=[...input, <input 
                                key={i} 
                                style={{height:'48px',width:'48px'}} 
                                className='text-center mr-2 form-control d-inline' 
                                type='text'
                                ref={this[`ref${i}`]}
                                onChange={(e)=> this.setCodeAndChangeFocus(e.target.value,i)}
                                value={this.state.code[i]||""}
                            >
                            </input> ]
        }
        return (
            <div>
                {!this.state.sent?
                <div className="text-center mt-5">
                    <h3 className="lead">An OTP will be sent to your registered Email.</h3>
                    <button onClick={()=>this.setState({sent:true})} className="btn mt-4 btn-dark">Send OTP</button>
                </div>:

                <div className='text-center mt-5'>
                    <h3 className='text-center lead mb-4'>Enter The OTP You Received in Your Mail</h3>
                    {input}
                    <br/>
                    
                    <button onClick={this.submit} className='btn mt-3 btn-success'>Submit</button>
                    <p className='mt-3'>Didn't Get The Email ?? <span><Link> Resend OTP</Link></span></p>
                    
                </div>}
            </div>
        )
    }
}

export default ForgetPassword