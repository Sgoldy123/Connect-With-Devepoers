import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getGitHubRepo} from '../../actions/profile'
import Loading from '../layout/Loading';
const ProfileGithubUserName = ({username}) => {

    const dispatch=useDispatch();

    const {repos}=useSelector(state=>state.profile);


    useEffect(()=>{
          dispatch(getGitHubRepo(username));
    },[getGitHubRepo])

    return (
        <div class="profile-github">
           <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2> 
          {
              repos==null ? <Loading/>:
              repos.length >0 &&
              repos.map(repo=>(
              <div key={repo.id} class="repo bg-white p-1 my-1">
                    <div>
                    <h4><a href={repo.html_url} target="_blank"
                        rel="noopener noreferrer">{repo.name}</a></h4>
                    <p>
                        {repo.description}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                        <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                        <li class="badge badge-light">Forks: {repo.forks_count}</li>
                    </ul>
                    </div>
                </div>
              ))
          }
          
        </div>
    )
}

export default ProfileGithubUserName
