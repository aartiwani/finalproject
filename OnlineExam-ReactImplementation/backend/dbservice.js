const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");
const connection = require('./dbConnection');
dotenv.config();
let instance = null;
class Dbservice{
    static getDbServiceInstance(){
        return instance ? instance : new Dbservice();
    }
    async insertNewStudent(params){
        try{
        const {prn,fname,lname,phone,password,passwordCheck} = params;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash =  bcrypt.hashSync(password,salt);
        const promise = new Promise((resolve,reject) =>{
            connection.query('select Prn from registration where Prn=?;',[prn],(error,results) =>{
                if(error){
                    console.log(error);
                }
                if(results.length>0){
                    reject({msg:"PRN already Taken"});
                }
                else{
                    let query = 'insert into registration(Prn,Fname,Lname,Phone,Password) values(?,?,?,?,?)';
                    connection.query(query,[prn,fname,lname,phone,passwordHash],(error,result) =>{
                        if(error){
                            if(error.errno==1062)
                            reject({msg:"Phone number must be unique"})
                            reject(error.sqlMessage);
                        }
                        resolve({msg:"Registered Successfully"});
                    })
                }
            }); 
        });
        return promise;   
    }
     catch(err){
        return err;
         }
    }
    async userLogin(param) {
        try{
            let {prn,password} = param;
            const promise =  new Promise((resolve,reject) =>{
            connection.query('select * from registration where Prn=?;',[prn],  async (error,result) =>{
                if(result.length === 0 || error){
                   reject({msg:"Please register first"});
                }
                else if( await !( bcrypt.compareSync(password,result[0].Password))){
                   reject({msg:"Wrong password or prn"})
                }
                else{
                    const id = result[0].Prn;
                    const queryResult = result[0];
                    const Name =queryResult.Fname+" "+queryResult.Lname;
                    const token = jwt.sign({id},process.env.JWT_SECRET,{
                        expiresIn:process.env.JWT_EXPIRES_IN
                    });
                     resolve({msg:"Login Successfully",token:token,displayName:Name,prn:id});
                }
            });
        })
        return promise;
        }
        catch(err){
            return err;
        }
    }
    async searchUserByPrn(prn){
        try{
            const response = await new Promise((resolve,reject) =>{
                let query = "Select Prn ,Fname,Lname from registration where Prn=?";
                connection.query(query,[prn],(error , result) =>{
                    if(error || result.length===0){
                       reject( error || "Empty set");
                    }
                    const queryResult = result[0];
                    const Name = queryResult.Fname+" "+queryResult.Lname;
                    const prn = result[0].Prn;
                    resolve({displayName:Name,prn:prn});
                })
            })
            return response;
        }
        catch(err){
            return err;
        }
    }
    async getQuestion(subjectid){
        try{
            const response = await new Promise((resolve,reject) =>{
                let query ="select question,optionA,optionB,optionC,optionD,answer from questionbank where subjectid = ?;"
                connection.query(query,[subjectid],(error,result) =>{
                    if(error){
                        reject(new Error(error.sqlMessage));
                    }
                    if(result.length ===0){
                        reject({msg:"Empty QuestionBank"})
                    }
                    resolve(result);
                })
           
            });
           return response;
        }

        catch(err){
            return err;
        }
    }
    async getAnswer(subjectid){
        try{
            const response = await new Promise((resolve,reject) =>{
                let query = "select questionId,answerOption from questionbank where subjectid=?;";
                connection.query(query,[subjectid],(error,result) =>{
                    if(error){
                        reject(new Error(error.sqlMessage));
                    }
                    if(result.length ===0){
                        reject({msg:"Empty QuestionBank"})
                    }
                    resolve(result);
                })
            });
            return response;
        }
        catch(err){
            return err;
        }
    }
};
module.exports = Dbservice;