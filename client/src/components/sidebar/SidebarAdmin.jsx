import React, { Fragment, useState } from "react";
import logo from "../../assets/logo.webp";
import { Link, NavLink } from "react-router-dom";
import path from "../../ultils/path";
import { adminSidebar } from "../../ultils/contants";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

const activeStyle = "px-4 py-2 flex items-center gap-2 bg-gray-300";
const notActiveStyle = "px-4 py-2 flex items-center gap-2 hover:bg-gray-200";

const SidebarAdmin = () => {
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabId) => {
    if (actived.some((el) => el === tabId))
      setActived((prev) => prev.filter((el) => el !== tabId));
    else setActived((prev) => [...prev, tabId]);
  };
  return (
    <div className="bg-white h-full">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-center items-center flex-col py-4">
          <Link to={`/${path.HOME}`}>
            <img src={logo} alt="logo" />
          </Link>
          <div>Admin Workspace</div>
        </div>
        <div>
          {adminSidebar?.map((el) => (
            <Fragment key={el.id}>
              {el.type === "single" && (
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiveStyle
                  }
                >
                  <span>{el.icon}</span>
                  <span>{el.text}</span>
                </NavLink>
              )}
              {el.type === "parent" && (
                <div className=" flex flex-col ">
                  <div
                    onClick={() => handleShowTabs(+el.id)}
                    className="flex items-center px-4 py-2 justify-between hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{el.icon}</span>
                      <span>{el.text}</span>
                    </div>
                    {actived.some((id) => id === el.id) ? (
                      <FaCaretDown />
                    ) : (
                      <FaCaretRight />
                    )}
                  </div>
                  {actived.some((id) => +id === +el.id) && (
                    <div className="flex flex-col">
                      {el.submenu.map((item) => (
                        <NavLink
                          key={item.text}
                          to={item.path}
                          className={({ isActive }) =>
                            isActive
                              ? `pl-14 ${activeStyle}`
                              : `pl-14  ${notActiveStyle}`
                          }
                        >
                          {item.text}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
