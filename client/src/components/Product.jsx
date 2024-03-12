import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { formatMoney } from "../ultils/helpers";
import { SelectOption } from "./";

const Product = ({ data }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const handleHover = () => {
    setIsShowOption(true);
  };
  const handleLeave = () => {
    setIsShowOption(false);
  };
  return (
    <div className="flex flex-col gap-7">
      <Link to={`/${path.DETAIL_PRODUCT}/${data._id}/${data.slug}`}>
        <div
          className="relative"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          {isShowOption && (
            <div
              className={`ac absolute left-0 right-0 bottom-[45%] flex justify-center gap-1 scale-up-center
              } `}
            >
              <SelectOption title={"Chi tiết"} />
              <SelectOption title={"Yêu thích"} />
            </div>
          )}
          <img
            src={data.thumbnail}
            alt="thumbnail"
            className="cursor-pointer object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <span className="line-clamp-1 cursor-pointer hover:text-main">
          <Link to={`${path.DETAIL_PRODUCT}/${data._id}/${data.slug}`}>
            {data.title.toUpperCase()}
          </Link>
        </span>
        <span className="line-clamp-1 font-bold">
          {formatMoney(data?.price)}
        </span>
      </div>
    </div>
  );
};

export default memo(Product);
