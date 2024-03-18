import React, { memo, useRef, useEffect } from "react";
import teeSize from "../assets/tee-size.webp";
import jacketSize from "../assets/jacket-size.webp";
import hoodieSize from "../assets/hoodie-size.webp";
import bottomSize from "../assets/bottom-size.webp";
import icons from "../ultils/icons";
import { useDispatch } from "react-redux";
import { showModal } from "../store/app/appSlice";

const { IoClose } = icons;

const Size = ({ category }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", inline: "center" });
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="h-[500px] w-[500px] bg-white object-cover"
    >
      <div className="w-full flex justify-end">
        <span
          onClick={() =>
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
          }
          className="w-6 h-6 bg-[hsla(2,68%,93%,1)] hover:bg-main cursor-pointer text-white flex items-center justify-center"
        >
          <IoClose />
        </span>
      </div>
      {category === "tee" ? (
        <img src={teeSize} alt="img size" />
      ) : category === "jacket" ? (
        <img src={jacketSize} alt="img size" />
      ) : category === "bottom" ? (
        <img src={bottomSize} alt="img size" />
      ) : (
        category === "hoodie" && <img src={hoodieSize} alt="img size" />
      )}
    </div>
  );
};

export default memo(Size);
