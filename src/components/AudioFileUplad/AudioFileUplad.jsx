import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import "./AudioFileUplad.css"

const AudioFileUplad = ({ onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleAudioFileUpload = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 
    console.log('Uploading audio file:', audioFile);
    console.log('Customer Name:', customerName);
    console.log('Customer Number:', customerNumber);
    console.log('Employee Name:', employeeName);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Upload Audio File</h3>
          <button className="close-button" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="audio-file">Audio File</label>
              <input
                type="file"
                id="audio-file"
                accept="audio/*"
                onChange={handleAudioFileUpload}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-name">Customer Name</label>
              <input
                type="text"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-number">Customer Number</label>
              <input
                type="text"
                id="customer-number"
                value={customerNumber}
                onChange={(e) => setCustomerNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employee-name">Employee Name</label>
              <input
                type="text"
                id="employee-name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AudioFileUplad;