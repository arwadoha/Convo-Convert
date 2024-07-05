import React, { useState } from 'react'
import "./Home.css"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {HeaderContext} from '../../assets/context/HeaderProvider'
import {useHeader} from "../../hooks/useHeader"
export const fackMessages=[
  /*
    {
      id:1,
      employeeName: "NULL",
      CustomerNumber:"0",
      CustomerName:"Mohammed Ali",
      audioText: " ألو المرحبة. أهلين أهلا أستاذ. تحكي معك ألاء من شركة مدى لخدمات الإنترنت. أهلا. أهلا أستاذ. أحكي لكم السيدة رامي غزال تأخير أستاذة. أحدثكم عن مشكل الإنترنت صحيح فوصل كل قليل أفصل وبرجع تمام خليني أساعدك أستاذة عندك ساعة أمامك ما فاصل أستاذ أول ضع يدك اليم",
      date:"May1",
      isStared:false,
  },
  {
    id:2,
    employeeName: "NULL",
    CustomerNumber:"0",
    CustomerName:"Mohammed Ali",
    audioText: "و المرحبة. أهلا أهلا أهلا أستاذي. أعتذر منك فصلة المكالمة. هلا أستاذي سوف نرفع موضوع حضرتك للاتصالات سيبعث لك خط النفاذ لأنه عندك أستاذة قرأتها تطلع وتنزل بنفس الوقت. تمام لأنه ما أفتح عندك مجال الاتصالات فهذا اسمح لي أنت أي أستاذ. إذا برنامج من عنده أول ",
    date:"May5",
    isStared:false,
  },
  {
    id:3,
    employeeName: "NULL",
    CustomerNumber:"0",
    CustomerName:"Mohammed Ali",
    audioText: "بعد. مرحبا أسمع. تفضل. مرحبا يعطيك العافية. الله يعطيك رب حليم. الرقم أربعة ثمانية سبعة اثنين ثلاثة. كانت عندي مشكلة في الإنترنت بالاتصال شركة الاتصالات وحدث أن المودم في مشكلة. أعجبنا من جديد البرمجية الرقم اسم بيان النتشة. بيان محمد شكري النتشة نعم بيان",
    date:"May1",
    isStared:false,
  },
  {
    id:4,
    employeeName: "NULL",
    CustomerNumber:"0",
    CustomerName:"Mohammed Ali",
    audioText: " ببعد مرحبا تفضل أهلا مرحبا يا هلا عندي استفسار أنا عليك كيكا طابعة. طابعات. مقوي. برمجة. مقوي. مقوي. برمجة. هو منبر من ليس له علاقة في مضاعفة السرعة. يعني لا لا لا أنا عارف أنه ليس هو لكن أنا رفعت النتيجة فلما جاءت عندي على التلفزيون على التلفزيون شو اسمه",
    date:"Apr1",
    isStared:false,
  },
  {
    id:5,
    employeeName: "NULL",
    CustomerNumber:"0",
    CustomerName:"Mohammed Ali",
    audioText: "مدى. مرحبا شهاب معك. تفضل. يعطيك العافية. الله يعافيك. هلا من حوالي الساعة ساعة ونص كنت أحاول منكم ما كنش في رد يا أستاذ في مشكلة عامة في منطقتكم ومنطقة نابلس يعني فكل الناس ترن يعني خلص أنا في مشكلة يا سيدي قلت مع مبيعاتنا والله أحاول أتصل وبعثت رسالة عل",
    date:"Apr9",
    isStared:false,
  },
*/
  {
      id:1,
      employeeName: "Ali Mousa",
      CustomerNumber:"0599545466",
      CustomerName:"Mohammed Ali",
      audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
      date:"May5",
      isStared:true,
      status:"solved",
  },
  {
    id:2,
    employeeName: "Dalia Haj",
    CustomerNumber:"0597545432",
    CustomerName:"Mohammed Ali",
    audioText: "و المرحبة. أهلا أهلا أهلا أستاذي. أعتذر منك فصلة المكالمة. هلا أستاذي سوف نرفع موضوع حضرتك للاتصالات سيبعث لك خط النفاذ لأنه عندك أستاذة قرأتها تطلع وتنزل بنفس الوقت. تمام لأنه ما أفتح عندك مجال الاتصالات فهذا اسمح لي أنت أي أستاذ. إذا برنامج من عنده أول ",
    date:"May5",
    isStared:false,
    status:"notsolved",
  },
  {
    id:3,
    employeeName: "Talal Jack",
    CustomerNumber:"0598545478",
    CustomerName:"Mohammed Ali",
    audioText: "بعد. مرحبا أسمع. تفضل. مرحبا يعطيك العافية. الله يعطيك رب حليم. الرقم أربعة ثمانية سبعة اثنين ثلاثة. كانت عندي مشكلة في الإنترنت بالاتصال شركة الاتصالات وحدث أن المودم في مشكلة. أعجبنا من جديد البرمجية الرقم اسم بيان النتشة. بيان محمد شكري النتشة نعم بيان",
    date:"May1",
    isStared:true,
    status:"solved",
  },
  {
    id:4,
    employeeName: "Ali Mousa",
    CustomerNumber:"0594545488",
    CustomerName:"Mohammed Ali",
    audioText: " ببعد مرحبا تفضل أهلا مرحبا يا هلا عندي استفسار أنا عليك كيكا طابعة. طابعات. مقوي. برمجة. مقوي. مقوي. برمجة. هو منبر من ليس له علاقة في مضاعفة السرعة. يعني لا لا لا أنا عارف أنه ليس هو لكن أنا رفعت النتيجة فلما جاءت عندي على التلفزيون على التلفزيون شو اسمه",
    date:"May1",
    isStared:false,
    status:"notsolved",
  },
  {
    id:5,
    employeeName: "Talal Jack",
    CustomerNumber:"0594545498",
    CustomerName:"Mohammed Ali",
    audioText: "مدى. مرحبا شهاب معك. تفضل. يعطيك العافية. الله يعافيك. هلا من حوالي الساعة ساعة ونص كنت أحاول منكم ما كنش في رد يا أستاذ في مشكلة عامة في منطقتكم ومنطقة نابلس يعني فكل الناس ترن يعني خلص أنا في مشكلة يا سيدي قلت مع مبيعاتنا والله أحاول أتصل وبعثت رسالة عل",
    date:"Apr9",
    isStared:true,
    status:"solved",
  },
  {
    id:6,
    employeeName: "Ali Mousa",
    CustomerNumber:"0599345421",
    CustomerName:"Mohammed Ali",
    audioText: "  سلام عليكم ستاذ تفضل  كيف بقدر اساعدك مرحبا وعليكم السلام النت عندي قاطع من اسبوع ",
    date:"Apr9",
    isStared:false ,
    status:"notsolved",
  },
  {
    id:7,
    employeeName: "Talal Jack",
    CustomerNumber:"0599545466",
    CustomerName:"Mohammed Ali",
    audioText: "   الو تفضل استاز  كيف بقدر اساعد حضرتك كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Apr2",
    isStared:false,
    status:"solved",
  },
  {
    id:8,

    employeeName: "Dalia Haj",
    CustomerNumber:"0599545466",
    CustomerName:"Mohammed Ali",
    audioText: " ألو المرحبة. أهلين أهلا أستاذ. تحكي معك ألاء من شركة مدى لخدمات الإنترنت. أهلا. أهلا أستاذ. أحكي لكم السيدة رامي غزال تأخير أستاذة. أحدثكم عن مشكل الإنترنت صحيح فوصل كل قليل أفصل وبرجع تمام خليني أساعدك أستاذة عندك ساعة أمامك ما فاصل أستاذ أول ضع يدك اليم",
    date:"Apr1",
    isStared:true,
    status:"notsolved",
  },

  {
    id:9,
    employeeName: "Arwa Doha",
    CustomerNumber:"05923545421",
    audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Feb1",
    isStared:false,
  },
  /*
  {
    id:10,
    employeeName: "Arwa Doha",
    CustomerNumber:"0599545466",
    audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Feb1",
    isStared:true,
  },
  {
    id:11,
    employeeName: "Arwa Doha",
    CustomerNumber:"0599545466",
    audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Feb1",
    isStared:true,
  },
  {
    id:12,
    employeeName: "Arwa Doha",
    CustomerNumber:"0599545466",
    audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Feb1",
    isStared:true,
  },
  {
    id:13,
    employeeName: "Arwa Doha",
    CustomerNumber:"0599545466",
    audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Feb1",
    isStared:false,
  },
  {
    id:14,
    employeeName: "Arwa Doha",
    CustomerNumber:"0599545466",
    audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Feb1",
    isStared:true,
  },
  {
    id:15,
    employeeName: "Arwa Doha",
    CustomerNumber:"0599545466",
    audioText: "  الو الو مرحبا ستاذ كيف بقدر اساعدك مرحبا النت عندي قاطع من اسبوع ",
    date:"Feb1",
    isStared:false,
  },
*/
];


 const Home = () => {
  const Navigate =useNavigate();

  const {open: openAdvanceSearch,setOpen: setOpenAdvanceSearch}=useHeader();
  
  const [open,setOpen]=useState({
    date:false,
    employee:false,
    customer:false,
    tags: false,
  })

  function handleOpenOption(option){
    Object.keys(open).map(key => {
      if (option !== key && open[key]===true){
        setOpen((prev)=>({
           ...prev,
           [key]:false,
        }));
      }
    })
    setOpen((prev)=>({
      ...prev,
      [option]:!prev[option],
    }));
  }

  return  (
    <div className= "home-page" >
      <div className="top-section">
        <div className="addvance-search" data-show={openAdvanceSearch}>
             <p>Advance Search</p>
             <div className='date'>
                <div className='trigger' onClick={()=>handleOpenOption("date")}>
                    Date
                 </div> 
                 {open.date &&(
                      <ul>
                          <li>Today</li>
                          <li>Last Week</li>
                          <li>Last Month</li>
                          <li>Last Year</li>
                          <li>Custom Range</li>
                      </ul>
                 )}
               </div>

               <div className='employee'>
                  <div className='trigger' onClick={()=>handleOpenOption("employee")}>
                      Employee
                  </div> 
                  {open.employee &&(
                        <ul>
                            <li className='employee-search'>
                              <input type='text' placeholder='Search employee by name'/>
                            </li>
                            <li>Today</li>
                            <li>Last Week</li>
                            <li>Last Month</li>
                            <li>Last Year</li>
                            <li>Custom Range</li>
                        </ul>
                  )}



              </div>

              <div className='customer'>
                  <div className='trigger' onClick={()=>handleOpenOption("customer")}>
                         Customer  
                  </div> 
                  {open.customer &&(
                        <ul>
                            <li className='customer-search'>
                              <input type='text' placeholder='Search customer by name'/>
                            </li>
                            <li>Today</li>
                            <li>Last Week</li>
                            <li>Last Month</li>
                            <li>Last Year</li>
                            <li>Custom Range</li>
                        </ul>
                  )}



              </div>
              
        </div>
        <div className='pagination'>
            <div className="info">
                  <span>150</span>
                  <span>of</span>
                  <span>1,426</span>
              </div>
              <div className="arrows">
                  < MdOutlineKeyboardArrowLeft size={20}/>
                  < MdOutlineKeyboardArrowRight size={20}/>
              </div>
        </div>

      </div>

      <div className="messages">
         {
            fackMessages.map((message) =>{
              return (
                    <div key ={message.id} className="message">
                    <Link to={`/message-details/${message.id}`}
                        className="employee">
                        {message.employeeName}
                    </Link> 

                    <Link to={`/message-details/${message.id}`}
                        className="customer"> 
                        <p>{message.CustomerNumber}</p>
                        <p className='audio-text' title={message.audioText}>
                            {message.audioText}
                        </p>
                    </Link>

                    <div className="controls">
                          <p>{message.date}</p>
                          <div className='icons'>
                            {
                              message.isStared ? <FaStar color="orange"/> : <FaRegStar />
                            }
                               
                            <input type="checkbox"/>
                          </div>
                    </div>

                </div>
              )
            })
        }

      </div>

    </div>
  ); 
};


export default Home;