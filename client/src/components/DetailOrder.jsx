import React from "react";
import { formatMoney } from "../ultils/helpers";

const DetailOrder = ({ items }) => {
  console.log(items);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-8 flex flex-col gap-2 h-[400px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-y-auto"
    >
      {items?.map((pd) => (
        <div className="flex justify-between p-1 gap-2 border-b">
          <div className="flex gap-2 items-center">
            <img
              src={pd.product.thumbnail}
              alt="thumbnail"
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col">
              <span className="line-clamp-1">
                {pd.product.title.toUpperCase()}
              </span>
              <span>count : {pd.count}</span>
              {pd?.size && <span>size : {pd.size}</span>}
              {pd?.color && <span>color : {pd.color}</span>}
            </div>
          </div>

          <div className="flex items-end justify-end text-red-500 font-medium">
            <span>{formatMoney(pd.product.price)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailOrder;
