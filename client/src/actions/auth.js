import axios from 'axios'
import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS,LOGOUT, CLEAR_PROFILE} from './type'
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken';

export const loadUser=()=>async(dispatch)=>{

    if(localStorage.getItem('token'))
    {
        setAuthToken(localStorage.getItem('token'));
    
        try {
            const res=await axios.get('/api/auth');
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:AUTH_ERROR
            })
        }
    }
    else{
        dispatch({
            type:AUTH_ERROR
        })
    }
    

}

export const register=({name,email,password})=>async(dispatch)=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const res=await axios.post('/api/users',{name,email,password},config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(setAlert('Registeration SuccesFull','success',5000));
        dispatch(loadUser());
    } catch (err) {
        const error=err;
        if(error)
        {
            dispatch(setAlert('Error in Registering','danger',5000));
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }

}

export const login=({email,password})=>async(dispatch)=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const res=await axios.post('/api/auth',{email,password},config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(setAlert('LOGIN SuccesFull','success',5000));
        dispatch(loadUser());
    } catch (err) {
        const error=err;
        if(error)
        {
            dispatch(setAlert('Error in LOGiN','danger',5000));
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }

}


export const logout=()=>(dispatch)=>{
      dispatch({
          type:LOGOUT
      })
      dispatch({
          type:CLEAR_PROFILE
      })
}