const express = require("express");
const router = express.Router();
const dbservice = require('../dbservice');
const auth = require('../middleware/auth');

router.get("/:prn/:subjectid",auth,(req,res) =>{
    const subjectid = parseInt(req.params.subjectid,10);
    const prn = parseInt(req.params.prn,10);
    if(req.prn_id === prn){
        const db = dbservice.getDbServiceInstance()
        const result = db.getQuestion(subjectid);
       result
            .then(data =>res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }
})
router.get("/:subjectid",auth,(req,res) =>{
   
    const subjectid = parseInt(req.params.subjectid,10);
    const db = dbservice.getDbServiceInstance()
   const result = db.getAnswer(subjectid);
    result
        .then(data =>res.status(200).json(data))
        .catch(err => res.status(500).json(err))
})


module.exports = router;