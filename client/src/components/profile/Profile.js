import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/layout/Loading'
import {getProfileById} from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithubUserName from './ProfileGithubUserName'
 
const Profile = ({match}) => {
    const auth=useSelector(state=>state.auth);
    const {profile,loading}=useSelector(state=>state.profile)
    const dispatch=useDispatch();
    useEffect(()=>{
       dispatch(getProfileById(match.params.id))
    },[getProfileById])
    console.log(profile,loading)
    return (
        <>
            {(profile===null || loading )? <Loading/> :
             <>
            
                <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>
                {auth.isAuthenticated && auth.loading===false && profile.user._id===auth.user._id &&  <Link to='/edit-profile' className="btn btn-dark">Edit PRofile</Link>}
                
                    <div class="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div class="profile-exp bg-white p-2">
                            <h2 class="text-primary">Experience</h2>
                            {
                                profile.experience.length>0 ? profile.experience.map(exp=>(
                                    <ProfileExperience key={exp._id} exp={exp}/>
                                ))
                                : <h4>No experience</h4>
                            }
                        </div>   
                        <div class="profile-edu bg-white p-2">
                            <h2 class="text-primary">Education</h2>
                            {
                                profile.education.length>0 ? profile.education.map(edu=>(
                                    <ProfileEducation key={edu._id} edu={edu}/>
                                ))
                                : <h4>No education</h4>
                            }
                            
                        </div>      
                        {
                            profile.githubusername && 
                            <ProfileGithubUserName username={profile.githubusername}/>
                        }      
                        
                    </div>
                
            </>
                }
                
        </>
    )
}

export default Profile
