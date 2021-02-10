import AceEditor from 'react-ace';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import * as webUtil from '../../../utils/WebUtil'

function ValidateTest(props) {    

    function checkUnitTest() {

        let testRequest = {
            answerCode : props.state.fields['answerTemplate'],
            unitTestCode : props.state.fields['unittestTemplate']
        }

            props.updateStateField('isLoading', true)
            axios.post(webUtil.URL + '/gatexlang/'+ props.state.fields['lang'].value+'/unittest', testRequest)
                .then(response => {
                    props.updateStateField('isLoading', false)
                   console.log(response.data)
                   let outmsg;
                   if(response.data){
                        if(response.data.status===0){
                            const outputMessage=JSON.parse(response.data.outputMsg);
                            outmsg = outputMessage.map((e,index)=>e[1]
                                                                ?<div key={index} className="alert alert-success mx-2 my-0" 
                                                                style={{height:'45px'}}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                  </svg>{e[0]}</div>
                                                                :<div key={index} className="alert alert-danger mx-2 my-0"
                                                                style={{height:'45px'}}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" classN="bi bi-x" viewBox="0 0 16 16">
                                                                       <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                    </svg>{e[0]}</div>)
                            outmsg=<div className="mt-3 d-flex flex-nowrap">{outmsg}</div>
                            props.updateFromField('result', outmsg);
                            props.updateFromField('testcaseNo', outputMessage.length);
                        }
                   }

                }).catch(error => {
                    props.updateStateField('isLoading', false)
                    webUtil.handleError(error, props);
                })
    
       }
   

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
                    onClick={()=>checkUnitTest()}>
                    Test
                </button>               
            </div>
            <div className="row mt-2">
                <div className="col">
                    Total testcase: <b>{props.state.fields['testcaseNo']} </b> 
                </div>    
            </div>
            <div className="row mt-2">
                <div className="col">
                        {props.state.fields['result']}   
                </div>    
            </div>
        </div>

    )
}

export default ValidateTest