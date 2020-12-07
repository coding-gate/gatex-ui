import React, { useState } from 'react';

const PrintTable = (props) => {

    const [rowBg, setRowBg] = useState([]);

    function setBgLight(index) {
        let newRowBg = [];
        newRowBg[index] = "bg-light"
        setRowBg(newRowBg);
    }

    function printHeader(header) {
        return header.map((col, index) => <th key={index} scope="col" >{col}</th>)
    }


    function printBody(body) {
        return body.map((row, index) => <tr key={index} className={rowBg[index]}
            onMouseOver={() => { setBgLight(index) }}
            onMouseOut={() => { setRowBg([]) }}>
            {row.map((col, index) => <td key={index}>{col} </td>)}
        </tr>)
    }


    return (<div className="d-flex justify-content-center">
        <table className="col-md-10 table table-sm" >
            <thead>
                <tr className="table-secondary">
                    {printHeader(props.tableHeader)}
                </tr>
            </thead>
            <tbody>
                {printBody(props.tableBody)}
            </tbody>
        </table>
    </div>)

}

export default PrintTable;