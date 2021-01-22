import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actionType from '../../store/actions'


const Header = () => {
    const history = useHistory();
    const roles = useSelector(state => state.oauth.userRole)
    const dispatch = useDispatch()

    const svgText = (<svg width="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>)

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

                                <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle text-primary" to="#" id="navbardrop" data-toggle="dropdown">
                                           code
                                        </Link>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item text-primary" to="/addMcq">Add new</Link>
                                            <Link className="dropdown-item text-primary" to="/mcqList">List all</Link>
                                        </div>
                                </li>

                                <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle text-primary" to="#" id="navbardrop" data-toggle="dropdown">
                                            MCQ
                                        </Link>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item text-primary" to="addMcq">Add new</Link>
                                            <Link className="dropdown-item text-primary" to="/mcqList">List all</Link>
                                            <Link className="dropdown-item text-primary" to="/createTest">Create test</Link>
                                        </div>
                                </li>
                               
                                
                                <li className="nav-item dropdown">
                                   <Link className="nav-link dropdown-toggle text-primary" to="#" id="navbardrop" data-toggle="dropdown">
                                      account
                                    </Link>
                                    <div className="dropdown-menu ">
                                      <Link to="/register?ac=user" className="dropdown-item text-primary">register</Link>
                                    </div>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link text-primary" to="/aboutUs">about us</Link>
                                </li>


                                <li className="nav-item ">
                                    {roles.length === 0
                                        ? <Link className="nav-link text-primary" to="/login">
                                            {svgText} login
                                        </Link>
                                        : <button type="button" className="btn btn-link px-0" onClick={() => {
                                                        history.push("/login")
                                                        dispatch({ type: actionType.REMOVE_JWT_TOKEN })
                                                    }}>
                                            {svgText} logout
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