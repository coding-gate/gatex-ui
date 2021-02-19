import React, { useState } from 'react';
import { Eye, Pen, Trash } from 'react-bootstrap-icons';
import ViewQuestion from '../../containers/ViewQuestion/ViewQuestion';
import DecisionModal from '../Modal/DecisionModal';
import DisplayModal from '../Modal/DisplayModal';

const PrintTable = (props) => {

    const [rowBg, setRowBg] = useState([]);

    function setBgLight(index) {
        let newRowBg = [];
        newRowBg[index] = "bg-light"
        setRowBg(newRowBg);
    }

    function printHeader(header) {
        return header.map((col, index) => <div className={"col p-2 text-center " + col.class} key={index} ><b>{col.field}</b></div>)
    }


    function printBody(body, header, option) {
        return body.map((e,index)=>{ return [index+1,e['type'],e['text']]}).map((row, index) => <div key={index} className="border-bottom border-light" >
            <div className={"row p-2 " + rowBg[index]}
                onMouseOver={() => { setBgLight(index) }}
                onMouseOut={() => { setRowBg([]) }}>
                {row.map((col, index) => <div className={"col text-center " + header[index].class} key={index}>{col}</div>)}

                <div className="col text-right text-primary" style={rowBg[index] ? null : { "display": "none" }}>
                    {option.view
                        ? <Eye 
                            style={{fontSize:'1.3rem',marginLeft:'15px',cursor:'pointer'}} 
                            className='text-secondary' 
                            data-toggle='modal'
                            data-target={'#display'+index} />
                        : null}

                    {option.edit
                        ? <Pen 
                            style={{fontSize:'1.3rem',marginLeft:'15px',cursor:'pointer'}} 
                            className='text-secondary' 
                            onClick={() => option.edit(index)} />
                        : null}

                    {option.delete
                        ? <Trash 
                            style={{fontSize:'1.3rem',marginLeft:'15px',cursor:'pointer'}} 
                            className='text-secondary' 
                            data-toggle='modal'
                            data-target={'#decision'+index}
                            //onClick={() => option.delete(index)} 
                            />
                        : null}
                </div>
                {
                    option.view ? 
                    <DisplayModal id={index}>
                        <ViewQuestion state={body[index]} />
                    </DisplayModal> 
                    :null
                }
                
                {
                    option.delete ? 
                    <DecisionModal confirmActionHandler={() => option.delete(index)} id={index}>
                        <p className='font-weight-bold'>Are You Sure You Want To Delete The Question ?</p> 
                        <p className='border p-3'>{body[index].text}</p>
                    </DecisionModal> 
                    :null
                }

            </div>
        </div>)
    }


    return (<div className="row mb-2">
        <div className="col col-md-10 offset-1" >
           <div className="border-bottom border-secondary">
             <div className="row bg-light mx-0" >              
                  {printHeader(props.tableHeader)}
               </div>
            </div>
            {printBody(props.tableBody, props.tableHeader, props.option)}
        </div>
    </div>)

}

export default PrintTable;