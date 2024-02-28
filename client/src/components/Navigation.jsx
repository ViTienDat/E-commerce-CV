import React from "react";
import logo from "../assets/logo.webp";
import icons from "../ultils/icons";
import { navigations } from "../ultils/contants";
import { NavLink } from "react-router-dom";
import path from "../ultils/path";
import { useSelector } from "react-redux";

const { BsFillHandbagFill, IoSearchSharp } = icons;
const activeStyle = "px-4 font-semibold text-[14px] text-main";
const notActiveStyle = "px-4 font-semibold text-[14px] hover:text-main";

const Navigation = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-main flex flex-col">
      <div className="flex items-center h-[100px] justify-center ">
        <NavLink to={path.HOME}>
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="h-[55px] border-t flex justify-between items-center">
        <div>
          {navigations.map((el) => (
            <NavLink
              to={el.path}
              key={el.id}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {el.value}
            </NavLink>
          ))}
        </div>

        <div className="flex gap-6 px-[15px]">
          <IoSearchSharp size={20} />
          {current && <BsFillHandbagFill size={18} />}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
