import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
const Pagination = ({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers = [];
    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    return (
        <nav className="mt-5">
            <ul className="pagination">
            {pageNumbers.map(number =>(
                <li key={number} className="page-item">
                    <Link to = {"test"} onClick={(e) =>{ e.preventDefault();  paginate(number)}} className="page-link text-dark md">
                        {number}
                    </Link>
                </li>
            ))}
            </ul>
        </nav>
    )
}
export default Pagination;
