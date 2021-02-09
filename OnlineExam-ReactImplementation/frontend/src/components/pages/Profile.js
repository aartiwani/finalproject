import React,{useContext} from 'react'
import {withRouter} from 'react-router-dom';
import UserContext from '../context/UserContext';
import ExamPage from './ExamTopic';
function Profile(props) {
    const {userData,setUserData} = useContext(UserContext);
    return (
        <div>
            <h3 id="welcome-msg"> Welcome {userData.user.prn} Your Have Been Authenticated </h3>
            <ExamPage subname={"OOPS in C++"} subid={100}/> 
            <ExamPage subname={"Data Structure using C++"} subid={101}/> 
            <ExamPage subname={"Core Java"} subid={102}/> 
            <ExamPage subname={"Advance Web Programming"} subid={103}/> 
        </div>
    )
}

export default Profile;
