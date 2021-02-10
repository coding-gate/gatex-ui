
function CodeField(props) {

    const errorMessages={answer:'Answer code can not be enpty',
        unittest:'Unittest code can not be enpty'
        };
   

    return (
        <div className='mt-3'>            
            <div className="row mt-2">
                <div className="col">
                    <h6>Answer code:</h6>
                    <textarea style={{ height: '120px' }} className='form-control'
                        onChange={(e) => props.updateField("answer", e.target.value)}
                        value={props.state.fields['answer']?props.state.fields['answer']:''}>
                    </textarea>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h6>Unittest code:</h6>
                    <textarea style={{ height: '120px' }} className='form-control'
                        onChange={(e) => props.updateField("unittest", e.target.value)}
                        value={props.state.fields['unittest']?props.state.fields['unittest']:''}>
                    </textarea>
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-primary"
                    onClick={()=>props.handleNext(errorMessages, 2)}>
                    Next
                </button>
            </div>
        </div>

    )
}

export default CodeField