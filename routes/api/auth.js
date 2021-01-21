import express from 'express'
const router =express.Router();
import {protect} from '../../middleware/authMiddleware.js'
import User from '../../models/User.js'
import pkg from 'express-validator'
const {body,validationResult} = pkg;
import config from 'config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// @route GET api/auth
// @des  get auth
// @access public
router.get('/',protect,async(req,res)=>{

    try {
        
        const user =await User.findById(req.user.id).select('-password')
        
        res.status(200).json(user);

    } catch (error) {
        
        res.status(400).json({error:"user not find"});
    }

})

// @route POST api/auth
// @des  authontication user login
// @access public
router.post('/',[

    body('email').isEmail(),
    body('password','password is required').exists()
]
,async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
        
        let user =await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"user does not e exist"});
        }
        
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({error:"user does not exist"});
        }

        const payload={
            user:{
                id:user._id
            }
            
        }
        jwt.sign(payload,config.get('jwtToken'),(err,token)=>{
            if(err) throw err
            res.status(200).json({token});
        })
        

       


    } catch (error) {
        res.status(404).send("user not found");
    }
   


 
    
})




export default  router;