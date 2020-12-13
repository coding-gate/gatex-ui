import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            <div className="row mt-3">
                <div className="col-auto col-md-7">
                   <img className="img-fluid "  src="/img/exam.png" alt="exam"></img>
                </div>
                <div className=" col-md-5 ">
                    <p >Create your own set of question in MCQ format and store here securely, 
                        use your question to conduct online test. 
                        It's simple, create a <b>test</b> by selecting question and then generate a link and send that to participant.
                    </p>
                    <p > Result will be calculated online, use our one stop solution. </p>
                    <Link to="/register" className="btn btn-light btn-outline-primary">Register</Link>
                </div>   
            </div>      
            <div className="row">           
                <div className="col">
                    <h4>How GateX works</h4>
                    <p>explain it in flow diagrams</p>
                </div>    
                
            </div>      
           
    </div>
    )
}

export default Home;