import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showWislist } from "../store/app/appSlice";
import icons from "../ultils/icons";
import { formatMoney } from "../ultils/helpers";
import { useNavigate } from "react-router-dom";
import path from "../ultils/path";
import { apiRemoveWislist } from "../apis";
import { getCurrent } from "../store/user/asyncActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { IoClose, RiDeleteBin5Fill } = icons;

const WislistBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  console.log(current);

  const handleRemoveWislist = async (pid) => {
    const response = await apiRemoveWislist(pid);
    console.log(response);
    if (response.success) {
      dispatch(getCurrent());
      toast.success("Success!");
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[350px] h-screen bg-gray-100 flex flex-col"
    >
      <ToastContainer />
      <h2 className="p-4 border-b font-bold text-xl flex justify-between items-center h-[10%] ">
        <span>Your wislist</span>
        <span
          onClick={() => dispatch(showWislist({ signal: false }))}
          className="border border-black rounded-full cursor-pointer hover:bg-main hover:text-white"
        >
          <IoClose size={20} />
        </span>
      </h2>
      <div className="h-[90%] overflow-y-auto p-2">
        {current.wislist.length === 0 ? (
          <span className="">Your wislist is empty</span>
        ) : (
          <div className="flex flex-col">
            {current?.wislist?.map((el) => (
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
                    <div className="flex flex-col">
                      <span className="line-clamp-1">
                        {el?.product.title.toUpperCase()}
                      </span>
                      <span>{formatMoney(el?.product.price)}</span>
                    </div>
                    <span className="cursor-pointer hover:text-red-500">
                      <RiDeleteBin5Fill
                        size={18}
                        onClick={() => handleRemoveWislist(el._id)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WislistBar;
