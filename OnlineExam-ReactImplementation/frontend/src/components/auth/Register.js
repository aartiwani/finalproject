import React,{useState,useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from '../context/UserContext';
import 'semantic-ui-css/semantic.min.css';
import '../../style.css';
import {Link} from 'react-router-dom';
import Axios from "axios";
import ErrorNotice from './ErrorNotice';
export default function Register() {
    const [prn,setPrn] = useState();
    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [phone,setPhone] = useState();
    const [password,setPassword] = useState();
    const [passwordCheck,setCheck] = useState();

    const [error,setError] = useState("");
    const {userData,setUserData} = useContext(UserContext);
    const history = useHistory();
    const submit = async (e) =>{
        try{
            e.preventDefault();
            const newUser = {prn,fname,lname,phone,password,passwordCheck};
            const registerRes = await Axios.post("http://localhost:5000/users/register",
            newUser
            );
            const loginRes = await Axios.post("http://localhost:5000/users/login",
           {
               prn:prn,
               password:password
           }
            );
            setUserData({
                token:loginRes.data.token,
                user:{displayName:loginRes.data.displayName,prn:loginRes.data.prn}
            })
            localStorage.setItem("auth-token",loginRes.data.token)
            history.push("/profile");
        }
        catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        }
 
    }
    return (
        <div>
        <form className="ui form" onSubmit={submit}>
            <center>
                <h4>Register</h4>
                {error && <ErrorNotice message={error}/>}
                <Link to="/login"> Login ?</Link>
           </center>
            <div className="field">
                <label>PRN</label>
                <input type="text" name="prn" placeholder="University ID" onChange={(e) => setPrn(e.target.value)}/>
            </div>
            <div className="field">
                <label>First Name</label>
                <input type="text" name="fname" placeholder="First Name" onChange={(e) => setFname(e.target.value)}/>
            </div>
            <div className="field">
                <label>Last Name</label>
                <input type="text" name="pname" placeholder="Last Name" onChange={(e) => setLname(e.target.value)}/>
            </div>
            <div className="field">
                <label>Phone No</label>
                <input type="tel" name="phone" maxLength="10"  inputMode="numeric" placeholder="+91 Mobile Number" onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" name="password"  autoComplete="true" minLength="6" placeholder="Min 7 character long" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="field">
                <label>Confirm Password</label>
                <input type="password" name="passwordCheck" minLength="6" autoComplete="true" placeholder="Min 7 character long" onChange={(e) => setCheck(e.target.value)}/>
            </div>
            <button className="ui button green" type="submit">Register</button>
        </form>
        </div>
    )
}
