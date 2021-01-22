import React from 'react'

export default function ReviewTest(props) {

    const [customTime, setCustomTime] = React.useState('')

    const customTimeRef = React.createRef()

    const defaultTime = props.state.selectedQuestions
                            .map(ques=> Number(ques.time.value))
                            .reduce((total,currentTime) =>currentTime+total,0 );
    
    let {updateState} = props

    React.useEffect(()=>{
        updateState('timeLimit', defaultTime)
    },[defaultTime, updateState])

    const submit = () => {
        console.log(props.state.timeLimit);
    }
    

    return (
        <div className='border col-9 mx-auto p-5'>
            <h4 className='lead'>Test Title: {props.state.title}</h4>
            <h3 className='lead my-4'>Total Questions Selected : {props.state.selectedQuestions.length}</h3>
             
            <div className='d-flex flex-column flex-lg-row '>
                <p className='mr-3 lead'>Examination Time : </p>
                <ul className='list-unstyled mb-0 d-flex flex-column flex-lg-row justify-content-around'>
                    <li className='mr-4'> 
                        <input 
                            onChange={() => updateState('timeLimit',defaultTime)}
                            type="radio" 
                            value={defaultTime}
                            name='time' 
                            className='mr-2' 
                            id="defaultTime"/>
                        <label htmlFor="defaultTime"> {defaultTime} Mins. (default)</label> 
                    </li>
                    <li> 
                        <input 
                            onChange={() => updateState('timeLimit',customTime)}
                            type="radio" 
                            name='time' 
                            value={customTime}
                            ref={customTimeRef}
                            className='mr-2' 
                            id="customTime"/> 
                        <label htmlFor="customTime">
                            <input 
                                onChange={(e) => setCustomTime(e.target.value)}
                                style={{outline:'none', border:'none',width:'9rem'}} 
                                placeholder='Enter Your Time' 
                                className='border-bottom border-info pl-2 pb-1' 
                                type="number"/> Mins. (custom) 
                        </label>
                    </li>
                </ul>
            </div>

            <div className="row d-flex align-items-end">
                <button 
                    onClick={() => updateState('step',2)} 
                    className="btn ml-auto mr-4 d-block btn-secondary">
                    Back
                </button>
                <button 
                    onClick={submit} 
                    className="btn d-block btn-success">
                    Submit
                </button>
            </div>

        </div>
    )
}
