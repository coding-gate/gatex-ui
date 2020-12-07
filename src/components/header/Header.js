import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actionType from '../../store/actions'


const Header = () => {

    const roles = useSelector(state => state.oauth.userRole)
    const dispatch = useDispatch()

    const svgText = (<svg width="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>)

    let loginLogout = (!roles.includes("ADMIN")) ?
        (<Link className="nav-link text-primary" to="/login">{svgText} login
        </Link>) :
        (<button type="button" className="btn btn-link px-0" onClick={() => dispatch({ type: actionType.REMOVE_JWT_TOKEN })}>
            {svgText}logout
        </button>);

    let linkOption = (roles.includes("ADMIN")) ? (<li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
            admin
        </Link>
        <div className="dropdown-menu ">
            <Link className="dropdown-item" to="/viewContacts">View Contacts</Link>
        </div>
    </li>) : null;

    return (
        <div>
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-md bg-white navbar-light px-0">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <Link className="navbar-brand" to="/">&nbsp;Test<span style={{ color: "red" }}><b>X</b></span></Link>
                            <ul className="navbar-nav ml-auto">
                                {linkOption}
                                <li className="nav-item">
                                    <Link className="nav-link text-primary" to="/aboutUs">about us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-primary" to="/contactUs">contact</Link>
                                </li>
                                <li className="nav-item ">
                                       {loginLogout}
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