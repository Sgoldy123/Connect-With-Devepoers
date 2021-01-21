import express from 'express'
const router =express.Router();
import {protect} from '../../middleware/authMiddleware.js'
import Profile from '../../models/Profile.js'
import User from '../../models/User.js'
import Post from '../../models/Post.js'
import pkg from 'express-validator'
const {body,validationResult} = pkg;
import config from 'config';
import request from 'request';

// @route GET api/profile/me
// @des  get profile of user
// @access private
router.get('/me',protect,async(req,res)=>{
    const user=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])   ;
    if(user)
    {
        res.status(200).json(user);
    }
    else{
        res.status(400).json({error:"user not exist"});   
    }
})

// @route POST api/profile
// @des  create or update profile
// @access private

router.post('/',[protect, [
    body('status',"status is not empty").not().isEmpty(),
    body('skills',"skills is not empty").not().isEmpty(),
]], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {company,website,location,status,skills,bio,githubusername,facebook,youtube,twitter,instagram,linkedin}=req.body;
    
    let profileField={};
    profileField.user=req.user.id
    if(company)profileField.company=company
    if(website)profileField.website=website
    if(location)profileField.location=location
    if(status)profileField.status=status
    if(bio)profileField.bio=bio
    if(githubusername)profileField.githubusername=githubusername
    if(skills){
        profileField.skills=skills.split(',').map(skill=>skill.trim());
    }
    profileField.social={};
    if(youtube)profileField.social.youtube=youtube
    if(facebook)profileField.social.facebook=facebook
    if(linkedin)profileField.social.linkedin=linkedin
    if(instagram)profileField.social.instagram=instagram
    if(twitter)profileField.social.twitter=twitter

    console.log("**",profileField)

    try {
        let profile=await Profile.findOne({user:req.user.id})
        //update
        if(profile){
            profile=await Profile.findOneAndUpdate({user:req.user.id},{
                $set:profileField
            }, {new:true})

            return res.status(200).json(profile)
        }
        //create
        profile =new Profile(profileField);
        await profile.save();
        return res.status(200).json(profile)

        
    } catch (error) {
        res.status(400).json({error:error})
    }

})


// @route GET api/profile
// @des  get profile of all user
// @access public
router.get('/',async(req,res)=>{
    const userProfiles=await Profile.find({}).populate('user',['name','avatar'])   ;
    if(userProfiles)
    {
        res.status(200).json(userProfiles);
    }
    else{
        res.status(400).json({error:"users not exist"});   
    }
})

// @route GET api/profile/user/:user_id
// @des  get profile of  user by _id
// @access public
router.get('/user/:user_id',async(req,res)=>{
    
   try{
    const user=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])   ;   
    if(user)
    {
        res.status(200).json(user);
    }
    else{
        res.status(400).json({error:"user not found"});   
    }}
    catch(error){
        if(error.kind==="ObjectId")res.status(400).json({error:"user not found"});  
        res.status(400).json(error)
    }
})


// @route Delete api/profile
// @des  Delte profile or user
// @access private
router.delete('/',protect,async(req,res)=>{
   try {
    
      await Post.deleteMany({user:req.user.id});
      await Profile.findOneAndDelete({user:req.user.id});
      await User.findOneAndDelete({_id:req.user.id})

      res.status(200).send("deleted user profile successfully")
       
   } catch (error) {
       res.status(400).json(error);
   }
})


// @route Put api/profile/experience
// @des  Add experience
// @access private

router.put('/experience',[protect, [
    body('title',"title is not empty").not().isEmpty(),
    body('company',"company is not empty").not().isEmpty(),
    body('from',"from is not empty").not().isEmpty(),
]],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title,company,location,from,to,current,description}=req.body;
        const profile=await Profile.findOne({user:req.user.id});
        profile.experience.unshift({title,company,location,from,to,current,description});
        await profile.save();
        res.status(200).json(profile);
    
    } catch (err) {
        res.status(404).json({error:err});
    }
   

})

// @route Delete api/profile/experience/:exp_id
// @des  Delete experience
// @access private

router.delete('/experience/:exp_id',protect,async (req,res)=>{
    try {

        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.experience.map(item=>item._id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.status(200).json(profile);
        // console.log("ok")
        
    } catch (error) {
        res.status(404).json({error:error});
    }
})


// @route Put api/profile/education
// @des  Add experience
// @access private

router.put('/education',[protect, [
    body('school',"school is not empty").not().isEmpty(),
    body('degree',"degree is not empty").not().isEmpty(),
    body('from',"from is not empty").not().isEmpty(),
    body('fieldofstudy',"fieldofstudy is not empty").not().isEmpty(),
]],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {school,degree,fieldofstudy,from,to,current,description}=req.body;
        const profile=await Profile.findOne({user:req.user.id});
        profile.education.unshift({school,degree,fieldofstudy,from,to,current,description});
        await profile.save();
        res.status(200).json(profile);
    
    } catch (err) {
        res.status(404).json({error:err});
    }
   

})

// @route Delete api/profile/education/:edu_id
// @des  Delete education
// @access private

router.delete('/education/:edu_id',protect,async (req,res)=>{
    try {

        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.education.map(item=>item._id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.status(200).json(profile);
        // console.log("ok")
        
    } catch (error) {
        res.status(404).json({error:error});
    }
})


// @route GET api/profile/github/:username
// @des  get github repo
// @access public
router.get('/github/:username',async(req,res)=>{
    
    try {

        const options={
            uri:`http://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId')}&client_secret=${config.get( 'githubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}

        }

        request(options,(error,response,body)=>{
            if(error)console.log(error)
            if(response.statusCode!==200){
              return  res.status(400).json({msg:"github user not found"})
            }
            res.json(JSON.parse(body));

        })
        
    } catch (error) {
        res.status(400).json(error);
    }
 })




export default  router;