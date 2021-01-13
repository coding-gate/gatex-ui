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
                    <div className='w-100' key={i}>
                        <div 
                        id={`div${i}`}
                        style={{borderRadius:'10px'}}  
                        className={classes.question + ' border border-rounded d-flex align-items-center mb-3'}
                        >
                            <div
                                data-toggle="collapse" 
                                data-target={`#question${i}`}
                                className="col-lg-10 border-right p-2 pl-3 col-8">
                                <span><b>Q-{i+1} : &nbsp;</b></span>
                                {ques.text}
                            </div>

                            <div 
                                className="col-lg-1 col-2 p-2 border-right text-center"> 
                                <svg 
                                    data-toggle="collapse" 
                                    data-target={`#delete${i}`}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="28" 
                                    height="28" 
                                    fill="currentColor" 
                                    className={classes.delIcon} 
                                    viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        
                                </svg>
                            </div>

                            <div className="col-lg-1 col-2 h-100 p-2 text-center">
                                <Link className='text-secondary' 
                                to={'/addMcq?questionId='+ques.id} >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="28" 
                                        height="28" 
                                        fill="currentColor" 
                                        className={classes.editIcon}
                                        viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                       
                                    </svg>
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
                        <div className='collapse border border-info w-100 mb-3' data-parent={`#div${i}`} id={`question${i}`}>
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