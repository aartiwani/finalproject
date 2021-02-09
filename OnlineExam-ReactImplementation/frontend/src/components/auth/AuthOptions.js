import React ,{useContext} from 'react'
import  {useHistory,Link} from "react-router-dom";
import UserContext from '../context/UserContext';
import '../../style.css'
export default function AuthOptions() {
    const {userData,setUserData} = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push("/register");
    const login =()=>history.push("/login");
    const logout = () =>{
                setUserData({
                    token:undefined,
                    user:undefined
                });
        history.push("/");
        localStorage.setItem("auth-token","")
    }
    return (
        <nav className="auth-options">
        {
            userData.user ? (
            <>
            <Link to="/profile" id="name"><span>{userData.user.displayName}</span></Link>
            <button onClick={logout}>Log out</button>
            </> ):(
            <>
            <button onClick={register}>Register</button>
            <button onClick={login}>Log In</button>
            </>
            )
        }
        </nav>
    )
}
