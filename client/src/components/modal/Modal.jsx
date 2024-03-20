import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModa: false, modalChildren: null }))
      }
      className="absolute inset-0 z-50 bg-overlay h-full flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Modal;
