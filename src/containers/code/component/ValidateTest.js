import AceEditor from 'react-ace';
import ReactHtmlParser from 'react-html-parser';

function ValidateTest(props) {    
   

    return (
        <div className='mt-3'>            
            <div className="row mt-2">
                <div className="col">
                    <h6>Qusetion :</h6>
                    {ReactHtmlParser(props.state.fields['text'])}                  
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h6>Answer:</h6>
                    <AceEditor mode={props.state.fields['lang'].value} theme="eclipse"        
                                value={props.state.fields['answerTemplate']} 
                                onChange={(value) => props.updateFromField("answerTemplate", value)}  
                                width="auto"                             
                                minLines={17} maxLines={17}/>                      
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-outline-primary mx-2"
                    onClick={()=>props.updateStateField('step', 2)}>
                    Back
                </button> 
                <button className="btn btn-sm btn-primary"
                    onClick={()=>props.handleTest()}>
                    Test
                </button>               
            </div>
        </div>

    )
}

export default ValidateTest