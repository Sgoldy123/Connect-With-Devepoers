import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { addPost } from '../../actions/post'

const PostForm = () => {

    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        text:''
    });
    const submitHandler=(e)=>{
        console.log(formData);
        e.preventDefault();
        dispatch(addPost(formData));
        setFormData({
            text:''
        })
    }

    return (
        <div class="post-form">
            <div class="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={submitHandler}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                required
                value={formData.text}
                onChange={(e)=>setFormData({...formData,text:e.target.value})}
            ></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}

export default PostForm
