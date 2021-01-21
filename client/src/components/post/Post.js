import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {getPost} from '../../actions/post'
import Loading from '../layout/Loading'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
const Post = ({match}) => {

    const {post,loading}=useSelector(state=>state.post);
    const auth=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPost(match.params.id));
    },[getPost])

    console.log(post && post.comments);
    return (
        <>
          {post===null || loading ? <Loading/> :
          <>
           <Link to='/posts' className="btn" >Go Back</Link>
           <PostItem post={post} auth={auth} showAction={false}/>
           <CommentForm postId={post._id} />
           <div className="comments">
             {
                 post.comments.length >0 && post.comments.map((comment)=>(
                     <CommentItem key={comment._id} comment={comment}  postId={post._id} auth={auth}/>
                 ))
             }
           </div>
          </>
          }
        </>
    )
}

export default Post
