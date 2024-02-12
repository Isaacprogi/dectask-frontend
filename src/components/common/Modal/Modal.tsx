import './modal.css'
import React from 'react';

interface Props {
    handleClose:()=>void;
    isOpen:boolean;
    children:React.ReactNode
}

const Modal:React.FC<Props> = (props) => {
  return props.isOpen && (
    <div className='w-full h-full overflow-y-auto  fixed modal z-[99999999] top-0 right-0'>
        <div onClick={props.handleClose} className="w-full absolute   h-full"> 
                 
        </div>
        
      <div className="w-full flex justify-center items-center    min-h-full p-[1rem] sm:p-[2rem]">
      {props.children}
      </div>
        
    </div>
  )
}

export default Modal