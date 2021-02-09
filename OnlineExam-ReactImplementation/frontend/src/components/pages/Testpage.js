import React , {useContext,useState,useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter,Switch,Route, Router} from "react-router-dom";
import {useHistory,useLocation} from 'react-router-dom';
import UserContext from "../context/UserContext";
import Time from './TestComponent/Time';
import Timer from './TestComponent/Timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './TestComponent/Posts';
import Pagination from './TestComponent/Pagination';
import '../../style.css';
export default function Testpage() {
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [answer,setAnswer] = useState();
    const [postsPerPage,setPostsPerPage] = useState(5);
    const {userData,setUserData} = useContext(UserContext);
    const [message,setMessage] =useState(null);
    const location = useLocation();
    const {subid,subname} = location.state;
    useEffect(() =>{
        const fetchPosts = async () =>{
            let token = localStorage.getItem("auth-token")
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/test/${userData.user.prn}/${subid}`,{
                headers:{"x-auth-token":token}
            });
            const answerSet = await axios.get(`http://localhost:5000/test/${subid}`,{
                headers:{"x-auth-token":token}
            });
            if(answerSet.data){
                setAnswer(answerSet.data);
            }
            if(res.data.msg){
                setMessage(res.data.msg);
                setLoading(false);
            }
            else{
                setPosts(res.data);
                setLoading(false);
            }
        }
        fetchPosts();
    },[])
    const indexofLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexofLastPost -postsPerPage;
    const currentPosts =  posts.slice(0,posts.length);
    var time = new Date();
    var month = time.getMonth() + 1;
    // change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div>
            <header id="exambanner">
              <div>  
                <h5 className="text-font-bolder text-danger">Duration:- 1 hour </h5>
                <h6 className="text-center text-decoration-underline">Date: {time.getDate() +"-"+month+"-"+time.getFullYear()}</h6>
              </div>
            <div id="curTime">
                <Time/>
            </div>
            <div className="Timer text-dark"> 
                    <Timer/>
            </div>
            <div>
            <h3 className="text-primary text-center pt-2">CCEE Examination of {subname}</h3>
            </div>
        </header>
            <div className="container pt-2 mt-5">
                <Posts posts={currentPosts} answer={answer}currentPage={currentPage} loading={loading} message={message}/>
                {/* <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} /> */}
            </div>
        </div>
    )
}
