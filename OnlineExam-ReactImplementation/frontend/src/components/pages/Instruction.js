import React, {useState} from 'react'
import {useHistory,useLocation} from 'react-router-dom';
import ErrorNotice from '../auth/ErrorNotice';
export default function Instruction() {
    const [paperCode,setpaperCode] = useState();
    const questionPaper = {100:"cpp101",101:"ds101",102:"cj101",104:"mern101",103:"awp101"};
    const history = useHistory();
    const location = useLocation();
    const {subid,subname} = location.state;
    const [error,setError] = useState(false);
    const startExam = (e) =>{
        e.preventDefault();
        for(let [key,value] of Object.entries(questionPaper)){
            if(parseInt(key,10) === location.state.subid && value === paperCode){
                history.push({
                    pathname:"/test",
                    state:{subid,subname}
                });
            }
        }
        setError(true);
    }
    return (
        <div id="instruction">
            <h1> Basic Instructions for Online Examinations:</h1>
                <h3>General information:</h3>
            <h5>
            <p> 1. The examination will comprise of Objective type Multiple Choice Questions (MCQs).</p><br/>
            <p> 2. All questions are compulsory and each carries One mark.</p><br/>
            <p> 3. The exam will be 1 hour in duration.</p><br/>
            <p> 4. The Subjects or topics covered in the exam will be as per the Syllabus.</p><br/>
            <p> 5. There will be "NO NEGATIVE MARKING" for the wrong answers.</p><br/>
            <p> 6. The passcode for exam will provided just before the exam.</p><br/>
            </h5>
            <div className="ui right center labeled input">
                <label>Question Code :</label>
                <input type="text" placeholder="Enter password.." onChange={(e) =>setpaperCode(e.target.value)}/>
                <button onClick={startExam}className="ui button startexam teal">Start Exam</button>
                { error &&<ErrorNotice message={"Invalid Credentials"}/>}
            </div>
        </div>
    )
}
