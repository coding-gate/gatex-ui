import React, { useState } from 'react';
import classes from '../../containers/listMCQ/questions.module.css'
import { DashCircle, Eye, Pen, PlusCircle, Trash } from 'react-bootstrap-icons';

const PrintTable = (props) => {

    

    const [rowBg, setRowBg] = useState([]);

    function setBgLight(index) {
        let newRowBg = [];
        newRowBg[index] = "bg-light"
        setRowBg(newRowBg);
    }

    function printHeader(header) {
        return header.map((col, index) => <div className={"p-2 text-center " + col.class} key={index} ><b>{col.field}</b></div>)
    }


    function printBody(body, option) {
        return body.map((row, index) =>
                <div key={index} className="border-light border-bottom" >
                    <div className={"p-1 mb-0 d-flex " + rowBg[index]}
                        onMouseOver={() => { setBgLight(index) }}
                        onMouseOut={() => { setRowBg([]) }}>
                        {option.select ? 
                            <input 
                                checked={props.selected.map(ques=> ques.id).includes(props.tableBody[index]['id'])} 
                                onChange={() => option.select(props.tableBody[index])}
                                className='col-1 align-self-center' 
                                type='checkbox'/> : null }
                        <div className={"col-1 align-self-center text-center "}>{row[0]}</div>
                        <div className={"col-1 align-self-center text-center "}>{row[1].toUpperCase()}</div>
                        <div 
                            style={option.select ? {cursor:'pointer'}: null} 
                            onClick={option.select ? () => option.select(props.tableBody[index]) : null} 
                            className={option.select ? "col-6 text-center "+classes.textBlock :"col-7 col-xl-8 text-center "+classes.textBlock} dangerouslySetInnerHTML={{ __html: row[2] }}></div>
                        <div 
                            className={option.select ? "col-3 text-right text-primary" : "col-3 col-xl-2 text-right text-primary"} 
                            style={rowBg[index] ? null : { "display": "none" }}>
                            {option.view
                                ? <Eye
                                    style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                    className='text-primary align-self-center'
                                    onClick={() => option.view(index)} />
                                : null}

                            {option.edit
                                ? <Pen
                                    style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                    className='text-primary align-self-center'
                                    onClick={() => option.edit(index)} />
                                : null}

                            {option.delete
                                ? <Trash
                                    style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                    className='text-primary align-self-center'
                                    onClick={() => option.delete(index)}
                                />
                                : null}

                            {option.select ?
                                !props.selected.map(ques=> ques.id).includes(props.tableBody[index]['id']) 
                                ? <PlusCircle
                                    style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                    className='text-primary align-self-center'
                                    onClick={() => option.select(props.tableBody[index])}/>
                                : <DashCircle 
                                        style={{ fontSize: '1.3rem', marginLeft: '15px', cursor: 'pointer' }}
                                        className='text-primary align-self-center' 
                                        onClick={() => option.select(props.tableBody[index])} /> : null}
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
            {printBody(props.tableBody, props.option)}
        </div>
    </div>)

}

export default PrintTable;