import React from 'react'
import { Link } from 'react-router-dom';
import withPagination from '../../hoc/withPagination';
import ViewQuestion from '../ViewQuestion/ViewQuestion';
import classes from './QuestionList.module.css'

function ListQuestion(props) {
    const { questions,
            selectedQuestions, 
            startingIndex, 
            fromQuestionList,
            selectQuestion, 
            tableBody, 
            deleteQuestion, 
            deletingIndex, 
            initPagination} = props

    React.useEffect(() => {
        initPagination(questions)
    },[initPagination,questions])

    
    let list = tableBody
                .map((ques,i) => deletingIndex.includes(i) ? 
                    <div 
                        style={{width:'5rem',height:'5rem'}} 
                        className="spinner-border text-danger d-block my-4 mx-auto">
                    </div>
                    :
                    <div className={classes.question + ' w-100'} key={i}>
                        <div className={classes.questionText + ' d-flex align-items-center'}>
                            <label
                                style={{cursor: !fromQuestionList ? 'pointer': 'default'}}
                                htmlFor={i}
                                className="col-11 d-sm-flex p-2 pl-3">
                                <span className='text-nowrap'>
                                    {fromQuestionList ? 
                                    null : 
                                    <input 
                                        checked={selectedQuestions.map(ques => ques.id).includes(ques.id)}
                                        onChange={(e) => selectQuestion(e.target.checked, ques)}
                                        className='form-input-check mr-2' 
                                        type="checkbox" 
                                        id={i}/> 
                                    }
                                    <b>
                                        Q-{startingIndex+ i+1} : &nbsp;
                                    </b>
                                </span>
                                <span className={classes.textBlock} dangerouslySetInnerHTML={{__html : ques.text}}></span>
                            </label>
                            <p className={classes.dots +' ml-auto mr-4'}>
                                <b style={{fontSize:'1.2rem'}} >...</b>
                            </p>

                            <div className={classes.optionWindow} >
                                <p className='dropdown-item' data-toggle="collapse" 
                                    data-target={`#question${i}`}>
                                    View
                                </p>
                                {fromQuestionList ? 
                                <>
                                    <p  className='dropdown-item' 
                                        data-toggle="collapse" 
                                        data-target={`#delete${i}`}>
                                        Delete
                                    </p>
                                    <Link 
                                        className='text-dark dropdown-item'
                                        to={'/addMcq?questionId='+ques.id} >
                                            Edit
                                    </Link>
                                </>:
                                <label 
                                    className='dropdown-item' 
                                    style={{cursor:'pointer'}} 
                                    htmlFor={i}>
                                        {!selectedQuestions.map(ques => ques.id).includes(ques.id) ? 'Select' : 'Remove'}
                                </label>}                                
                            </div>
                            
                        </div>                      

                         
                    <>
                        {fromQuestionList ?
                            <div id={`delete${i}`}  className='collapse'>
                                <div className='col-9 col-md-6 mb-3 mx-auto border border-danger p-3'>
                                <p className='text-center'>Are You Sure You Want To Delete The Question ??</p> 
                                <div className='d-flex justify-content-center'>
                                    <button data-toggle="collapse" 
                                            data-target={`#delete${i}`} 
                                            className='btn btn-warning mr-4'>Cancel</button>

                                    <button 
                                            onClick={() => {deleteQuestion(ques.id,i)}} 
                                            className='btn btn-outline-danger ml-4'>Confirm</button>
                                </div>
                                </div>
                            </div>
                        : 
                        null}

                        <div className='collapse border border-info w-100 mb-3' id={`question${i}`}>
                            <span 
                                className='float-right mr-3'
                                data-toggle="collapse" 
                                data-target={`#question${i}`} 
                                style={{cursor:'pointer',fontSize:'2.5rem',  color:'red'}}>&times;</span>
                            <ViewQuestion state={ques} />
                        </div>
                    </>
                    </div>
                    )


    return (
        <div className='w-100'>          
            {list}
        </div>
    )
}

export default withPagination(ListQuestion)