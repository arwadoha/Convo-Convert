import React, { useState } from 'react';
import {useParams } from "react-router-dom"
import './MessageDetails.css'
import "../../components/Modal/Modal.jsx"
import { IoPersonCircle } from 'react-icons/io5';
import { fackMessages } from '../Home/Home'; 
import { FaStar, FaRegStar ,FaKey} from 'react-icons/fa';
import { IoIosCall } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useClickOutSide } from '../../hooks/useClickOutSide';
import { IoPricetags } from "react-icons/io5";
import Modal from "../../components/Modal/Modal.jsx"

const MessageDetails = () => {  
  const  {messageid}= useParams();
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState("");

  const message =fackMessages.find((msg)=> msg.id==Number(messageid));
  
  const keywords=[
     "Keyword 1"
     ,"Keyword 2"
     ,"Keyword 3"
     ,"Keyword 4"
     ,"Keyword 5"
     ,"Keyword 6"
     ,"Keyword 7"
     ,"Keyword 8"
     ,"Keyword 9"
     ,"Keyword 10"
     
  ];

  function formSubmit(e){
    e.preventDefault();
    console.log(keyword);
  }

  return (

    <div className='message-details'>
      <div className='top'>
        <div className='user-info'>

          <div className='info'>
            <IoPersonCircle size={35} color='gray' />
            <p>{message.CustomerName}</p>
          
          </div>
              <div className='callerNomber'>
                  <IoIosCall size={20} color='gray' className="call-icon"/>
                  <span>{message.CustomerNumber}</span>
              </div>

        </div>
        <div className="controls">
              <div className='date'>{message.date}</div>
              <div className='icons'>
                  {
                    message.isStared ? <FaStar color="orange"/> : <FaRegStar />
                  }
                  <input type="checkbox"/>
              </div>
        </div>

      </div>

      <div className='audio'>
              <div></div>
      </div>

      <div className='convert-buttons'>
                <button>Convert Audio to text</button>
                <button>NER</button>
      </div>

       <div className='converted-text'> 
              <h5> السلام عليكم ، وعليكم السلام معك عبادة صايل من شركة مدى تفضل استاذ معك محمد علي بدي اركب خط نت جديد رنيت قبل ثلاث ايام يعني يوم الخميس على الشركة ولهس ما اجيتوني السبت بتكون عندك صحيح استاذ تواصلت معنا باربعة تسعة وعفوا على الخلل الي صار استاذ بدي اطلب  منك تعطيني عنوانك كامل سيد محمد لو سمحت انا سكان مدينة رام الله المصايف عمارة المنصورة تمام استاذ كنت سعيد باتصالك ويعطيك العافيه الله يعافيك مع السلامة
              </h5>
       </div>

       <div className='keywords'> 
          <div className="controls">
                <h3>
                      <FaKey  size={20} color='orange'/> Keywords
                </h3>
                <button onClick={()=> setOpenModal(true)} >
                  <IoMdAdd size={20}/>
                  <span>Add New</span>
                </button>
          </div>
          <div className="wrapper">
                  {keywords.map((keyword,index)=>(
                      <Keyword key={index} keyword={keyword} /> 
                      
                  ))}
          </div>

       </div>
       <div className='tages'>
          
                <h3>
                      <IoPricetags   size={20} color='#1796a7'/> Tages
                </h3>
                <div className='tages-text'> 
                </div>
          
       </div>

       <Modal open={openModal} setOpen={setOpenModal} title="Add New Keyword">
           <form className='form_addKeyword' onSubmit={formSubmit}>
               <label htmlFor="keyword">
                    <span>Keyword</span> 
                    <input 
                        type="text" 
                        name='keyword' 
                        value={keyword}
                        onChange={e=> setKeyword(e.target.value)}
                    /> 
               </label>
               <div className="form_buttons">
                   <button type='submit'>Add</button>
                   <button type='button' onClick={()=> setOpenModal(false)}>Cancel</button>
               </div>
              
           </form>
       </Modal>

    </div>
  )
};

export default MessageDetails

const Keyword=({keyword})=>{
  const [openOptions,setOpenOptions] = useState(false);
  const ref =  useClickOutSide(()=> setOpenOptions(false));

  return(
    <div className='keyword' ref={ref}>
        <div className="content" onClick={() => setOpenOptions((prev) => !prev)}>
              <span> {keyword} </span>
              <MdOutlineKeyboardArrowUp/>
        </div>

        {openOptions == true?(
          <ul className="options"> 
              <li>
                   <MdEdit />
                   <span>Edit</span>
              </li>
              <li>
                   <MdDeleteOutline />
                   <span>Delete</span>
              </li>
          </ul>
        ) : null}

    </div>
  );
};