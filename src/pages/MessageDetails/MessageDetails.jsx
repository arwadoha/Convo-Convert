import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MessageDetails.css";
import "../../components/Modal/Modal.jsx";
import { IoPersonCircle } from "react-icons/io5";
import { FaStar, FaRegStar, FaKey } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { IoPricetags } from "react-icons/io5";
import Modal from "../../components/Modal/Modal.jsx";
import { GrStatusUnknown } from "react-icons/gr";
import { useQuery ,useMutation, useQueryClient } from "@tanstack/react-query";
import { MdEditNote } from "react-icons/md";
import axios from "axios";


const MessageDetails = () => {
  const { messageId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [openStatus, setOpenStatus] = useState(false);
  const [textType, setTextType] = useState(null); // 'text' || 'ner'
  
  //new
  const queryClient = useQueryClient();

  const labelRef = useClickOutSide(() => {
    setOpenStatus(false);
    setIsDropdownVisible(false); // Close both status and dropdown when clicking outside
  });


  //
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  function addNewFormSubmit(e) {
    e.preventDefault();
  }

  const {
    data: message,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["messages", messageId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/Calls/get?id=${messageId}`
      );
      // Parse nerText JSON string into an array
      return data;
    },
  });

  const test2 = [
    'أمثلة : <span class="ner_org" data-entity="ORG"> جامعة <span class="ner_gpe" data-entity="GPE"> بيرزيت </span> </span> وبالتعاون مع <span class="ner_org" data-entity="ORG"> مؤسسة <span class="ner_pers" data-entity="PERS"> ادوارد سعيد </span> </span> تنظم <span class="ner_event" data-entity="EVENT"> مهرجان للفن الشعبي </span> سيبدأ الساعة الرابعة عصرا ، <span class="ner_date" data-entity="DATE"> بتاريخ 16 / 5 / 2016 </span> .',
    '<span class="ner_org" data-entity="ORG"> بورصة <span class="ner_gpe" data-entity="GPE"> فلسطين </span> </span> تسجل ارتفاعا بنسبة <span class="ner_ordinal" data-entity="ORDINAL"> 0 </span> .',
    '<span class="ner_percent" data-entity="PERCENT"> 08 % </span> ، في جلسة بلغت قيمة تداولاتها أكثر من <span class="ner_money" data-entity="MONEY"> نصف مليون <span class="ner_currency" data-entity="CURRENCY"> دولار </span> </span> .',
    'إنتخاب <span class="ner_occ" data-entity="OCC"> رئيس <span class="ner_org" data-entity="ORG"> هيئة سوق رأس المال </span> </span> وتعديل <span class="ner_law" data-entity="LAW"> مادة ( <span class="ner_ordinal" data-entity="ORDINAL"> 4 ) </span> </span> في القانون الأساسي .',
    'مسيرة قرب <span class="ner_fac" data-entity="FAC"> باب العامود </span> والذي <span class="ner_quantity" data-entity="QUANTITY"> 700 <span class="ner_unit" data-entity="UNIT"> متر </span> </span> عن <span class="ner_fac" data-entity="FAC"> المسجد الأقصى </span> .',
  ];

  const test1=[
      "مده مرحبا هلا معك <span class=\"ner_pers\" data-entity=\"PERS\"> صدام </span> السلام عليكم وعليكم السلام ورحمه الله اهلا وسهلا تفضلي لين قبل شوي فتح خط نت معكم لموت موجود وشبكت وبس في عليك كلمه سر اها ولا يهمك عزيزتي نفس الرقم اللي بتحكي منه باسم مين عفوا ايش رايك عزيزتي باسمين الخفان خط التلفون باسم <span class=\"ner_pers\" data-entity=\"PERS\"> ابراهيم </span> النادي مش عارف وفتحه باسم <span class=\"ner_pers\" data-entity=\"PERS\"> جودي </span> <span class=\"ner_pers\" data-entity=\"PERS\"> ولا </span> <span class=\"ner_pers\" data-entity=\"PERS\"> ابراهيم </span> ما هي <span class=\"ner_pers\" data-entity=\"PERS\"> عبد السلام زيدان </span> اوكي تمام هلا الراوتر موجود عندك موجود ومشبوك وكاني مش عارف كانه فتح النت بس يعني باسورد الراوتر بدون برمجه ايش نوع الراوتر دينك نار وتردي لك ابيض ولا اسود اسود اسود هو من عندنا من مدائن يتبع تمدي لا كان من <span class=\"ner_gpe\" data-entity=\"GPE\"> اميركا </span> اوكي العبد برمجه برمجه احنا وياك عندك لابتوب او كمبيوتر عادي ادق عليه هلا عزيزي بك ايش بك ارسل لك ولا يرد ايش بيك هلا عزيزتي جهاز على السلك كله على الله يلا مش فاهم كيف يعني يعني تحطي سلك بين الراوتر باللابتوب ولاويلك افتح اللابتوب الكيس هو الافضل نحط في خليه يغير للصباح لانه لابتوب متنقل لا اشبك سلك احسن عشان هو صح انت ايش بك ارسل لك احسن المشكله مش ملكي سلك الايثرنت بدونه اوكي طيب هلا اسم الشبكه مبين عندك مازدا <span class=\"ner_date\" data-entity=\"DATE\"> 2015 </span> هيك اسم الشبكه هو هذا مبرمج الله هو اوكي مش مشكله بدون باسورد يعنى عليها ما تعرفيها الباسورد كيف نستعمل وكبه <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 20 </span> تبعهم اسمعك اذا ما ضبطت زبطه الباسورد تجربه من <span class=\"ner_occ\" data-entity=\"OCC\"> ضابط </span> اوكي امسك ايدك على البيك ولا عندك عزيزتي كم فتح الراوتر في عندك فتحات صغيره اسمها ليست صوتي من فتحه صغيره صاحي ما تيجي كبسه فتحه لا اوكي تمام شي شغله تدخل فيها في ابره او دبوس اوكي جبتي شغلات اوكي هلا صوتي دب وقتها وخليك بالسياحه على <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> نص </span> دقي علي لو سمحتي اوكي تكفى هلا هلا دوري على الشبكات في شبكه جديده بيانات عندك قصه عشق مشغوله عندي ولا شبكه دوري عليهم كمان مره متى <span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 1 </span> </span>","<span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 7 </span> <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 1700 </span> <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 95 </span> صحيه تماما في الاتصال عليها ايش بعطيكي تمام هلا افتحي صفحه انترنت فاضيه هذا راوتر اذا انت انا اوكي صفحه انترنت فاضيه بنت في البلكونه ولازم اللابتوب اللابتوب افضل عزيزتي صفحه <WEBSITE> جوجل </span> كلام كلام اوكي تمام يلا اللغه <span class=\"ner_language\" data-entity=\"LANGUAGE\"> الانجليزي </span> على الجهاز عشان اعطيك العنوان <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 192 </span> دوت <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 168 </span> دوت <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 1 </span> دوت <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 1 </span> مين اللي انت تطلع معك صفحه بطلب يوزر نيم وباسورد حول وجينا وباسورد ايش عساك اوكي <WEBSITE> جوجل كروم </span> انت <WEBSITE> جوجل كروم </span> تستعملي ولا ايش <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 192 </span> دوت <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 168 </span> دوت <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> واحد </span> بس واحد صحيح اسمعك لغه اكيد محول <span class=\"ner_language\" data-entity=\"LANGUAGE\"> انجليزي </span> <span class=\"ner_language\" data-entity=\"LANGUAGE\"> انجلش </span> <span class=\"ner_language\" data-entity=\"LANGUAGE\"> انجليزي </span> يلا كمان مره منفوخه عزيزتي بدون wwdc الصفحه اجرب على التلفون اغلبك خلاص يلا ما اتصل على الشبكه مدام اوكي افتح صفحه عادي يلا صفحه انترنت على اسوي ايفون ولا جلاكسي هذا تمام هلا نكتب صفحه انترنت عاديه نكتب كمان نفس اللي في <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 192 </span> دوت <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 168 </span> واحد بيت <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> واحد </span> استراحه ايوه تمام هلا كلمه ادمن اي بي ام اي ان نفس ريتي لو كانت فاتحه الصفحه خيبر اي بي ام اي ان سمول لتر رجل اعطاني فلوس هلا لونها ازرق هاي فيها لون ازرق اوكي يا عزيزتي كيف تكتبي ادمن ايدي صغيره كلهم لي كمان مره لا لعبه معك اوكي يدخل تمام يلا زين اريدك شمال صح اوكي هلا في عندك الخيار <span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> الثالث </span> هونت افتحي على بفتحته كونكشن نقشات اوكي اضغطي عليها بيفتح معك جدول بالنص اول خانه في جدول مده ايدي اسال تمام على ماذا يدل قياس الضغط مع بعض لو سمحت بتفتح معك صفحه <span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> ثانيه </span> ايش اضغط على ماذا ايديا sale .","in مع بعض تسريحه ضغطت عليها في صفحه <span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> ثانيه </span> مقسم الى اقسام القسم <span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> الثالث </span> هي بيبي ستينج اوكي تمام هلا في عندك هنا عزيزتي البيبي يوزر نيم ايش مكتوب فيها ايه اوكي امسحيها اغلبك بعدين هلا من كتب مكانها <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 22244 8186 </span> بعديها الاكل اللي تحت الايميل الي عليها دائره بعدها ام دي ام اي دي اي ما الاحرف الصغيره مالته لو سمحتي اسمعي البرنامج كامل اغلبك 244 8 1 8 6 8 <span class=\"ner_pers\" data-entity=\"PERS\"> ندى </span> حلا تحت الباسورد لو سمحت <span class=\"ner_percent\" data-entity=\"PERCENT\"> 100 </span> 900 يعني <span class=\"ner_date\" data-entity=\"DATE\"> 10 يناير </span> صفوا <span class=\"ner_percent\" data-entity=\"PERCENT\"> 90 </span> راحت البرق الكاتب التركي ميشن <span class=\"ner_percent\" data-entity=\"PERCENT\"> 100 % </span> صحيح اوكي تمام هلا عزيزتي اخر الصفحه على يدك اليمين في عندك سب تفضل اضغطي عليها مفروض انه يحملها لا خلصت تحميل لسان عليها مره واحده اكثر ضغطت عليها اكثر من مره مش مشكله حمل ولا لا عندي اسال دي اسال داوي داوي قلبك تتاكد انه كيف للتليفون كيف اللي اسال داخل في الراوتر باي فتحه داخل غرفه حال فتح القدير الجامع تبعث الانترنت اوكي انت اخر مره استعملت الانترنت تذكر راوتر انترنت نفس انت اشتغلت علي اخر مره <span class=\"ner_date\" data-entity=\"DATE\"> اليوم </span> قبل شوي اول مره يعني اول مره اكلم وصول يعني كيف التليفون اعرف من الفتحه اللي مكتوب فيها تحت ما كنت احتمال ان مدخل التلفون عندي خربان انت بس قولي لي ايش اسم الفتحه اللي حاطه فيها السلك من تحت مشكله العربيه جيفال تمام هلا الترم <span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> الثاني </span> وين موجود في البيت الاتصالات يعني التلفون عندك مشبوكين مع بعض نفس العلبه ما عندي تلفون بطاقه هذا التلفون فوق هلا انا بحكي معك على التليفون الارضي على الارض يعني في <span class=\"ner_gpe\" data-entity=\"GPE\"> مصر </span> يعني لطوف وعزيزتي لاسلكيه يعني هذا التليفون هلا عزيزتي التلفون بحكي معك منه هل انت شبكتي شكل انترنت على اوكي هلا عندك هل في تليفون ارضي مشبوك في البكيني ارضه طيب هذا <span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> السابع </span> مافي على تليفون ارضي ما في تلفون التلفون اللي فوق اللي فوق هذا انا جيت انا","مش فاهمه عليك انت بتحكي معي من التلفون الارضي هل امانه انت عند التليفون الارضي تليفون ارضي تتوكل فكيني انه اخرى خط نت التلفون الارضي فوق احنا بدنا اخرى طيب هذا انا بحكي عن هذا طبعا هذا الرقم هذا الرقم رقم التليفون مش بيكون مع بعض نفس العلبه مشبكين الشبكه الراوتر في الكهرباء <NORP> للكهرباء </span> يعني في <span class=\"ner_gpe\" data-entity=\"GPE\"> تبريز </span> لحاله بس تبع الايدي اسال بس يعني في عندك عزت هلا فلتر على <NORP> مخرجين </span> مخرج <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 17 </span> تلفون مستشفى اي شيء هذا التلفون في نفس الغرفه بتحكي منه يعني يعني مشغوله صح تبغى تعطيني بس رقم جوال او ثاني يكون معك هلا <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 0 </span> <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 5 </span> 9 <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 5 </span> 9 <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 5 </span> 9 <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 8 </span> 0 <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 5 </span> 9 5 9 8 5 0 3 0 5 0 <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 3 </span> كم يعني <span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 0 </span> 5 9 5 9 8 5 0 3 9 اوكي هلا اجيت اطلع على الفلتر في على <NORP> مخرجين المخرجين </span> نفس الحجم من واحده كبيره وواحده صغيره التلفون تمام اوكي بدي منك لوتري بشكل مباشر بدون هذا الفلتر تمام بدك جيب سلك تلفون لو سمحتي تمام يا هلا باجي لك على جوال يعطيك العافيه"
  ];

  const test= [
    "<span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> ثاني </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> اليوم </span>",
    "<span class=\"ner_ordinal\" data-entity=\"ORDINAL\"> ثاني </span>",
    "<span class=\"ner_percent\" data-entity=\"PERCENT\"> 100 % </span>",
    "<span class=\"ner_time\" data-entity=\"TIME\"> 24 ساعه </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> يومين </span>",
    "<span class=\"ner_time\" data-entity=\"TIME\"> الراوتر </span>",
    "<span class=\"ner_time\" data-entity=\"TIME\"> دقيقتين </span>",
    "<span class=\"ner_percent\" data-entity=\"PERCENT\"> 100 % </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> يومين </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> كل يوم </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> يومين </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> اربع </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> خمس ايام </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> كل يوم </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> اربعه </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> خمسه ايام </span>",
    "<span class=\"ner_time\" data-entity=\"TIME\"> دقيقه </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> اربع </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> يومين </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> كل </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> يومين </span>",
    "<span class=\"ner_time\" data-entity=\"TIME\"> دقيقه </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> شهرين </span>",
    "<span class=\"ner_cardinal\" data-entity=\"CARDINAL\"> 816 </span>",
    "<span class=\"ner_date\" data-entity=\"DATE\"> شهرين </span>"
]
  const test8=[
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> 100 </span>",
    "<span class=\\\"ner_pers\\\" data-entity=\\\"PERS\\\"> ماجد سويده </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> 32 </span>",
    "<span class=\\\"ner_date\\\" data-entity=\\\"DATE\\\"> اليوم </span>",
    "<span class=\\\"ner_time\\\" data-entity=\\\"TIME\\\"> حاليا </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> تسعه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> اثنين </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثلاثه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> تسعه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> اثنين </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثلاثه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> تسعه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> اثنين </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> سبعه ثلاثه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> سبعه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> سبعه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثلاثه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثمانيه </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> 5 </span>",
    "<span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> واحد </span>"
]
const test9=[
  "مرحبا وسمعك فضل العافيه الله يعافيك يا رب اهلين النت يعني حاليا <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> 100 </span> مستشهد لدرجه انها كانت ولا بالله ضعف خليك معي ثواني يلا رقم تحكي معي <span class=\\\"ner_pers\\\" data-entity=\\\"PERS\\\"> ماجد سويده </span> مزبوط <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> 32 </span> الحدث حد حد حد حد اوكي ولا يهمك هلا استنى علي بس <span class=\\\"ner_date\\\" data-entity=\\\"DATE\\\"> اليوم </span> شبكه انترنت <span class=\\\"ner_time\\\" data-entity=\\\"TIME\\\"> حاليا </span> صحيح صحيح مو بس اللي ما فيها السماعه بس لما ترفع السماعه التلفون بس اعطيني رقم موبايلك عليه صفر خمسه <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> تسعه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> اثنين </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثلاثه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> تسعه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> اثنين </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثلاثه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> تسعه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> اثنين </span> سبعه <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> سبعه ثلاثه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> سبعه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> سبعه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثلاثه </span> <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> ثمانيه </span> برجع لك عليه عزيزي المشترك يرجى تقييم المكالمه حيث <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> 5 </span> تعني ممتاز <span class=\\\"ner_cardinal\\\" data-entity=\\\"CARDINAL\\\"> واحد </span> شكرا لتفاعلكم نسعد بخدمتكم"
];


const updateKeywordsMutation = useMutation({
  mutationFn: async (keywords) => {
    const { data } = await axios.put(`http://localhost:8080/Calls/${messageId}`, {
      keywords,
    });
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["messages", messageId]);
  },
});

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error loading message details</h1>;
  }
  let keywords = [];
  let ner_tags = [];
  let nerText=[];
  if (isSuccess) {
    keywords = message.keywords
      .split(" ")
      .filter((item) => item !== "" && item !== " ");
      ner_tags = message.ner_tags;
      nerText = message.nerText;
  }

  const handleKeywordUpdate = async () => {
    await updateKeywordsMutation.mutateAsync(`${keywords.join(" ")} ${keyword}`);
    setKeyword("");
    setOpenModal(false);
  };

  console.log(message.nerText);
  console.log(message.nerTags);

  return (
    
    <div className="message-details">
      <div className="top">
        <div className="user-info">
          <div className="info">
            <IoPersonCircle size={35} color="gray" />
            <p>{message.customerName}</p>
          </div>
          <div className="callerNomber">
            <IoIosCall size={20} color="gray" className="call-icon" />
            <span>{message.phoneNumber}</span>
          </div>
        </div>
        <div className="controls">
          <div className="date">
            {new Date(message.date).toLocaleDateString()}
          </div>
          <div className="icons">
            {message.started ? <FaStar color="orange" /> : <FaRegStar />}
            <input
              type="checkbox"
              checked={message.status === "solved"}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="audio">
        <audio controls>
          
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" />
        </audio>
      </div>

      <div className="convert-buttons">
        <button onClick={() => setTextType("text")}>
          Convert Audio to text
        </button>
        <button onClick={() => setTextType("ner")}>NER</button>
      </div>

      <div className="converted-text">
        {textType == "text" ? (
          <div className="normal-text">{message.audioText}</div>
        ) : textType == "ner" ? (

          <div className="ner-text">
            {message.nerText};
  {/*
            {nerText?.map((item, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
  */}     
          </div>
        ) : null}
      </div>

      <div className="keywords">
        <div className="controls">
          <h3>
            <FaKey size={20} color="orange" /> Keywords
          </h3>
          <button onClick={() => setOpenModal(true)}>
            <MdEditNote   size={20} />
            <span>Add New</span>
          </button>
        </div>

        <div className="wrapper">
          {keywords.map((keyword, index) => (
            <Keyword key={index} keyword={keyword} />
          ))}
        </div>
      </div>

      <div className="status">
        <h3>
          <GrStatusUnknown size={20} color="gray" /> Status
        </h3>
        <div className="status_menu" ref={labelRef}>
          <div className="status_targger" onClick={toggleDropdown}>
            <p>Choose...</p>
          </div>

          {isDropdownVisible && (
            <div className="status_content">
              <p data-active={message.status === "solved"}>Solved</p>
              <p data-active={message.status === "notsolved"}>Not Solved</p>
            </div>
          )}
        </div>
      </div>

      <div className="ner-tags">
        <h3>
          <IoPricetags size={20} color="#1796a7" /> Tags
        </h3>
        <div className="tags">
          <div className="tags_wrapper">
          {message.nerTags?.map((item, index) => (
              
              <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
              
            ))}
          </div>
 {/*
          <div className="tags_options">
            <div className="option"> Add New Tag</div>
            <div className="option"> Clear All</div>
          </div>
  */}
        </div>
      </div>

      <Modal open={openModal} setOpen={setOpenModal} title="Add New Keyword">
        <form className="form_addKeyword" onSubmit={(e) => {
          e.preventDefault();
          handleKeywordUpdate();
        }}>
          <label htmlFor="keyword">
            <span>Keywords</span>
            <input
              type="text"
              name="keyword"
              value={message.keywords}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </label>
          <div className="form_buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={() => setOpenModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MessageDetails;

const Keyword = ({ keyword }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const ref = useClickOutSide(() => setOpenOptions(false));
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newKeyword, setNewKeyword] = useState(keyword);
  function editFormSubmit(e) {
    e.preventDefault();
    // TODO: send request
  }
  function handleDeleteKeyword() {
    // TODO: send request
  }
  return (
    <>
      <div className="keyword" ref={ref}>
        <div
          className="content"
          onClick={() => setOpenOptions((prev) => !prev)}
        >
          <span> {keyword} </span>
         <MdOutlineKeyboardArrowUp />  
        </div>

        {openOptions == true ? (
          <ul className="options">
            <li onClick={() => setOpenEditModal(true)}>
              <MdEdit />
              <span>Edit</span>
            </li>

            <li onClick={() => setOpenDeleteModal(true)}>
              <MdDeleteOutline />
              <span>Delete</span>
            </li>
          </ul>
        ) : null}

      </div>
{/* Edit Modal */}
      <Modal
        open={openEditModal}
        setOpen={setOpenEditModal}
        title="Edit Keyword"
      >
        <form className="form_addKeyword" onSubmit={editFormSubmit}>
          <label htmlFor="keyword">
            <span> Keyword </span>
            <input
              type="text"
              name="keyword"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
            />
          </label>
          <div className="form_buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={() => setOpenEditModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>


{/* Delete Modal 
      <Modal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete Keyword"
      >
        <div className="deleteKeyword">
          <h5>Are you sure you want to delete this keyword?</h5>
          <div className="form_buttons">
            <button type="submit" onClick={handleDeleteKeyword}>
              Yes
            </button>
            <button type="button" onClick={() => setOpenDeleteModal(false)}>
              No
            </button>
          </div>
        </div>
      </Modal>
*/}
    </>
  );
};