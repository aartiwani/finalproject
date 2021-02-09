import React ,{useContext} from 'react'
import {useLocation} from 'react-router-dom';
import UserContext from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
const Result = () => {
    const location = useLocation();
    const {userData,setUserData} = useContext(UserContext);
    const {maxmarks,result}=location.state;
    let percentage = (result/maxmarks)*100;
    percentage = parseFloat(percentage.toFixed(2));
    return ( 
        <div className="result-center">
            <h4>
                Prn : {userData.user.prn}
            </h4>
            <h4>
                Student Name : {userData.user.displayName}
            </h4>
            <h4>   Max Marks : {maxmarks}</h4>
            <h4>  Marks Obtained :{result}</h4>
            <h4>  Percentage :{percentage+" %"}</h4>
               
             {percentage > 33.00?"Congratulation You have passed":" Have to face Retest"}
        </div>
     );
}
 
export default Result;