import React, { useState } from 'react';
import "./Header.css";
import logo from "../../../public/assets/logo.png"
import { GrSearch } from "react-icons/gr";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { IoPersonCircle } from 'react-icons/io5';
import Modal from "../Modal/Modal";
import { useHeader } from '../../hooks/useHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobal } from "../../assets/context/GlobalProvider";

const Header = () => {

  //const{open,setOpen}= useState(false);
  const {open,setOpen}=useHeader();
  const navigate =useNavigate();

  //new 

  const { search, setSearch } = useGlobal();

  const toggleModalAndNavigate = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };

  const handleSearch = async (e) => {
    setSearch({ ...search, query: e.target.value }); 
  };

  //
  
  return (
    <header >
       <div className='header-wrapper'>
          <div className='logo'>
            <img src={logo} alt='logo' />
            <h2>ConvoConvert</h2>
          </div>

          < div className='search'>
              <div className="serch-wrapper">
                    <GrSearch className='icon' size={22} color='gray'/>
                    <input
                        type="text" 
                        placeholder ="Search..." 
                        value={search.query}
                        onChange={handleSearch} 
                    />
                    <GiSettingsKnobs className='icon' 
                         size={22} 
                         color='gray' 
                         //
                         onClick={toggleModalAndNavigate}
                         data-acive={open}
                    />
              </div>
          </div>


          <div className="person">
                <IoPersonCircle size={40} color='gray' />
          </div>

       </div>
    </header>
  )
}

export default Header