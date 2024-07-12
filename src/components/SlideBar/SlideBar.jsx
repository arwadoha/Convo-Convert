import React, { useState } from "react";
import "./SlideBar.css";
import { FaStar, FaCheck, FaRegStar } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom"; //new
import Modal from "../Modal/Modal.jsx";
import { toast } from "sonner";
import { CiStar } from "react-icons/ci";
import { useGlobal } from "../../assets/context/GlobalProvider.jsx";
import { GrClearOption } from "react-icons/gr";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const SlideBar = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  //new
  const navigate = useNavigate();

  const handleAllCallsClick = () => {
    navigate("/");
  };

  const { setFilter, filter, setCurrentPage } = useGlobal();

  function changeFilter(name, value) {
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setCurrentPage(1);
  }

  return (
    <>
      <div className="side-bar">
        <button onClick={handleAllCallsClick}>All Calls</button>
        <button onClick={() => setShowUploadModal(true)}>Upload Audio</button>

        <hr />

        <h4> Filters</h4>
        <ul className="filters">
          <li
            onClick={() => changeFilter("starred", true)}
            className={filter.starred == true ? "active" : ""}
          >
            <FaStar color="orange" />
            <span>Starred</span>
          </li>
          <li
            onClick={() => changeFilter("starred", false)}
            className={filter.starred == false ? "active" : ""}
          >
            <FaRegStar color="#181818" />
            <span>Not Starred</span>
          </li>
          <li
            onClick={() => changeFilter("status", "solved")}
            className={filter.status == "solved" ? "active" : ""}
          >
            <FaCheck color="green" />
            <span>Solved</span>
          </li>
          <li
            className={filter.status == "notsolved" ? "active" : ""}
            onClick={() => changeFilter("status", "notsolved")}
          >
            <ImCross color="red" size={13} />
            <span>Not Solved</span>
          </li>
          <li
            className="clear"
            onClick={() => {
              setFilter({
                status: "",
                starred: null,
              });
            }}
          >
            <GrClearOption color="red" size={13} />
            <span>Clear</span>
          </li>
        </ul>
      </div>
      <UploadModal open={showUploadModal} setOpen={setShowUploadModal} />
    </>
  );
};

export default SlideBar;

function UploadModal({ open, setOpen }) {
  const [inputs, setInputs] = useState({
    customerName: "",
    customerNumber: "",
    employeeName: "",
    audioFile: null,
    date: new Date(),
    keywords: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: value,
      };
    });
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    setInputs((prev) => {
      return {
        ...prev,
        audioFile: file,
      };
    });
  }

  const uploadCallMutation = useMutation({
    mutationFn: async ({ fileFormData, paramsData }) => {
      const { data } = await axios.post(
        `http://localhost:8080/upload`,
        fileFormData,
        {
          params: paramsData,
        }
      );
      return data;
    },
    onSuccess() {
      toast.success("Uploaded Successfully!");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.audioFile.type.startsWith("audio")) {
      toast.error("Not an audio file, please upload an audio file");
    }
    const fileFormData = new FormData();
    fileFormData.append("file", inputs.audioFile);

    const paramsData = {
      customerName: inputs.customerName,
      customerNumber: inputs.customerNumber,
      employeeName: inputs.employeeName,
      date: inputs.date,
      started: false,
      status: "notsolved",
      keywords: inputs.keywords,
    };

    uploadCallMutation.mutate({ fileFormData, paramsData });
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Upload Audio">
      <div className="upload-file-form-wrapper">
        <form onSubmit={handleSubmit}>
          <InputBox
            handleChange={handleChange}
            label="Customer Name"
            name="customerName"
            required
          />
          <InputBox
            handleChange={handleChange}
            label="Customer Number"
            name="customerNumber"
            required
          />
          <InputBox
            handleChange={handleChange}
            label="Employee Name"
            name="employeeName"
            required
          />
         <InputBox
            handleChange={handleChange}
            label="Date"
            name="date"
            required
          />
{/*
          <InputBox
            handleChange={(e) => {
              const value = new Date(e.target.value);
              setInputs((prev) => {
                return {
                  ...prev,
                  date: value,
                };
              });
            }}
            label="Date"
            name="date"
            type="date"
            required
          />
*/}
          <InputBox
            handleChange={handleChange}
            label="Keywords"
            name="keywords"
            required
          />

          {/* <label>
            Status:
            <select name="status" onChange={handleChange} required>
              <option value="solved">Solved</option>
              <option value="not_solved">Not Solved</option>
            </select>
          </label> */}

          <label>
            <p className="upload_btn">Upload Audio File</p>
            <input type="file" onChange={handleFileChange} accept="audio/*" />
          </label>

          <button type="submit">
            {uploadCallMutation.isPending ? "Loading..." : "Upload"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

function InputBox({ name, label, handleChange, ...props }) {
  return (
    <div className="input-box">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} onChange={handleChange} {...props} />
    </div>
  );
}
