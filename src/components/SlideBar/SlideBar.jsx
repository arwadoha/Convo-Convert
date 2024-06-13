import React from 'react';
import "./SlideBar.css";
import { FaStar ,FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom'; //new 

const SlideBar = () => {
  //new
  const navigate = useNavigate();
  const handleAllCallsClick = () => {
    navigate('/');
  };
//
  return (
    <div className='side-bar '>
      <button onClick={handleAllCallsClick}>All Calls</button>
      <button > Upload File</button>

      <hr/>
      
      
      <h4> Filters</h4>
      <ul className='filters'>
         <li> 
              <FaStar color="orange"/>
              <span>Starred</span>
         </li>
         <li> 
              <FaCheck color='green'/>
              <span>Solved</span>
         </li>
         <li> 
              <ImCross color='red' size={13}/>
              <span>Not Solved</span>
         </li>

      </ul>
    </div>
  );
};

export default SlideBar;