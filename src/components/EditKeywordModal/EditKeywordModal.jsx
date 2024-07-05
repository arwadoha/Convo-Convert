import React from 'react'
import "./EditKeywordModal.css"

const EditKeywordModal = ({open,setOpen,children,title="Edit Keyword"}) => {
  
  function close(){
    setOpen(false); 
}

  if(!open){
      return null;
  }
  
  return (
    <div>
      <div className='modal__overlay'>
        <div className='modal__content'>
          <div className='modal__title'>
            <h2>{title}</h2>
            <div className='close' onClick={close}>
              &times;
            </div>
          </div>
          <div className='modal__body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default EditKeywordModal