import React from 'react'
import classes from './stepProgress.module.css'

export default function stepProgress(props) {
    
    let checked = <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
  </svg>
    let unchecked = <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
  </svg>
    let steps = []
    for(let i = 1;i<=props.steps;i++){
      steps = [...steps, <li className={props.step > i ? classes.done : props.step===i ? classes.active : null}>
        {props.step > i ? checked : unchecked}
      </li> ]
    }    

    return (
        <div>
            <ul className={classes.list}>
              {steps}
                {/* <li className={props.step > 1 ? classes.done : props.step===1 ? classes.active : null}>
                  {props.step > 1 ? checked : unchecked}
                </li>
                <li className={props.step > 2 ? classes.done : props.step===2 ? classes.active : null}>
                  {props.step > 2 ? checked : unchecked}
                </li>
                <li className={props.step > 3 ? classes.done : props.step===3 ? classes.active : null}>
                  {props.step > 3 ? checked : unchecked}
                </li>
                <li className={props.step > 4 ? classes.done : props.step===4 ? classes.active : null}>
                  {props.step > 4 ? checked : unchecked}
                </li> */}
            </ul>
        </div>
    )
}
