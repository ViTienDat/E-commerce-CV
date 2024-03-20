import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="p-20 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <HashLoader color="red" size={70} />
    </div>
  );
};

export default memo(Loading);
