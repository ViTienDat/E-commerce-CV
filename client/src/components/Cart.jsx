import React from "react";
import icons from "../ultils/icons";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../store/app/appSlice";
import { formatMoney } from "../ultils/helpers";
import { apiRemoveCart } from "../apis";
import { getCurrent } from "../store/user/asyncActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import path from "../ultils/path";

const { IoClose, RiDeleteBin5Fill, GrFormNextLink } = icons;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  console.log(current);

  const handleRemoveCart = async (pid) => {
    const response = await apiRemoveCart(pid);
    if (response?.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[350px] h-screen bg-gray-100 flex flex-col"
    >
      <ToastContainer />
      <h2 className="p-4 border-b font-bold text-xl flex justify-between items-center h-[10%] ">
        <span>Your Cart</span>
        <span
          onClick={() => dispatch(showCart({ signal: false }))}
          className="border border-black rounded-full cursor-pointer hover:bg-main hover:text-white"
        >
          <IoClose size={20} />
        </span>
      </h2>
      <div className="flex h-[60%] overflow-y-auto p-2">
        {!current.cart ? (
          <span className="">Your cart is empty</span>
        ) : (
          <div className="flex flex-col">
            {current?.cart?.map((el) => (
              <div className="flex gap-2 p-3 border-b w-full" key={el._id}>
                <img
                  src={el.product.thumbnail}
                  alt="thubnail"
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col w-full justify-between">
                  <div className="flex justify-between gap-8 items-center">
                    <span className="line-clamp-1">{el.product.title}</span>
                    <span className="cursor-pointer hover:text-red-500">
                      <RiDeleteBin5Fill
                        size={18}
                        onClick={() => handleRemoveCart(el._id)}
                      />
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs">
                    {el?.size && <span>size: {el.size}</span>}
                    {el?.color && <span>color: {el.color}</span>}
                  </div>
                  {el?.quantity && (
                    <span className="flex items-center text-sm justify-between">
                      <div className="flex items-center">
                        <IoClose />
                        {el.quantity}
                      </div>
                      <span className="font-medium text-red-600">
                        {formatMoney(el.product.price)}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between h-[30%] p-4 border-t">
        <div className="flex justify-between">
          <span>SUBTOTAL:</span>
          <span>1234</span>
        </div>
        <div className="flex flex-col gap-3 text-white text-[14px] pb-2">
          <button
            onClick={() => {
              dispatch(showCart({ signal: false }));
              navigate(`/${path.DETAIL_CART}`);
            }}
            className="w-full py-2 flex items-center justify-center bg-main hover:bg-main2"
          >
            SHOPPING CART
            <GrFormNextLink size={18} />
          </button>
          <button className="w-full py-2 flex items-center justify-center bg-main hover:bg-main2">
            CHECK OUT
            <GrFormNextLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
