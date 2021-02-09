const jwt=require('express-jwt');
const {secret}=require('config.json');
const db=require('../_helpers/db');

module.exports=authorize;

function authorize(){
    return[
        //authenticate JWT toen and attach decoded token to request as req.user
        jwt({secret,algorithms:['HS256']}),

        //attach full user record to request object
        async (req,res,next)=>{
            const user=await db.User.findByPk(req,user.sub);

            //check if user still exists
            if(!user)
                return res.status(401).json({message:'Unauthorized'});

            //authorization successful
            req.user=user.get();
            next();
        }
    ]
}