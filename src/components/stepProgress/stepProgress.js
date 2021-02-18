import React from 'react'
import { CheckCircle, ExclamationCircle } from 'react-bootstrap-icons'
import classes from './stepProgress.module.css'

export default function stepProgress(props) {
    
    let unchecked = <ExclamationCircle />
    let checked = <CheckCircle />
    let steps = []
    for(let i = 1;i<=props.steps;i++){
      steps = [...steps, 
        <li key={i}><div className={props.step > i ? classes.done : props.step===i ? classes.active : null}>
          {props.step > i ? checked : unchecked}
        </div>
        <div ><span style={{width:`${100/(props.steps-1)}%`}} className={props.step > i ? classes.done+" "+classes.lines : classes.lines}></span></div>
      </li> ]
    }    

    return (
        <div>
            <ul className={classes.list}>
              {steps}
            </ul>
        </div>
    )
}
