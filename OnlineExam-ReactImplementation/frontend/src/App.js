import React from 'react';
import {useState,useEffect} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Instruction from './components/pages/Instruction';
import ProtectedRoute from "./components/context/ProtectedRoute";
import Profile from './components/pages/Profile';
import Testpage from './components/pages/Testpage';
import UserContext from "./components/context/UserContext";
import Result from "./components/pages/Result";
import Axios from 'axios';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
export default function App() {
    const [isAuth,setAuth] = useState(false);
    const [userData,setUserData] = useState({
        token:undefined,
        user:undefined
    });
    useEffect(() =>{
            const checkLoggedIn = async() =>{
                let token = localStorage.getItem('auth-token');
                if(token===null){
                    localStorage.setItem("auth-token","");
                    token="";
                }
                const tokenRes = await Axios.post(
                "http://localhost:5000/users/tokenIsValid",
                null,
                {headers:{"x-auth-token":token}}
                );
                if(tokenRes.data){
                    const userRes = await Axios.get("http://localhost:5000/users/loggedIn",{
                    headers: {"x-auth-token":token}
                });
                setUserData({
                    token:token,
                   user:{displayName:userRes.data.displayName,prn:userRes.data.prn}
                });
                setAuth(true);
            }
        }
            checkLoggedIn();
    },[]);
        return (
            <BrowserRouter>
                <UserContext.Provider value={{userData,setUserData}}>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <ProtectedRoute path="/profile" component={Profile} isAuth={isAuth}/>
                    <ProtectedRoute exact path="/instruction" component={Instruction} isAuth={isAuth}/>
                    <ProtectedRoute exact path="/test" component={Testpage} isAuth={isAuth}/>
                    <ProtectedRoute exact path="/result" component={Result} isAuth={isAuth}/>
                    <ProtectedRoute path="/test/:id" component={Testpage} isAuth={isAuth}/>
                </Switch>

                {/* <Footer/> */}
                </UserContext.Provider>
            </BrowserRouter>
        )
}
