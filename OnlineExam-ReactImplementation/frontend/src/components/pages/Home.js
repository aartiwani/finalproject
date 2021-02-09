import React ,{useContext} from 'react'
import {useHistory} from "react-router-dom";
import UserContext from '../context/UserContext';
const  Home = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const Next =() =>{
        userData.user ? history.push("/profile"):history.push("/login");
    }
    return (
        <div id="homepage" className="ui fluid centered image">
            <h1 style={{color:"lightgreen" , textAlign:"center",paddingTop:"5rem"}}>Welcome to Online Examination Portal</h1>
            <button  onClick={Next}className="ui massive btn-go inverted teal button">Go to Exam</button>
        </div>
    )
};
export default Home;
