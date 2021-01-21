import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getProfiles} from '../../actions/profile'
import Loading from '../../components/layout/Loading'
import ProfileItem from './ProfileItem'

const Profiles = () => {
    const dispatch=useDispatch();
    const {loading,profiles}=useSelector(state=>state.profile);
    useEffect(()=>{
        dispatch(getProfiles());
    },[getProfiles])
    return (
        <>
        {loading ? <Loading/> : <Fragment>
         
            <h1 className="large text-primary"> Developers</h1>
            <p className="lead">
                Browse and connect with Developers
            </p>
            <div className="profiles" >
                {
                    profiles.length>0 ? profiles.map(
                        (profile)=>(
                            <ProfileItem key={profile._id} profile={profile} />
                        )
                    )
                    : <h3>No Profile found</h3>
                }
            </div> 

        </Fragment> }
        </>
    )
}

export default Profiles
