import React,{Fragment, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
const Register = () => {

    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
    })
    
    const dispatch=useDispatch();
    
    const OnChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const auth =useSelector((state)=>state.auth);
    const {isAuthenticated}=auth;
    if(isAuthenticated)
    {
        return <Redirect to="/dashboard"/>
    }
    
    const submitHandler=async(e)=>{
        e.preventDefault();
        if(formData.password !==formData.password2){
            dispatch(setAlert('password dont match','danger',5000));
        }
        else{
           dispatch(register(formData));
        }
    }

    return (
       <Fragment>
            <h1 class="large text-primary">Sign Up</h1>
            <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
            <form class="form" action="create-profile.html" onSubmit={submitHandler}>
                <div class="form-group">
                <input type="text" placeholder="Name" name="name"  value={formData.name} onChange={(e)=>OnChange(e)}/>
                </div>
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
                <div class="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value={formData.password2} onChange={(e)=>OnChange(e)}
                />
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </form>
            <p class="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
       </Fragment>
    )
}

export default Register
