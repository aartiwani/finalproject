import React from 'react'
import {useHistory} from 'react-router-dom';
export default function ExamTopic(prop) {
    const history = useHistory();
    const handleClick = () => history.push({
        pathname:"/instruction",
        state:{subid:prop.subid,subname:prop.subname}
    });
    return (
        <div  id="examtopic" className="ui card">
         <div className="content">
            <div className="header">{prop.subname}</div>
        </div>
        <div className="extra content">
            <button onClick={handleClick}className="ui button teal">Give Exam</button>
        </div>
        </div>
    )
}
