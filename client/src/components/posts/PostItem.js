import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {addLikes,removeLikes,deletePost} from '../../actions/post'
import { useDispatch } from 'react-redux'
const PostItem = ({post:{avatar,name,text,date,_id,likes,comments,user},auth,showAction}) => {
  
    const dispatch=useDispatch();
    console.log(_id,likes.length);
    
    return (
        <div className="post bg-white p-1 my-1"> 
                    <div>
                        <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                        </Link>
                    </div>
                  
                        <div>
                        <p className="my-1">
                        {text}
                        </p>
                        <p className="post-date">
                            Posted on {<Moment format="YY/MM/DD" >{date}</Moment> }
                        </p>
                       
                       {showAction  &&
                       <> 
                        <button type="button" className="btn btn-light" onClick={(e)=>dispatch(addLikes(_id))}>
                           👍
                           {likes.length>0 && <span>{likes.length}</span>}
                        </button>
                        <button type="button" className="btn btn-light"  onClick={(e)=>dispatch(removeLikes(_id))}>
                           👎
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                          Discussion <span className='comment-count'>{comments.length}</span>
                        </Link>
                        
                        {
                                auth.isAuthenticated && user===auth.user._id &&
                                <button      
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={(e)=>dispatch(deletePost(_id))}
                                    >
                                Delete
                                </button>
                        }
                        </>
                       }

                    </div>
         </div>
    )
}

export default PostItem
