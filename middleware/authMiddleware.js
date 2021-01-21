
import jwt from 'jsonwebtoken'
import config from 'config'

const protect= async (req,res,next)=>{

    
    const token= req.header('x-auth-token')

    if(!token){
         
        res.status(422)
        throw new Error('Invalid token')

    }

    
        try {

            const decode=jwt.verify(token,config.get('jwtToken'));
            // console.log(decode);
            req.user=decode.user;
            next();
            
        } catch (error) {
            res.status(422)
            throw new Error('Invalid token ,may be token is wrong')
    
            
        }

    }
    




export {protect};