const express = require("express");
const router = express.Router();
const dbservice = require('../dbservice');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

router.post("/register",(req,res)=>{
    try{
        const {prn,fname,lname,phone,password,passwordCheck} = req.body;
        if(!prn || !fname || !lname || !phone || !password || !passwordCheck){
           return res.status(400).json({msg:"Missing input field"});
        }
        else if(password.length <=6){
            return res
                    .status(400)
                    .json({msg:"Password too short! Must be more than 6 characters"});
        }
        else if(password !== passwordCheck){
            return res
                    .status(400)
                    .json({msg:"Confirmed password Didn'nt match "});
        }
        const db = dbservice.getDbServiceInstance();
        const result = db.insertNewStudent(req.body);
        result
            .then(data => res.json({data:data}))
            .catch(err => res.status(500).json(err));
    }
    catch(err){
        return res.status(400).json(err)
    }
});

router.post("/login",(req,res) =>{
    try{
        let {prn,password} = req.body;
        if(!prn || !password){
            return res.status(400).json({msg:"Please provide a prn and password"});
        }
        const db = dbservice.getDbServiceInstance();
        const result = db.userLogin(req.body);
        result
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }
    catch(error){
        return res.status(400).json(err)
    }
});
router.post("/tokenIsValid",async (req,res) =>{
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);

        const verified = jwt.verify(token,process.env.JWT_Secret);
        if(!verified) return res.json(false);
        // else return res.json(true);
        const db = dbservice.getDbServiceInstance();
        const user = db.searchUserByPrn(verified.id);
        user
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})
router.get("/loggedIn",auth,(req,res) =>{
    const db = dbservice.getDbServiceInstance();
    const user = db.searchUserByPrn(req.prn_id);
    user
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
   //res.status(200).json({prn:req.prn_id,msg:"Authentication successfully"});
});

module.exports = router;