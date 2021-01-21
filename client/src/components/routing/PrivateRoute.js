import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component:Component, ...rest}) => {
    
    // console.log("***  ",{...rest},"%%%" ,Component);
    const auth=useSelector((state)=>state.auth);
    const {isAuthenticated,loading}=auth;

    return (
        <Route 
            {...rest}
            render={
                props=>
                !isAuthenticated && !loading ? (<Redirect to='/login'/>):<Component {...props} />
            }
        />
    )
}

export default PrivateRoute
