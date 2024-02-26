import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
        className="p-[13px] w-[80px] border outline-none text-black text-center"
      />
      <div className="flex flex-col justify-between h-full">
        {" "}
        <span
          onClick={() => handleChangeQuantity("plus")}
          className="border flex-1 px-1 cursor-pointer flex items-center justify-center"
        >
          +
        </span>
        <span
          onClick={() => handleChangeQuantity("minus")}
          className="border flex-1 px-1 cursor-pointer flex items-center justify-center"
        >
          -
        </span>
      </div>
    </div>
  );
};

export default memo(SelectQuantity);
