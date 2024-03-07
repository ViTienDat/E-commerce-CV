import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  console.log("loading");
  return <HashLoader color="red" />;
};

export default memo(Loading);
