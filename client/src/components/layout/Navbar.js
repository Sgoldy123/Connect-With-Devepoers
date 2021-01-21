import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../actions/auth'
const Navbar = () => {
    
    const auth=useSelector((state)=>state.auth);
    const {loading ,isAuthenticated}=auth;

    const dispatch=useDispatch();
    const logoutHandler=()=>{
        dispatch(logout());
    }

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
               <li><Link to="/profiles">Developers</Link></li>
               {!loading && isAuthenticated && <li><Link to="/posts">Posts</Link></li>}
                {!loading &&  !isAuthenticated && <li><Link to="/register">Register</Link></li>}
                {!loading && isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
                {!loading &&  isAuthenticated ?<li><Link onClick={logoutHandler} to="/">Logout</Link></li> : <li><Link to="/login">Login</Link></li>}
                
            </ul>
        </nav>
    )
}

export default Navbar
