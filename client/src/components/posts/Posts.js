import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getPosts} from '../../actions/post'
import Loading from '../layout/Loading';
import PostItem from './PostItem';
import PostForm from './PostForm'

const Posts = () => {
    
    const {posts,loading}=useSelector(state=>state.post)
    const auth =useSelector(state=>state.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
          dispatch(getPosts());
    },[getPosts])

    

    

    return (
        loading ? <Loading/> 
        : 
        <>
             <PostForm/>
            <h1 class="large text-primary">
                Posts
            </h1>
            <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>
            <div class="posts">
                { posts.length>0 && posts.map(post=>(
                    <PostItem post={post} key={post._id} auth={auth} showAction={true} />
                ))}
            </div>

        </>
    )
}

export default Posts
