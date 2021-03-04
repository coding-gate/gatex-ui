import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { PersonFill } from 'react-bootstrap-icons'
import * as actionType from '../../store/actions'


const Header = () => {
    const history = useHistory();
    const roles = useSelector(state => state.oauth.userRole)
    const username = useSelector(state => state.oauth.userName)
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
                                            <Link className="dropdown-item text-primary" to="/mcqList">questions</Link>
                                        </div>
                                </li>
                                :null
                                }
                               
                                
                                <li className="nav-item dropdown">
                                   <Link className="nav-link dropdown-toggle text-primary" to="#" id="navbardrop" data-toggle="dropdown">
                                    <PersonFill /> {username ? username : 'profile'}
                                    </Link>
                                    <div className="dropdown-menu ">
                                        {username ? <Link to="/changepassword" className="dropdown-item text-primary">change password</Link>
                                     : <Link to="/register?ac=user" className="dropdown-item text-primary">register</Link>
                                    }
                                    </div>
                                </li>

                                <li className="nav-item ">
                                    {roles.length === 0
                                        ? <Link className="nav-link text-primary" to="/login">
                                             login
                                        </Link>
                                        : <button type="button" className="btn btn-link px-0" onClick={() => {
                                                        history.push("/login")
                                                        dispatch({ type: actionType.REMOVE_JWT_TOKEN })
                                                    }}>
                                             logout
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