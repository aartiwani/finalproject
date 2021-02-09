const jwt = require("jsonwebtoken");
const auth = (req,res,next) =>{
    try{
        const token = req.header("x-auth-token");
        if(!token)
            return res
                    .status(401)
                    .json({msg:"No authentication token, authorization denied"});

            const verified = jwt.verify(token,process.env.JWT_Secret);
            if(!verified){
                return res
                        .status(401)
                        .json({msg:"Token verification failed,authorization denied"});
            }
            req.prn_id = verified.id;
            // console.log(verified);
            next();
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

module.exports = auth;