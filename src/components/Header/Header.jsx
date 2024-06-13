import React from 'react';
import "./Header.css";
import logo from "../../../public/assets/logo.png"
import { GrSearch } from "react-icons/gr";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { IoPersonCircle } from 'react-icons/io5';
const Header = () => {
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
                    <input type="text" placeholder="Search..." />
                    <GiSettingsKnobs className='icon' size={22}/>
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