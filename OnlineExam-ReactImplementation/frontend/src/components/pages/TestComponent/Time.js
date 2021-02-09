import React ,{useEffect,useState}from 'react';
function getTime(){
    return new Date().toLocaleTimeString();
}

const Time = () => {
    const [time,setTime] = useState(0);
    useEffect(() =>{
        let myTime= setInterval(() =>{
           setTime(getTime());
         },1000)
         return () =>{
             clearInterval(myTime);
         }
     })
    return ( 
        <h5>{"Time: "+time}</h5>
     );
}
 
export default Time;