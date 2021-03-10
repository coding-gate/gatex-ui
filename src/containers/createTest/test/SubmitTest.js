import React from 'react'
import axiosWithToken from '../../../utils/AxiosWithToken';
import classes from '../../listMCQ/questions.module.css'

import * as webUtil from '../../../utils/WebUtil'

export default function SubmitTest(props) {

    const [useDefaultTime, setUseDefaultTime] = React.useState(true)
    const [selectedQuestions, setSelectedQuestions] = React.useState([])

    const {allQuestions, state} = props

    React.useEffect(() => {
        let selectedQuestions = allQuestions.filter(ques => state.fields.selectedQuestions.includes(ques.id))
        setSelectedQuestions(selectedQuestions)
    },[allQuestions, state.fields.selectedQuestions])

    const defaultTime = selectedQuestions
                            .map(ques=> Number(ques.time.value))
                            .reduce((total,currentTime) =>currentTime+total,0 );
    
    let {updateState} = props

    const submitTest = () => {
        props.updateState('isLoading', true)
        let test = {...props.state.fields}
        console.log(test);
        axiosWithToken.post(webUtil.getApiUrl()+'/mcqTest', test)
            .then(() => {props.setAlert({type:'success',message:'Succesfully Saved'});
                         props.initializeState()
                         props.updateState('isLoading', false)})
            .catch(err => {
                webUtil.handleError(err,props)
            })
    }

    React.useEffect(()=>{
        updateState('timeLimit', defaultTime)
    },[defaultTime, updateState]) 

    if(props.state.isLoading){
        return <div 
        style={{width:'5rem',height:'5rem'}} 
        className="spinner-border d-block mt-5 mx-auto">
    </div> 
    }

    return (
        <div className='col-12 col-md-8 mx-auto'>
            <h4 className='h4 font-weight-normal'>Test Title: <b>{props.state.fields.title}</b></h4>
            <h3 className='h4 font-weight-normal my-4'>Questions Selected :</h3>
                {selectedQuestions
                    .map((ques, index) => 
                    <div key={index} className='d-flex col-12 col-md-9 col-lg-8 align-items-center rounded border p-2 mb-3'>
                        <p className='mb-0 d-flex col-10'>
                            <b className='text-nowrap'>{'Q-' + Number(index + 1)} :&nbsp; </b>
                            <span className={classes.textBlock} dangerouslySetInnerHTML={{__html:ques.text}}></span>
                        </p>
                    </div> )}
             
            <div className='d-flex flex-column flex-xl-row '>
                <p className='mr-3 h4  font-weight-normal'>Examination Time : </p>
                <ul className='list-unstyled mb-0 d-flex flex-column flex-xl-row justify-content-around'>
                    <li className='mr-4  align-self-xl-center align-self-start'> 
                        <input
                            checked={useDefaultTime} 
                            onChange={() => updateState('timeLimit',defaultTime)}
                            type="radio" 
                            onClick={() => setUseDefaultTime(true)}
                            value={defaultTime}
                            name='time' 
                            className='mr-2' 
                            id="defaultTime"/>
                        <label className='mb-0' htmlFor="defaultTime"> {defaultTime} Mins. (default)</label> 
                    </li>
                    
                    <li className=' align-self-xl-center align-self-start'> 
                        <input 
                            onChange={(e) => updateState('timeLimit',Number(e.target.parentElement.lastChild.firstChild.value))}
                            onClick={() => setUseDefaultTime(false)}
                            type="radio" 
                            name='time' 
                            checked={!useDefaultTime}
                            className='mr-2' 
                            id="customTime"/> 
                        <label className='mb-0' htmlFor="customTime">
                            <input 
                                onChange={e => {setUseDefaultTime(false); updateState('timeLimit',Number(e.target.value))}}
                                onKeyDown={() => setUseDefaultTime(false)}
                                style={{outline:'none', border:'none',width:'9rem'}} 
                                placeholder='Enter Your Time'
                                min='0' 
                                className='border-bottom border-info pl-2 pb-1' 
                                type="number"/> Mins. (custom) 
                        </label>
                    </li>
                </ul>
            </div>

            <div className="row mt-3 mr-4 d-flex align-items-end">
                <button 
                    onClick={() => updateState('step',3)} 
                    className="btn ml-auto mr-4 d-block btn-outline-primary">
                    Back
                </button>
                <button 
                    onClick={submitTest} 
                    className="btn d-block btn-primary">
                    Submit
                </button>
            </div>

        </div>
    )
}