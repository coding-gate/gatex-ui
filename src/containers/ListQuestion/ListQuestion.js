import React from 'react'
import { Link } from 'react-router-dom';
import DisplayModal from '../../components/Modal/DisplayModal';
import DecisionModal from '../../components/Modal/DecisionModal';
import withPagination from '../../hoc/withPagination';
import ViewQuestion from '../ViewQuestion/ViewQuestion';
import classes from './QuestionList.module.css'

function ListQuestion(props) {
    const { questions,
            selectedQuestions, 
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
                .map((ques,i) => deletingIndex ===i ? 
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
                                        Q-{i+1} : &nbsp;
                                    </b>
                                </span>
                                <span className={classes.textBlock} dangerouslySetInnerHTML={{__html : ques.text}}></span>
                            </label>
                            <p className={classes.dots +' ml-auto mr-4'}>
                                <b style={{fontSize:'1.2rem'}} >...</b>
                            </p>

                            <div className={classes.optionWindow} >
                                <p 
                                    className='dropdown-item' 
                                    data-toggle="modal" 
                                    data-target={'#display'+ques.id}>
                                    View
                                </p>
                                {fromQuestionList ? 
                                <>
                                    <p  className='dropdown-item' 
                                        data-toggle="modal" 
                                        data-target={`#decision${ques.id}`}>
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
                            <DecisionModal confirmActionHandler={() => {deleteQuestion(ques.id,i)}} id={ques.id}>
                                    <p className='font-weight-bold'>Are You Sure You Want To Delete The Question ?</p> 
                                    <p className='border p-3'>{ques.text}</p>
                            </DecisionModal>
                        : 
                        null}

                        <DisplayModal id={ques.id}>
                            <ViewQuestion state={ques} />
                        </DisplayModal>
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