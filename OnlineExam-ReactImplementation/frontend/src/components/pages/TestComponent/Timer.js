import React from 'react'
import { useState, useEffect } from 'react';

const Timer = () => {
    const [hour, setHours ] =  useState(0);
    const [ minutes, setMinutes ] = useState(59);
    const [seconds, setSeconds ] =  useState(60);

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? "Times up"
            : <h5>TimeLeft:- {hour}h:{minutes}{"m"}:{seconds}{"s"}</h5> 
        }
        </div>
    )
}

export default Timer;