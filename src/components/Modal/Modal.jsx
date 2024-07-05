import React from "react";
import "./Modal.css";

const Modal = ({ open, setOpen, children, title = "Modal" }) => {
    function close() {
        setOpen(false);
    }

    if (!open) {
        return null;
    }

    return (
        <div className="modal_overlay" onClick={close}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <div className="model_title">
                    <h2>{title}</h2>
                    <div className="close" onClick={close}>
                        &times;
                    </div>
                </div>

                <div className="modal_body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
