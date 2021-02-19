import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actionType from '../../store/actions'
import { PersonFill } from 'react-bootstrap-icons';


const Header = () => {
    const history = useHistory();
    const roles = useSelector(state => state.oauth.userRole)
    const dispatch = useDispatch()

    return (
        <div>
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-md navbar-light px-0 py-1 text-capitalize bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <Link className="navbar-brand" to="/">&nbsp;Gate<span style={{ color: "green" }}><b>X</b></span></Link>
                            <ul className="navbar-nav ml-auto">
                               
                               
                                {roles.includes("ADMIN")
                                    ? <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
                                            admin
                                        </Link>
                                        <div className="dropdown-menu ">
                                            <Link className="dropdown-item" to="/viewContacts">View Contacts</Link>
                                        </div>
                                    </li>
                                    : null}
                                {roles.length !== 0
                                    ?<li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle text-primary" to="#" id="navbardrop" data-toggle="dropdown">
                                            code
                                            </Link>
                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item text-primary" to="/addCodeQuestion">addCodeQuestion</Link>
                                            </div>
                                    </li>
                                    :null
                                }
                                {roles.length !== 0
                                ?<li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle text-primary" to="#" id="navbardrop" data-toggle="dropdown">
                                            MCQ
                                        </Link>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item text-primary" to="addMcq">Add new</Link>
                                            <Link className="dropdown-item text-primary" to="/mcqList">List all</Link>
                                            <Link className="dropdown-item text-primary" to="/createTest">Create test</Link>
                                            <Link className="dropdown-item text-primary" to="/exam">Exam</Link>
                                        </div>
                                </li>
                                :null
                                }
                               
                                
                                <li className="nav-item dropdown">
                                   <Link className="nav-link dropdown-toggle text-primary" to="#" id="navbardrop" data-toggle="dropdown">
                                      account
                                    </Link>
                                    <div className="dropdown-menu ">
                                      <Link to="/register?ac=user" className="dropdown-item text-primary">register</Link>
                                      {roles.length !== 0 ?
                                      <Link to="/changePassword" className="dropdown-item text-primary">change password</Link>
                                      : null}
                                    </div>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link text-primary" to="/aboutUs">about us</Link>
                                </li>


                                <li className="nav-item ">
                                    {roles.length === 0
                                        ? <Link className="nav-link text-primary" to="/login">
                                            <PersonFill /> Login
                                        </Link>
                                        : <button type="button" className="btn btn-link px-0" onClick={() => {
                                                        history.push("/login")
                                                        dispatch({ type: actionType.REMOVE_JWT_TOKEN })
                                                    }}>
                                            <PersonFill /> Logout
                                        </button>}
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )

}



export default Header;