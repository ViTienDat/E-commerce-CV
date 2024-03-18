import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../ultils/helpers";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import checkoutLogo from "../../assets/checkout_logo.webp";
import { apiCreateOrder } from "../../apis";
import { getCurrent } from "../../store/user/asyncActions";
import { Loading } from "../../components";
import { showModal } from "../../store/app/appSlice";

const { IoClose, LuQrCode, FaMoneyBill, BsQrCode } = icons;

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState(null);
  const handleCreateOrder = async () => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateOrder({ address, payment: paymentMethod });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      navigate(`/`);
      dispatch(getCurrent());
    }
  };
  return (
    <div className="flex pl-7">
      <div className="w-[70%] p-7">
        <div className="pb-5">
          <img
            src={checkoutLogo}
            alt="logo"
            className="h-14 cursor-pointer"
            onClick={() => navigate(`/`)}
          />
        </div>
        <div className="flex gap-7">
          <div className="flex-1 flex flex-col gap-5">
            <h3 className="font-medium text-[20px]">Thông tin nhận hàng</h3>
            <input
              type="text"
              className="border w-full p-2 rounded-[4px]"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col gap-5 w-full h-full ">
            <h3 className="font-medium text-[20px]">Hình thức thanh toán</h3>
            <div>
              <di className="flex justify-between border p-3 items-center">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="checkout"
                    onClick={() => setPaymentMethod("qr")}
                  />
                  <label>Thanh toán qua VietQR</label>
                </div>
                <LuQrCode size={18} />
              </di>
              {paymentMethod == "qr" && (
                <div className="w-full flex justify-center py-4">
                  <BsQrCode size={200} />
                </div>
              )}
            </div>
            <div className="flex justify-between border p-3 items-center ">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="checkout"
                  defaultChecked
                  onClick={() => setPaymentMethod("cod")}
                />
                <label>Thanh toán khi nhận hàng (cod)</label>
              </div>
              <FaMoneyBill size={20} />
            </div>
          </div>
        </div>
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
            <button
              onClick={handleCreateOrder}
              className="py-3 px-5 rounded-md transition-colors duration-200 flex items-center justify-center bg-[#2a9dcc] hover:bg-[rgb(45,113,140)]"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
