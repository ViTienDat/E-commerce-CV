import React from "react";
import logo from "../assets/logo.webp";
import icons from "../ultils/icons";
import { navigations } from "../ultils/contants";
import { NavLink } from "react-router-dom";
import path from "../ultils/path";
import { useSelector, useDispatch } from "react-redux";
import { showCart } from "../store/app/appSlice";

const { BsFillHandbagFill, FaHeart } = icons;
const activeStyle = "px-4 font-semibold text-[14px] text-main";
const notActiveStyle = "px-4 font-semibold text-[14px] hover:text-main";

const Navigation = () => {
  const dispatch = useDispatch();
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

        <div className="">
          {current && (
            <div className="flex gap-6">
              <span>
                <FaHeart size={20} />
              </span>
              <span
                className="hover:text-red-500 cursor-pointer relative"
                onClick={() => dispatch(showCart({ signal: true }))}
              >
                <span className="top-[-11px] left-3 absolute text-white text-[13px] h-5 w-5 justify-center items-center flex bg-main2 rounded-full">
                  {current.cart.length}
                </span>
                <BsFillHandbagFill size={18} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
