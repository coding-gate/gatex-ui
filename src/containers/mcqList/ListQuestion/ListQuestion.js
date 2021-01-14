import React from 'react'
import { Link } from 'react-router-dom';
import withPagination from '../../../hoc/withPagination';
import ViewQuestion from '../../ViewQuestion/ViewQuestion';
import classes from '../mcqList.module.css'

function ListQuestion({questions, tableBody, deleteQuestion, deletingIndex, initPagination}) {

    React.useEffect(() => {
        initPagination(questions)
    },[initPagination,questions])

    
    let list = tableBody
                .map((ques,i) => i===deletingIndex ? 
                    <div 
                        style={{width:'5rem',height:'5rem'}} 
                        className="spinner-border text-danger d-block my-4 mx-auto">
                    </div>
                    :
                    <div className={classes.question + ' mb-3 w-100'} key={i}>
                        <div className=' d-flex align-items-center mb-3'>
                            <div
                                
                                className="col-lg-10 p-2 pl-3 col-8">
                                <span><b>Q-{i+1} : &nbsp;</b></span>
                                {ques.text}
                            </div>
                            <p className={classes.dots +' ml-auto mr-4'}>
                                <b >...
                                
                                </b>
                            </p>

                            <div className={classes.optionWindow +' float-right'} >
                            <p className='dropdown-item' data-toggle="collapse" 
                                data-target={`#question${i}`}>
                                View
                            </p>
                            <p className='dropdown-item' data-toggle="collapse" 
                                data-target={`#delete${i}`}>
                                Delete
                            </p>
                            <Link 
                                className='text-dark dropdown-item'
                                to={'/addMcq?questionId='+ques.id} >
                                    Edit
                            </Link>
                        </div>
                            
                            
                        </div>

                        

                        <div id={`delete${i}`}  className='collapse'>
                            <div className='col-9 col-md-6 mb-3 mx-auto border border-danger p-3'>
                            <p className='text-center'>Are You Sure You Want To Delete The Question ??</p> 
                            <div className='d-flex justify-content-center'>
                                <button data-toggle="collapse" 
                                        data-target={`#delete${i}`} 
                                        className='btn btn-warning mr-4'>Cancel</button>

                                <button 
                                        onClick={() => {deleteQuestion(ques.id,i)}} 
                                        className='btn btn-danger ml-4'>Confirm</button>
                            </div>
                            </div>
                        </div>

                        <div className='collapse border border-info w-100 mb-3' id={`question${i}`}>
                            <span 
                                className='float-right mr-3'
                                data-toggle="collapse" 
                                data-target={`#question${i}`} 
                                style={{cursor:'pointer',fontSize:'2.5rem',  color:'red'}}>&times;</span>
                            <ViewQuestion state={ques} />
                        </div>
                    </div>
                    )


    return (
        <div className={classes.scrollable + ' w-100 pr-2'}>          
            {list}
        </div>
    )
}

export default withPagination(ListQuestion)