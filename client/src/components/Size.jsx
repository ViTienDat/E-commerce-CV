import React, { memo, useRef, useEffect } from "react";
import teeSize from "../assets/tee-size.webp";
import jacketSize from "../assets/jacket-size.webp";
import hoodieSize from "../assets/hoodie-size.webp";

const Size = ({ category }) => {
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", inline: "center" });
  }, []);
  return (
    <div ref={modalRef} className="h-[500px] w-[500px] bg-white object-cover">
      {category === "tee" ? (
        <img src={teeSize} alt="img size" />
      ) : category === "jacket" ? (
        <img src={jacketSize} alt="img size" />
      ) : (
        category === "hoodie" && <img src={hoodieSize} alt="img size" />
      )}
    </div>
  );
};

export default memo(Size);
