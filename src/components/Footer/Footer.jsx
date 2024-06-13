import React from 'react'
import "./Footer.css";
import "../../../public/assets/logo.png"
const Footer = () => {
  return (
    <footer>
          <div className='logo'>
            <img src={"/assets/logo.png"} alt='logo' />
            <h2>ConvoConvert</h2>
          </div>

          <div className='copy'>
              <p>© 2024 ConvoConvert. All rights reserved.</p>
          </div>


    </footer>
  )
}

export default Footer