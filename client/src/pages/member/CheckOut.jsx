import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../ultils/helpers";
import icons from "../../ultils/icons";
import path from "../../ultils/path";

const { IoClose } = icons;

const CheckOut = () => {
  const navigate = useNavigate();
  const { current } = useSelector((state) => state.user);
  console.log(current);
  return (
    <div className="flex pl-7">
      <div className="flex w-[70%] p-7">
        <div className="flex-1">address</div>
        <div className="flex-1">payment</div>
      </div>
      <div className="w-[30%] bg-gray-50 h-screen pr-7">
        <h2 className="px-7 border-b font-bold text-xl flex justify-between items-center h-[10%] ">
          <span>Đơn hàng</span>
        </h2>
        <div className="h-[45%] overflow-y-auto py-2">
          {current.cart.length === 0 ? (
            <span className="">Your cart is empty</span>
          ) : (
            <div className="flex flex-col">
              {current?.cart?.map((el) => (
                <div className="flex gap-2 py-3 pl-7 w-full" key={el._id}>
                  <img
                    src={el?.product?.thumbnail}
                    alt="thubnail"
                    className="w-[50px] h-[50px] rounded-md object-cover"
                  />
                  <div className="flex flex-col w-full justify-between">
                    <div className="flex justify-between gap-8 items-center">
                      <span className="line-clamp-1">
                        {el?.product?.title.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      {el?.size && <span>size: {el.size.toUpperCase()}</span>}
                      {el?.color && <span>color: {el.color}</span>}
                    </div>
                    {el?.quantity && (
                      <span className="flex items-center text-sm justify-between">
                        <div className="flex items-center">
                          <IoClose />
                          {el?.quantity}
                        </div>
                        <span className="font-medium text-red-600">
                          {formatMoney(el?.product?.price * el?.quantity)}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-[15%] border-t flex flex-col justify-end pl-7 py-3 font-light text-[13px]">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>
              {current.cart.length !== 0
                ? formatMoney(
                    current?.cart
                      ?.map((el) => +el?.quantity * el.product?.price)
                      .reduce((partialSum, a) => partialSum + a)
                  )
                : 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển</span>
            <span>{formatMoney(30000)}</span>
          </div>
        </div>
        <div className="flex flex-col h-[30%] pl-7 py-4 border-t">
          <div className="flex justify-between">
            <span>Tổng cộng</span>
            <span className="text-[#2a9dcc] text-[20px] font-medium ">
              {current.cart.length !== 0
                ? formatMoney(
                    current?.cart
                      ?.map((el) => +el?.quantity * el.product?.price)
                      .reduce((partialSum, a) => partialSum + a) + 30000
                  )
                : 0}
            </span>
          </div>
          <div className="flex gap-3 text-white text-[14px] pb-2">
            <button
              onClick={() => {
                navigate(`/${path.DETAIL_CART}`);
              }}
              className="w-full flex transition-colors font-medium duration-200 items-center text-[#2a9dcc] hover:text-[rgba(37,79,96,0.7)]"
            >
              Quay về giỏ hàng
            </button>
            <button className="py-3 px-5 rounded-md transition-colors duration-200 flex items-center justify-center bg-[#2a9dcc] hover:bg-[rgb(45,113,140)]">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
