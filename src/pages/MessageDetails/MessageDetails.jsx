import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MessageDetails.css";
import "../../components/Modal/Modal.jsx";
import { IoPersonCircle } from "react-icons/io5";
import { FaStar, FaRegStar, FaKey } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { IoPricetags } from "react-icons/io5";
import Modal from "../../components/Modal/Modal.jsx";
import { GrStatusUnknown } from "react-icons/gr";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdEditNote } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";

const MessageDetails = () => {
  const { messageId } = useParams();

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

  const [openModal, setOpenModal] = useState(false);
  const [updatedKeywords, setUpdatedKeywords] = useState("");
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

  const updateKeywordsMutation = useMutation({
    mutationFn: async (keywords) => {
      const { data } = await axios.put(
        `http://localhost:8080/Calls/${messageId}`,
        {
          keywords,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", messageId]);
      //   setKeyword("");
      setOpenModal(false);
      toast.success("Updated Successfully!");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus) => {
      const { data } = await axios.put(
        `http://localhost:8080/Calls/Status/${messageId}`,
        {
          status: newStatus,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", messageId]);
      toast.success("Updated Successfully!");
    },
  });
  const updateStarredMutation = useMutation({
    mutationFn: async (value) => {
      const { data } = await axios.put(
        `http://localhost:8080/Calls/Started/${messageId}`,
        {
          started: value,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", messageId]);
      toast.success("Updated Successfully!");
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error loading message details</h1>;
  }
  let keywords = [];

  if (isSuccess) {
    keywords = message.keywords
      .split(" ")
      .filter((item) => item !== "" && item !== " ");
  }

  const testNerText = [
    'أمثلة : <span class="ner_org" data-entity="ORG"> جامعة <span class="ner_gpe" data-entity="GPE"> بيرزيت </span> </span> وبالتعاون مع <span class="ner_org" data-entity="ORG"> مؤسسة <span class="ner_pers" data-entity="PERS"> ادوارد سعيد </span> </span> تنظم <span class="ner_event" data-entity="EVENT"> مهرجان للفن الشعبي </span> سيبدأ الساعة الرابعة عصرا ، <span class="ner_date" data-entity="DATE"> بتاريخ 16 / 5 / 2016 </span> .',
    '<span class="ner_org" data-entity="ORG"> بورصة <span class="ner_gpe" data-entity="GPE"> فلسطين </span> </span> تسجل ارتفاعا بنسبة <span class="ner_ordinal" data-entity="ORDINAL"> 0 </span> .',
    '<span class="ner_percent" data-entity="PERCENT"> 08 % </span> ، في جلسة بلغت قيمة تداولاتها أكثر من <span class="ner_money" data-entity="MONEY"> نصف مليون <span class="ner_currency" data-entity="CURRENCY"> دولار </span> </span> .',
    'إنتخاب <span class="ner_occ" data-entity="OCC"> رئيس <span class="ner_org" data-entity="ORG"> هيئة سوق رأس المال </span> </span> وتعديل <span class="ner_law" data-entity="LAW"> مادة ( <span class="ner_ordinal" data-entity="ORDINAL"> 4 ) </span> </span> في القانون الأساسي .',
    'مسيرة قرب <span class="ner_fac" data-entity="FAC"> باب العامود </span> والذي <span class="ner_quantity" data-entity="QUANTITY"> 700 <span class="ner_unit" data-entity="UNIT"> متر </span> </span> عن <span class="ner_fac" data-entity="FAC"> المسجد الأقصى </span> .',
  ];

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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                updateStarredMutation.mutate(!message.started);
              }}
            >
              {message.started ? <FaStar color="orange" /> : <FaRegStar />}
            </div>
            <input
              type="checkbox"
              defaultChecked={message.status === "solved"}
              onChange={(e) => {
                const { checked } = e.target;
                updateStatusMutation.mutate(checked ? "solved" : "notsolved");
              }}
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

      {/* Converted Text */}
      <div className="converted-text">
        {textType === "text" ? (
          <div className="normal-text">{message.audioText}</div>
        ) : textType === "ner" ? (
          <div className="ner-text">
            {/*TODO: When response got as an array, replace (testNerText) => (message.nerText) */}
            {testNerText?.map((item, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="keywords">
        <div className="controls">
          <h3>
            <FaKey size={20} color="orange" /> Keywords
          </h3>
          <button onClick={() => setOpenModal(true)}>
            <MdEditNote size={20} />
            <span>Edit Keywords</span>
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
          <div
            className="status_targger"
            onClick={toggleDropdown}
            style={{
              borderColor: message.status == "solved" ? "green" : "red",
            }}
          >
            <p>{message.status}</p>
          </div>

          {isDropdownVisible && (
            <div className="status_content">
              <p
                data-active={message.status === "solved"}
                onClick={() => {
                  updateStatusMutation.mutate("solved");
                }}
              >
                Solved
              </p>
              <p
                data-active={message.status === "notsolved"}
                onClick={() => {
                  updateStatusMutation.mutate("notsolved");
                }}
              >
                Not Solved
              </p>
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

      <Modal open={openModal} setOpen={setOpenModal} title="Edit Keywords">
        <form
          className="form_addKeyword"
          onSubmit={(e) => {
            e.preventDefault();
            updateKeywordsMutation.mutate(updatedKeywords);
          }}
        >
          <label htmlFor="keyword">
            <span>Keywords</span>
            <input
              type="text"
              name="keyword"
              defaultValue={message.keywords}
              onChange={(e) => {
                setUpdatedKeywords(e.target.value);
              }}
            />
          </label>
          <div className="form_buttons">
            <button type="submit">Edit</button>
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
  return (
    <div className="keyword">
      <div className="content">
        <span> {keyword} </span>
      </div>
    </div>
  );
};
