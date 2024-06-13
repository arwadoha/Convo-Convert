import React from 'react';
import "./Root.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import SlideBar from '../SlideBar/SlideBar';

const Root = () => {
  return (
    <div className="root-layout">
        <Header/>
        <main>
            <SlideBar/>
            <div className='outlet  '>
               <Outlet/>
            </div> 
        </main>
        <Footer />
        
    </div>


    
  );
};

export default Root;