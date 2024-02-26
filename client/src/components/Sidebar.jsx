import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  return <div>Sidebar</div>;
};

export default Sidebar;
