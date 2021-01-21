import express from 'express'
const router =express.Router();
import pkg from 'express-validator'
const {body,validationResult} = pkg;
import {protect} from '../../middleware/authMiddleware.js'
import Post from '../../models/Post.js'
import User from '../../models/User.js'

// @route POST api/posts
// @des  create Post
// @access private
router.post('/',[protect, [
    body('text',"text is not empty").not().isEmpty(),
]],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user =await User.findById(req.user.id).select('-password');
        const newPost={
            text:req.body.text,
            user:req.user.id,
            name:user.name,
            avatar:user.avatar
        }
        const post=new Post(newPost);
        await post.save();
        res.status(200).json(post);
        
    } catch (error) {
        res.status(400).json(error);
    }
    
})

// @route GET api/posts
// @des  get all post
// @access private

router.get('/',protect,async(req,res)=>{
    try {
        const posts=await Post.find({}).sort({date:-1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error);
    }

})
// @route GET api/posts/:id
// @des  get post by id
// @access private

router.get('/:id',protect,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(400).json({msg:"post not found"});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }

})

// @route DELETE api/posts/:id
// @des  delete post by id
// @access private

router.delete('/:id',protect,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.user.toString()!==req.user.id)
        {
            return res.status(400).json({msg:"can`t delete post"});
        }
        await post.remove();
        res.status(200).json({msg:"post deleted"});
    } catch (error) {
        res.status(400).json(error);
    }

})

// @route PUT api/posts/like/:id
// @des  like 
// @access public

router.put('/like/:id',protect,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg:"post already liked"});
        }

       post.likes.push({user:req.user.id});
        await post.save();
        res.status(200).json(post);
        

    } catch (error) {
        res.status(400).json(error);
    }
   
})

// @route PUT api/posts/unlike/:id
// @des  unlike 
// @access public

router.put('/unlike/:id',protect,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg:"post not liked yet"});
        }

      const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
      post.likes.splice(removeIndex,1);
        await post.save();
        res.status(200).json(post);
        

    } catch (error) {
        res.status(400).json(error);
    }
   
})



// @route PUT api/posts/comment/:id
// @des  add comment
// @access public
router.put('/comment/:id',[protect, [
    body('text',"text is not empty").not().isEmpty(),
]],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user =await User.findById(req.user.id).select('-password');
        const post=await Post.findById(req.params.id);
        const newPost={
            text:req.body.text,
            user:req.user.id,
            name:user.name,
            avatar:user.avatar
        }
        post.comments.unshift(newPost);
        await post.save();
        res.status(200).json(post);
        
    } catch (error) {
        res.status(400).json(error);
    }
    
})

// @route DELETE api/posts/comment/:id/:commentId
// @des  delete comment by id
// @access private

router.delete('/comment/:id/:commentId',protect,async(req,res)=>{
    console.log(req.params.id,req.params.commentId);
    try {
        const post=await Post.findById(req.params.id);
        const comment=post.comments.find(comment=>comment.id===req.params.commentId);
        // console.log("$$",comment);
        if(!comment)
        {
            return res.status(400).json({msg:"comment not found"})
        }
        if(comment.user.toString()!==req.user.id)
        {
            return res.status(400).json({msg:"not authorized"});
        }
        const removeIndex=post.comments.map(comment=>comment.id.toString()).indexOf(req.params.commentId);
        post.comments.splice(removeIndex,1);
          await post.save();
          res.status(200).json(post);

    } catch (error) {
        res.status(400).json(error);
    }

})


export default  router;