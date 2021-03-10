import React, { useState } from 'react';
import classes from '../../containers/listMCQ/questions.module.css'
import { Unlock, Lock,Pen, Trash,Share } from 'react-bootstrap-icons';

const PrintTable = (props) => {

    const [rowBg, setRowBg] = useState([]);

    function setBgLight(index) {
        let newRowBg = [];
        newRowBg[index] = "bg-light"
        setRowBg(newRowBg);
    }

    function printHeader(header) {
        return header.map((col, index) => <div className={"p-2 " + col.class} key={index} ><b>{col.field}</b></div>)
    }


    function printBody(body,header, option) {
        return body.map((row, index) =>
                <div key={index} className="border-light border-bottom" >
                    <div className={"p-1 mb-0 d-flex " + rowBg[index]}
                        onMouseOver={() => { setBgLight(index) }}
                        onMouseOut={() => { setRowBg([]) }}>
                        {row.map((col, index) => (typeof col==='object') ? null : <div className={ "col  " + header[index].class + " " + classes.textBlock } 
                                                    key={index}>{col}</div>)}
                        <div 
                            className={"col-3 col-xl-2 text-right text-primary"} 
                            style={rowBg[index] ? null : { "display": "none" }}>
                                {option.lock ?
                                    !props.tableBody[index].isLocked ? 
                                      <>
                                        <Unlock
                                            style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                            className='text-primary align-self-center'
                                            onClick={() => option.lock(index)} />

                                        <Pen
                                            style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                            className='text-primary align-self-center'
                                            onClick={() => option.edit(index)} />

                                        <Trash
                                            style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                            className='text-primary align-self-center'
                                            onClick={() => option.delete(index)}/>
                                        </>
                                    :
                                        <>
                                     <Lock
                                        style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                        className='text-secondary align-self-center'
                                    />
                                    <Share style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                        className='text-secondary align-self-center' />
                                        </>
                                    
                                    :null}
                        </div>
                    </div>
                </div>)
    }


    return (<div className="w-100 mb-2">
        <div className="w-100 mx-auto " >
            <div className="border-bottom border-secondary">
                <div className="row bg-light mx-0" >
                    {printHeader(props.tableHeader)}
                </div>
            </div>
            {printBody(props.tableBody,props.tableHeader, props.option)}
        </div>
    </div>)

}

export default PrintTable;