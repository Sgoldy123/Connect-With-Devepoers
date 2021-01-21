import React,{Fragment, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {login} from '../../actions/auth'
const Login = () => {

    const [formData,setFormData]=useState({
        email:'',
        password:'',
    })
    
    const OnChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const dispatch=useDispatch();
    const auth =useSelector((state)=>state.auth);
    const {isAuthenticated}=auth;
    console.log("SS",isAuthenticated);
    if(isAuthenticated)
    {
        return <Redirect to="/dashboard"/>
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(login(formData));
       
        
    }

    return (
       <Fragment>
            <h1 class="large text-primary">Sign In</h1>
            <p class="lead"><i class="fas fa-user"></i>  Sign InTo Account</p>
            <form class="form" action="create-profile.html" onSubmit={submitHandler}>
                <div class="form-group">
                <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={(e)=>OnChange(e)} />
                <small class="form-text">This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                </div>
                <div class="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={formData.password} onChange={(e)=>OnChange(e)}
                />
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </form>
            <p class="my-1">
                Create Account <Link to="/register">Sign Up</Link>
            </p>
       </Fragment>
    )
}

export default Login
