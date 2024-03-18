import React, { useState } from "react";
import logo from "../../assets/logo.webp";
import icons from "../../ultils/icons";
import { navigations } from "../../ultils/contants";
import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector, useDispatch } from "react-redux";
import { showCart, showWislist } from "../../store/app/appSlice";

const { BsFillHandbagFill, FaHeart, IoSearchSharp } = icons;
const activeStyle = "px-4 font-semibold text-[14px] text-main";
const notActiveStyle = "px-4 font-semibold text-[14px] hover:text-main";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [searchTitle, setSearchTitle] = useState(null);
  const handleKeyEnter = (event) => {
    if (event.key == "Enter" && searchTitle) {
      handleSearchProduct();
    }
  };

  const handleSearchProduct = async () => {
    if (searchTitle) {
      navigate({
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({ title: searchTitle }).toString(),
      });
      setSearchTitle(null);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center h-[100px] justify-center border-b">
        <NavLink to={path.HOME}>
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="h-[55px] w-main m-auto  flex justify-between items-center">
        <div className="flex">
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

        <div className="h-full flex items-center">
          <div className="flex gap-6 h-full">
            <span
              className="h-full"
              onMouseLeave={() => setIsShowSearch(false)}
              onMouseEnter={() => setIsShowSearch(true)}
            >
              <span className="cursor-pointer pl-8 h-full flex items-center justify-center">
                <IoSearchSharp size={22} />
              </span>
              {isShowSearch && (
                <div className="absolute right-[180px]">
                  <div className="relative z-50">
                    <input
                      onMouseEnter={() => setIsShowSearch(true)}
                      type="text"
                      onChange={(e) => setSearchTitle(e.target.value)}
                      className=" border-y border-l  py-[10px] px-4 outline-none w-[250px]"
                      placeholder="Tìm kiếm sản phẩm..."
                      onKeyDown={(event) => handleKeyEnter(event)}
                      tabIndex="0"
                      value={searchTitle}
                    />
                    <span className="absolute bg-white h-full border-y border-r">
                      <span
                        onClick={() => handleSearchProduct()}
                        className={`flex justify-center h-full items-center px-3  ${
                          !searchTitle
                            ? "text-gray-400 cursor-default"
                            : "cursor-pointer"
                        }`}
                      >
                        <IoSearchSharp size={20} />
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </span>
            {current && (
              <div className="flex gap-6 items-center">
                <span
                  className="hover:text-red-500 cursor-pointer relative"
                  onClick={() => dispatch(showWislist({ signal: true }))}
                >
                  {current.wislist.length > 0 && (
                    <span className="top-[-11px] left-3 absolute text-white text-[13px] h-5 w-5 justify-center items-center flex bg-main2 rounded-full">
                      {current.wislist.length}
                    </span>
                  )}
                  <FaHeart size={20} />
                </span>
                <span
                  className="hover:text-red-500 cursor-pointer relative"
                  onClick={() => dispatch(showCart({ signal: true }))}
                >
                  {current.cart.length > 0 && (
                    <span className="top-[-11px] left-3 absolute text-white text-[13px] h-5 w-5 justify-center items-center flex bg-main2 rounded-full">
                      {current.cart.length}
                    </span>
                  )}
                  <BsFillHandbagFill size={18} />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
