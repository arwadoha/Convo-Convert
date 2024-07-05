import React, { useState } from "react";
import "./SlideBar.css";
import { FaStar, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom"; //new
import Modal from "../Modal/Modal.jsx";
import { toast } from "sonner";

const SlideBar = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    //new
    const navigate = useNavigate();

    const handleAllCallsClick = () => {
        navigate("/");
    };

    return (
        <>
            <div className="side-bar">
                <button onClick={handleAllCallsClick}>All Calls</button>
                <button onClick={() => setShowUploadModal(true)}>Upload Audio</button>

                <hr />

                <h4> Filters</h4>
                <ul className="filters">
                    <li>
                        <FaStar color="orange" />
                        <span>Starred</span>
                    </li>
                    <li>
                        <FaCheck color="green" />
                        <span>Solved</span>
                    </li>
                    <li>
                        <ImCross color="red" size={13} />
                        <span>Not Solved</span>
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

    function handleSubmit(e) {
        e.preventDefault();
        if (!inputs.audioFile.type.startsWith("audio")) {
            toast.error("Not an audio file, please upload an audio file");
        }
        // TODO: send the request
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
                    <label>
                        <p className="upload_btn">Upload Audio File</p>
                        <input type="file" onChange={handleFileChange} accept="audio/*" />
                    </label>

                    <button type="submit">Submit</button>
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
