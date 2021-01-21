import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {deleteAccount, getProfile} from '../../actions/profile'
import setAuthToken from '../../utils/setAuthToken';
import Loading from '../layout/Loading'
import DashboardAction from './DashboardAction'
import Experience from './Experience'
import Education from './Education'


if(localStorage.getItem('token'))
    {
        setAuthToken(localStorage.getItem('token'));
    }


const Dashboard = () => {
    
    

    const dispatch=useDispatch();
    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
          setAuthToken(localStorage.getItem('token'));
        }
        dispatch(getProfile());
     },[getProfile])
    
    const deleteAccountHandler=(e)=>{
        e.preventDefault();
        dispatch(deleteAccount());
    }

    const auth =useSelector(state=>state.auth); 
    const {user}=auth;
    const Profile=useSelector(state=>state.profile);
    const {profile,loading}=Profile;
    console.log("profile",profile);
    return (
        loading && profile===null ?<Loading/>:<div>
          
          <h1 className="large text-primary">Dashboard</h1>
          <h3 className="lead" >{user && user.name }</h3>
          {profile!==null ?
           <Fragment>
                <DashboardAction/>
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>
                <div className="my-2">
                   <button className="btn btn-danger" onClick={deleteAccountHandler} >Delete Account</button>
                </div>
          </Fragment> :
          <Fragment>
                <p>Please Create your Profie</p>
                <Link to='create-profile' className="btn btn-primary">Create</Link>
          </Fragment>}

        </div>
    )
}

export default Dashboard
