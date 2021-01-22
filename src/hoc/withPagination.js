import React, {Component}  from 'react';
import Pagination from '../components/pagination/Pagination';

const withPagination = (WrappedComponent, PAGE_SIZE = 10, PAGE_COUNT = 5) => {

    class WithPagination extends Component {

        allRecords = [];

        state = { startPageWindowIndex: 0, tableBody: [], startingIndex:null }

        setTableBody = (pageNo) => {
            let startIndex = (pageNo - 1) * PAGE_SIZE;
            let endIndex = Math.min(startIndex + PAGE_SIZE, this.allRecords.length);
            this.setState({ tableBody: this.allRecords.slice(startIndex, endIndex), startingIndex:startIndex });
        }  
    
        paginationWindowHandler = (direction) => {
            const windowSize = (PAGE_SIZE * PAGE_COUNT);
            let newStartPageWindowIndex = this.state.startPageWindowIndex;
            if (direction === 'prev') {
                newStartPageWindowIndex -= windowSize;
                this.setState({ startPageWindowIndex: newStartPageWindowIndex });
            } else if (direction === 'next') {
                newStartPageWindowIndex += windowSize;
                this.setState({ startPageWindowIndex: newStartPageWindowIndex });
            }
            const startPageNo = newStartPageWindowIndex / PAGE_SIZE + 1;
            this.setTableBody(startPageNo);
        }

        initPagination = (allRecords)=>{
          this.allRecords=allRecords;
          this.setTableBody(1);
        }

        render() {           
            return (
                <>                   
                    <WrappedComponent {...this.props} startingIndex={this.state.startingIndex} tableBody={this.state.tableBody} initPagination={this.initPagination}/>
                    {this.allRecords.length<PAGE_SIZE ? null :
                    <Pagination startWindowIndex={this.state.startPageWindowIndex}
                        pageSize={PAGE_SIZE}
                        pageCount={PAGE_COUNT}
                        totalRecordCount={this.allRecords.length}
                        drawPaginationWindow={this.paginationWindowHandler}
                        pageNoHandler={this.setTableBody} />
                    }
                </>
            )
        }
    }
    return WithPagination;
}

export default withPagination;