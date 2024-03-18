import React, { Fragment, useState } from "react";
import logo from "../../assets/logo.webp";
import { Link, NavLink } from "react-router-dom";
import path from "../../ultils/path";
import { memberSidebar } from "../../ultils/contants";

const activeStyle = "px-4 py-2 flex items-center gap-2 bg-gray-300";
const notActiveStyle = "px-4 py-2 flex items-center gap-2 hover:bg-gray-200";

const SidebarMember = () => {
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabId) => {
    if (actived.some((el) => el === tabId))
      setActived((prev) => prev.filter((el) => el !== tabId));
    else setActived((prev) => [...prev, tabId]);
  };
  return (
    <div className="bg-white h-full">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex justify-center items-center flex-col py-4">
          <Link to={`/${path.HOME}`}>
            <img src={logo} alt="logo" />
          </Link>
          <div>Member Workspace</div>
        </div>
        <div>
          {memberSidebar?.map((el) => (
            <Fragment key={el.id}>
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarMember;
