import AceEditor from 'react-ace';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import * as webUtil from '../../../utils/WebUtil'
import { Check, X } from 'react-bootstrap-icons';

function ValidateTest(props) {    

    function checkUnitTest() {

        let testRequest = {
            answerCode : props.state.fields['answerTemplate'],
            unitTestCode : props.state.fields['unittestTemplate']
        }

            props.updateStateField('isLoading', true)
            axios.post(webUtil.getLangUrl() + '/'+ props.state.fields['lang'].value+'/unittest', testRequest)
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
                                                                    <Check style={{fontSize:'2.5em'}} />{e[0]}</div>
                                                                :<div key={index} className="alert alert-danger mx-2 my-0"
                                                                style={{height:'45px'}}>
                                                                   <X style={{fontSize:'2.5em'}} />{e[0]}</div>)
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