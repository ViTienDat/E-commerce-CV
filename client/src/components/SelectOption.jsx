import React from "react";

const SelectOption = ({ title }) => {
  return (
    <div className="w-[120px] transition-colors duration-200 py-2 bg-main hover:bg-main2 text-[13px] text-white flex justify-center cursor-pointer items-center">
      {title}
    </div>
  );
};

export default SelectOption;
