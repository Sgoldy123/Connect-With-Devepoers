import axios from 'axios'
import {ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE,GET_PROFILES, GET_REPOS} from './type'
import {setAlert} from './alert';


export const getProfile=()=>async(dispatch)=>{

    try {
        
        const res=await axios.get('/api/profile/me');
        console.log("@@",res);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

    } catch (err) {

        dispatch({ type: CLEAR_PROFILE });
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//get all users profiles

export const getProfiles=()=>async(dispatch)=>{
    dispatch({type:CLEAR_PROFILE});
    try {
        
        const res=await axios.get('/api/profile');
        console.log("@@",res);
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })

    } catch (err) {

        
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}
//get all user profile bt id

export const getProfileById=(userId)=>async(dispatch)=>{
    try {
        
        const res=await axios.get(`/api/profile/user/${userId}`);
        console.log("@@",res);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

    } catch (err) {

        
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}

//get github repos
export const getGitHubRepo=(username)=>async(dispatch)=>{
    try {
        
        const res=await axios.get(`/api/profile/github/${username}`);
        console.log("@@",res);
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })

    } catch (err) {

        
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}


//create profile

export const createProfile=(formData,history,edit=false)=>async(dispatch)=>{

    try {

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res= await axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit?'profile Updates':'profile created', 'success',3000));
        if(!edit)
        {
            history.push('/dashboard');
        }
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert('error in making profile', 'danger',3000));
    }

}

//update education

export const updateEducation=(formData,history)=>async(dispatch)=>{

    try {

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res= await axios.put('/api/profile/education',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('profile Updates', 'success',3000));
        
        history.push('/dashboard');
        
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert('error to add education', 'danger',3000));
    }

}

//update experience
export const updateExperience=(formData,history)=>async(dispatch)=>{

    try {

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res= await axios.put('/api/profile/experience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('profile Updates', 'success',3000));
        
        history.push('/dashboard');
        
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert('error to add experience', 'danger',3000));
    }

}


// delete experience

export const deleteExperience=(id)=>async(dispatch)=>{
   
    try {
        
        const res=await axios.delete(`api/profile/experience/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('experience deleted', 'success',3000));


    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert('error delete experience', 'danger',3000));
    }
}

// delete education

export const deleteEducation=(id)=>async(dispatch)=>{
   
    try {
        
        const res=await axios.delete(`api/profile/education/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('education deleted', 'success',3000));


    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert('error delete education', 'danger',3000));
    }
}

// delete account

export const deleteAccount=()=>async(dispatch)=>{
   if(window.confirm("wanna delete account")){
    try {
        
        await axios.delete(`api/profile`);
        dispatch({
            type:CLEAR_PROFILE
        })
        dispatch({type:ACCOUNT_DELETED})
        dispatch(setAlert('Account deleted', 'success',3000));


    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
        dispatch(setAlert('error delete education', 'danger',3000));
    }
    
    }
}