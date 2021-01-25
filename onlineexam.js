const express=require('express');
const app=express();

var session=require('express-session');

app.use(session({secret:'loginsession', 
                 saveUninitialized:false,
				 resave:false,
				 cookie: {secure:false}
				 }));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const cors=require('cors');
app.use(cors());

//app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'onlineexam',
	port:3306
});
console.log("Connection is established");

app.get('/logout',function(req,res)
{
	 let ro={login:0,message:"Logged Out Successfully"}; 
	   req.session.user="";	  
	   req.session.destroy();
	res.send(ro);	
});

//http://localhost:8081/studlogin?username=1230&password=3456
app.get('/studlogin',function(req,res){
	let ro={login:0,message:"Invalid Username and password",username:""};    //object to be returned to client
    const username =req.query.username;         //userid-login details from angular
    const password=req.query.password;  //password-login details from angular
    //console.log(username+" "+password);
                        
    if (username==0 || password.trim()=="")
     {	 ro.login=0;
    	 ro.message="userneame and/or password is blank";
		
		   res.send(ro);
   }
	else
	{
        //const sql='select prnno,password from user where prnno=? and password=?';
		const sql='select u.prnno,u.password,s.sfname,s.slname from user u,student s where u.prnno=s.prnno and u.prnno=? and u.password=?';
        const fillargs=[username,password.trim()];
        connection.query(sql,fillargs,function(err,sel,fields)
        {
          if(err)
	       {
		     console.log("Error in select statement "+err);		
           }
          else 
         {		 
	     //If username and password mathes with those in database then put uesr in session
		   if(sel.length==0)
			 {
	    	 	 ro.login=0;
		    	 ro.message="Invalid userneame and password";			 
		     }	
		   else
		   if(username == sel[0].prnno && password.trim() == sel[0].password)
		   {			
			req.session.data={"user":username};//writing into session
			ro.login=1;
			ro.message="Login successful";
			ro.username= sel[0].sfname+"_"+sel[0].slname;
		   }			 
       }	 
	 res.send(ro);
    }); 
 }
});


app.get('/sselect', function (req, res) {
	//What is to be returned to clientInformation
	let sendtoclient={status:0,content:[]};
	
	
	//what is to be the input from client
	let inpfromclient=req.query.p1;
	console.log("reading params"+inpfromclient);
	
	//start Database logic
	const prnno=inpfromclient;
	const sql='select prnno,sfname,slname,sphone,examdate,password,subid from student where prnno=?';  // prnno sfname  slname  sphone      examdate    password   subid 

	const fillargs=[prnno];
	connection.query(sql,fillargs,function(err,rows){
		if(err)
		{
			console.log("Error occured due to incorrect where clause");
		}
		else
		{
		    console.log("rows selected: "+rows.length);
			sendtoclient.status=1;
			sendtoclient.content=rows;
		
		}
		res.send(sendtoclient);
	});
		//End Database logic		
});
app.get('/isuserloggedin',function(req,res){
	 const username =req.query.username; 
	 let ro={loggedin:"false"};
	if(req.session.data.user==username)
	{
		ro.loggedin=true;
	}
	
	res.send(ro);
	
});

app.post('/insert', function (req, res) { 	

let sendtoclient={status:0,message:"Record not inserted"};
const prnno=req.body.prnno;    //1201;
const sfname=req.body.sfname;    //'Arpita';
const slname=req.body.slname;//'Khanna';
const sphone=req.body.sphone;           //234657864;
const examdate= req.body.examdate;          //'2020/04/12';
const password=  req.body.password;                 //'arpita@01';
const subid=req.body.subid;//02;


const sql='insert into student values (?,?,?,?,str_to_date(?,"%m/%d/%Y"),?,?)'
const fillargs=[prnno,sfname,slname,sphone,examdate,password,subid];  
connection.query(sql,fillargs,function(err,rows)
{
	if(err)
	{
		sendtoclient.message="Student with this PRN No has already Registered!"+err;
		sendtoclient.status=0;
		console.log("Primary key violated"+err);
	}
else 
{
	console.log("rows="+rows.affectedRows);
	if(rows.affectedRows>0)
	{
		sendtoclient.status=1;
		//sendtoclient.message=rows.affectedRows+"inserted";
		sendtoclient.message="Great! you registered for exam on: "+examdate.toString('dd-MM-YYYY')+".";  //date.toString('YYYY-MM-dd'); '
	}
	//console.log("This object will be sent to jquery/Angular"+JSON.stringify(ro));
}	
	res.send(sendtoclient);
	
});

});
app.listen(8081, function () {
   console.log("server listening at port 8081...");});