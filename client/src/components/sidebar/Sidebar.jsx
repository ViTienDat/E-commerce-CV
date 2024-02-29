import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div>
      <div className="flex flex-col">
        <div className="font-bold pb-[15px] ">DANH MỤC SẢN PHẨM</div>
        {categories?.map((el) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " text-main py-[10px] pr-[10px] text-[14px]"
                : "py-[10px] pr-[10px] text-[14px] hover:text-main"
            }
            key={el.slug}
            to={`/product/${el.slug}`}
          >
            {el?.title.toUpperCase()}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
