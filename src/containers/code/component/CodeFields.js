import AceEditor from 'react-ace';

function CodeField(props) {

    const errorMessages={answerTemplate:'Answer code can not be enpty',
           unittestTemplate:'Unittest code can not be empty'
        };
   

    return (
        <div className='mt-3'>            
            <div className="row mt-2">
                <div className="col">
                    <h6>Answer code:</h6>
                    <AceEditor mode={props.state.fields['lang'].value} theme="eclipse" 
                                value={props.state.fields['answerTemplate']} 
                                onChange={(value) => props.updateFromField("answerTemplate", value)} 
                                width="auto"
                                minLines={12} maxLines={12}/>                     
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h6>Unittest code:</h6>
                    <AceEditor mode={props.state.fields['lang'].value} theme="eclipse"        
                                value={props.state.fields['unittestTemplate']} 
                                onChange={(value) => props.updateFromField("unittestTemplate", value)}  
                                width="auto"                             
                                minLines={20} maxLines={20}/>                      
                </div>
            </div>
            <div className="mt-3 float-right">
            <button className="btn btn-sm btn-outline-primary mx-2"
                    onClick={()=>props.updateStateField('step', 1)}>
                    Back
                </button>
                <button className="btn btn-sm btn-primary"
                    onClick={()=>props.handleNext(errorMessages, 3)}>
                    Next
                </button>
            </div>
        </div>

    )
}

export default CodeField