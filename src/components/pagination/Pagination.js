import React from 'react';

const Pagination = (props) => {

    const startWindowIndex = props.startWindowIndex;
    const endWindowIndex = Math.min(props.totalRecordCount, (startWindowIndex + (props.pageSize * props.pageCount)));

    const prevCss = (startWindowIndex <= 0) ? 'page-item disabled' : 'page-item';
    const nextCss = (endWindowIndex < props.totalRecordCount) ? 'page-item' : 'page-item disabled';

    function printPageItem() {
        let pageItems = [];

        let startPageNo = (startWindowIndex / props.pageSize) + 1;
        let endPageNo = Math.ceil(endWindowIndex / props.pageSize)

        for (let i = startPageNo; i <= endPageNo; i++) {
            let pageItem = <li key={i} className="page-item">
                <button className="page-link" name={i} onClick={(event) => props.pageNoHandler(event.target.name)}>{i}</button></li>
            pageItems.push(pageItem)
        }
        return pageItems;
    }

    return (
        <ul className="pagination justify-content-center">
            <li className={prevCss}><button className="page-link" onClick={() => props.drawPaginationWindow('prev')}>Prev</button></li>
            {printPageItem()}
            <li className={nextCss}><button className="page-link" onClick={() => props.drawPaginationWindow('next')}>Next</button></li>
        </ul>)

}

export default Pagination;