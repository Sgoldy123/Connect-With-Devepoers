import React, {Fragment, useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Dashboard from  './components/dashborad/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post';

import {Provider} from 'react-redux'
import {loadUser} from './actions/auth'
import store from './store'
import setAuthToken from './utils/setAuthToken'


if(localStorage.getItem('token'))
    {
        setAuthToken(localStorage.getItem('token'));
    }
const App = () => {


  useEffect(()=>{
       store.dispatch(loadUser());
  },[])
  return (
      <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar/>
                <Route exact path='/' component={Landing}/>
                <section className="container">
                  <Alert/>
                  <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/post/:id" component={Post} />
                    <PrivateRoute exact path="/dashboard" component ={Dashboard} />
                    <Route exact path='/create-profile' component={CreateProfile} />
                    <Route exact path='/edit-profile' component={EditProfile} />
                    <Route exact path='/add-experience' component={AddExperience} />
                    <Route exact path='/add-education' component={AddEducation} />
                    <Route exact path='/posts' component={Posts}/>
                  </Switch>
                </section>
            </Fragment>
        </Router>
      </Provider>
  )
}

export default App
