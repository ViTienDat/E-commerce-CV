import React from "react";
import icons from "../ultils/icons";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../store/app/appSlice";
import { formatMoney } from "../ultils/helpers";
import { apiRemoveCart } from "../apis";
import { getCurrent } from "../store/user/asyncActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import path from "../ultils/path";

const { IoClose, RiDeleteBin5Fill, GrFormNextLink } = icons;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
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
      <div className="h-[60%] overflow-y-auto p-2">
        {current.cart.length === 0 ? (
          <span className="">Your cart is empty</span>
        ) : (
          <div className="flex flex-col">
            {current?.cart?.map((el) => (
              <div className="flex gap-2 p-3 border-b w-full" key={el._id}>
                <img
                  src={el?.product?.thumbnail}
                  alt="thubnail"
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/${path.DETAIL_PRODUCT}/${el.product._id}/${el.product.slug}`
                    );
                  }}
                />
                <div className="flex flex-col w-full justify-between">
                  <div className="flex justify-between gap-8 items-center">
                    <span className="line-clamp-1">
                      {el?.product?.title.toUpperCase()}
                    </span>
                    <span className="cursor-pointer hover:text-red-500">
                      <RiDeleteBin5Fill
                        size={18}
                        onClick={() => handleRemoveCart(el._id)}
                      />
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
                        {formatMoney(el?.product?.price)}
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
          <span className="text-red-500 font-semibold">
            {current.cart.length !== 0
              ? formatMoney(
                  current?.cart
                    ?.map((el) => +el?.quantity * el.product?.price)
                    .reduce((partialSum, a) => partialSum + a)
                )
              : 0}
          </span>
        </div>
        <div className="flex flex-col gap-3 text-white text-[14px] pb-2">
          <button
            onClick={() => {
              dispatch(showCart({ signal: false }));
              navigate(`/${path.DETAIL_CART}`);
            }}
            className="w-full py-2 flex transition-colors duration-200 items-center justify-center bg-main hover:bg-main2"
          >
            SHOPPING CART
            <GrFormNextLink size={18} />
          </button>
          <Link to={`/${path.CHECKOUT}`}>
            <button className="w-full py-2 transition-colors duration-200 flex items-center justify-center bg-main hover:bg-main2">
              CHECKOUT
              <GrFormNextLink size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
