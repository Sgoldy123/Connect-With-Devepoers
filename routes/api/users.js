import express from 'express'
import pkg from 'express-validator'
const {body,validationResult} = pkg;
const router =express.Router();
import User from '../../models/User.js'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import config from 'config'
import jwt from 'jsonwebtoken'

const secretToken=config.get('jwtToken')
// @route GET api/users
// @des  get users
// @access public
router.get('/',(req,res)=>{
    res.send("users")
})

// @route POST api/users
// @des  users register
// @access public
router.post('/',[

    body('name',"please enter a name").not().isEmpty(),
    body('email').isEmail(),
    body('password','password atleast 4').isLength({min:4})
]
,async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name,email,password}=req.body;
    try {
        
        let user =await User.findOne({email})
        if(user){
            return res.status(400).json({error:"email already exist"});
        }
        const avatar =gravatar.url(email,{
            s: '200', r: 'pg', d: 'mm'
        })

        user =new User({
            email,password,name,avatar
        })
        
        
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        // console.log("@@@",user)

        const payload={
            user:{
                id:user._id
            }
            
        }
        jwt.sign(payload,secretToken,(err,token)=>{
            if(err) throw err
            res.status(200).json({token});
        })
        

       


    } catch (error) {
        res.status(404).send(error);
    }
   


 
    
})



export default  router;