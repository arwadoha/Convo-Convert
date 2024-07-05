import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./MessageDetails.css";
import "../../components/Modal/Modal.jsx";
import { IoPersonCircle } from "react-icons/io5";
import { fackMessages } from "../Home/Home";
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

const MessageDetails = () => {
    const { messageid } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [openStatus, setOpenStatus] = useState(false);

    const labelRef = useClickOutSide(() => {
        setOpenStatus(false);
        setIsDropdownVisible(false); // Close both status and dropdown when clicking outside
    });
    const message = fackMessages.find((msg) => msg.id == Number(messageid));

    const keywords = [
        "New connection Setup",
        "Al-Irsal",
        "Ramallah",
        "Keyword 4",
        "Keyword 5",
        "Keyword 6",
        "Keyword 7",
        "Keyword 8",
        "Keyword 9",
        "Keyword 10",
    ];

    //new
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    //

    function addNewFormSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="message-details">
            <div className="top">
                <div className="user-info">
                    <div className="info">
                        <IoPersonCircle size={35} color="gray" />
                        <p>{message.CustomerName}</p>
                    </div>
                    <div className="callerNomber">
                        <IoIosCall size={20} color="gray" className="call-icon" />
                        <span>{message.CustomerNumber}</span>
                    </div>
                </div>
                <div className="controls">
                    <div className="date">{message.date}</div>
                    <div className="icons">
                        {message.isStared ? <FaStar color="orange" /> : <FaRegStar />}
                        <input type="checkbox" />
                    </div>
                </div>
            </div>

            <div className="audio">
                <audio controls>
                  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"/>
                </audio>
            </div>

            <div className="convert-buttons">
                <button>Convert Audio to text</button>
                <button>NER</button>
            </div>

            <div className="converted-text">
                <h5>
                    {" "}
                    السلام عليكم ، وعليكم السلام معك عبادة صايل من شركة مدى تفضل استاذ معك محمد علي
                    بدي اركب خط نت جديد رنيت قبل ثلاث ايام يعني يوم الخميس على الشركة ولهس ما
                    اجيتوني السبت بتكون عندك صحيح استاذ تواصلت معنا باربعة تسعة وعفوا على الخلل الي
                    صار استاذ بدي اطلب منك تعطيني عنوانك كامل سيد محمد لو سمحت انا سكان مدينة رام
                    الله المصايف عمارة المنصورة تمام استاذ كنت سعيد باتصالك ويعطيك العافيه الله
                    يعافيك مع السلامة
                </h5>
            </div>

            <div className="keywords">
                <div className="controls">
                    <h3>
                        <FaKey size={20} color="orange" /> Keywords
                    </h3>
                    <button onClick={() => setOpenModal(true)}>
                        <IoMdAdd size={20} />
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
                        {[].map((tag) => (
                            <div className="tag" key={tag}>
                                {tag}
                            </div>
                        ))}
                    </div>
                    <div className="tags_options">
                        <div className="option"> Add New Tag</div>
                        <div className="option"> Clear All</div>
                    </div>
                </div>
            </div>

            <Modal open={openModal} setOpen={setOpenModal} title="Add New Keyword">
                <form className="form_addKeyword" onSubmit={addNewFormSubmit}>
                    <label htmlFor="keyword">
                        <span>Keyword</span>
                        <input
                            type="text"
                            name="keyword"
                            value={keyword}
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
                <div className="content" onClick={() => setOpenOptions((prev) => !prev)}>
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
            <Modal open={openEditModal} setOpen={setOpenEditModal} title="Edit Keyword">
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
            {/* Delete Modal */}
            <Modal open={openDeleteModal} setOpen={setOpenDeleteModal} title="Delete Keyword">
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
        </>
    );
};
