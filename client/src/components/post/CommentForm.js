import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {addComment} from '../../actions/post'
const CommentForm = ({postId}) => {
    const [text,setText]=useState('');
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(addComment(postId,{text}));
        setText('');
    }
    return (
        <div>
            <form class="form my-1" onSubmit={submitHandler}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Add comment"
                required
                value={text}
                onChange={(e)=>setText(e.target.value)}
            ></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit"  />
            </form>
        </div>
    )
}

export default CommentForm
