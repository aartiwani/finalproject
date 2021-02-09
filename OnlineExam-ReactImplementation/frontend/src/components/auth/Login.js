import React,{useState,useContext} from 'react'
import {Link ,useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorNotice from './ErrorNotice';
import Axios from 'axios';
export default function Login() {
    const [prn,setPrn] = useState();
    const [password,setPassword] = useState();

    const [error,setError] = useState("");
    const history = useHistory();
    const {userData,setUserData} = useContext(UserContext);
    
    const submit = async(e) =>{
        try{
            e.preventDefault();
            const loginUser  = {prn,password};
            const loginRes = await Axios.post("http://localhost:5000/users/login",loginUser);
            setUserData({
                token:loginRes.data.token,
                user:{displayName:loginRes.data.displayName,prn:loginRes.data.prn}
            })
            localStorage.setItem("auth-token",loginRes.data.token)
            history.push("/profile");
        }
        catch(err){
            err.response.data.msg && setError(err.response.data.msg );
        }
    };
    return (
    <div>
        <form className="ui form" onSubmit={submit}>
            <center>
                <h3>Login</h3>
                {error && <ErrorNotice message={error}/>}
                <Link to="/register"> Register ?</Link>
           </center>
            <div className="field">
                <label>PRN</label>
                <input type="text" name="prn" autoComplete="prn"placeholder="University ID" onChange={(e) => setPrn(e.target.value)}/>
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" minLength="7"  placeholder="Min 7 character long"/>
            </div>
            <button className="ui button green" type="submit">Log In</button>
        </form>
        </div>
    )
}
