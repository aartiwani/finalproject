import React,{useState,useRef,useEffect,useContext} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import Footer from '../../layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = ({posts,answer,currentPage,loading,message}) => {

    const [response,setResponse] = useState([]);
    const [visited,setVisited]=useState([]);
    const history = useHistory();
    const location = useLocation();
    const {subid,subname} = location.state;
    var maxmarks = posts.length;
    var res =[];
    const clearSelection = (index) =>{
        var elements = document.getElementsByName(index);
        for(let i=0; i<elements.length;i++){
            elements[i].checked = false;
        }
        let resIndex = response.findIndex(item => item.id === index);
        response.splice(resIndex,1);
        let visitedIndex = visited.indexOf(index);
        visited.splice(visitedIndex,1);
        setVisited(visited);
        setResponse(response);
    }
    function getResult() {
        let result =0;
        let temp = result;
            for(let i=0;i<response.length;i++){
              for(let j=0;j<answer.length;j++){
                  if(response[i].id === answer[j].questionId){
                      if(response[i].value === answer[j].answerOption){
                        result=result+1;
                        temp = result;
                      }
                      else{
                          result = temp;
                      }
                      break;
                  }
              }
            }
            history.push({
                pathname:"/result",
                state:{maxmarks,subname,result}
            });
    }
    const handleResponse = (e,index) =>{
            // localStorage.setItem(index,e.target.value);
           
            if(!visited.includes(index)){
                setResponse([...response,{id:index,value:e.target.value}])
                setVisited([ ...visited,index]);
            }
            if(visited.includes(index)){
                res = response;
                let resIndex = response.findIndex(item => item.id === index);
                res[resIndex].value = e.target.value;
                setResponse(res);
                // console.log(response);
            }
    }
    // console.log(response);
    if(loading){
        return <h2>Loading</h2>
    }
    if(message){
        return <h2>{message}</h2>
    }
    return ( 
        <div>
            {posts.map((post,index) =>(
                <div key={index}>
                <h4>
                    {index+1}.{" "}{post.question}
                </h4>
                <div className="form-check">
                     <input className="form-check-input mb-5" type="radio" name={index+1} id="optionA"  onChange={(e) =>handleResponse(e,index+1)} value="A" />
                        <label className="form-check-label col-6" forhtml="A">
                        <h4>a) {post.optionA}</h4>
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input mb-5" type="radio" name={index+1} id="optionB"   onChange={(e) =>handleResponse(e,index+1)}  value="B" />
               
                      <label className="form-check-label col-6" forhtml="B">
                      <h4>b) {post.optionB} </h4>
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input mb-5" type="radio" name={index+1} id="optionC"   onChange={(e) =>handleResponse(e,index+1)}  value="C" />
                      <label className="form-check-label col-6" forhtml="C">
                       <h4>c) {post.optionC}</h4> 
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input mb-5"  type="radio" name={index+1} id="optionD"  onChange={(e) =>handleResponse(e,index+1)} value="D" />
                      <label className="form-check-label col-6" forhtml="D">
                        <h4>d) {post.optionD}</h4>
                    </label>
                </div>
                <button className="mt-5" onClick={() =>clearSelection(index+1)}>Clear Selection</button>
                <h4>-----------------------------------------------------------------------------</h4>
            </div>
            ))}
                <div className="mt-5 ml-5">
                    <button className="btn-primary" onClick={getResult}> Submit Exam </button>
                </div>
                <div>
                   
                </div>
        </div>
    )
};
 
export default Posts;