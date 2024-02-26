import React, { memo } from "react";

const ButtonCt = ({ name, handleOnclick, style, icons }) => {
  return (
    <div>
      <button
        className={
          style
            ? style
            : "px-4 py-2 font-semibold bg-main w-full text-white flex items-center justify-center"
        }
        onClick={() => handleOnclick && handleOnclick()}
      >
        {icons && icons}
        <span>{name}</span>
      </button>
    </div>
  );
};

export default memo(ButtonCt);
