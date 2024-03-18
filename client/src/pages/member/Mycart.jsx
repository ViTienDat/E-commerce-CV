import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icons from "../../ultils/icons";
import { formatMoney } from "../../ultils/helpers";
import { apiRemoveCart, apiUpdateCart } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrent } from "../../store/user/asyncActions";
import path from "../../ultils/path";

const { RiDeleteBin5Fill, GrFormNextLink } = icons;

const Mycart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const handleRemoveCart = async (pid) => {
    const response = await apiRemoveCart(pid);
    if (response?.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };
  const handleChangeQuantity = async (flag, data) => {
    let response;
    if (flag === "minus" && data?.quantity == 1) {
      response = await apiRemoveCart(data._id);
    } else {
      const dt = {};
      dt.pid = data.product._id;
      if (data?.color) {
        dt.color = data.color;
      }
      if (data?.size) {
        dt.size = data.size;
      }
      if (flag === "minus") {
        dt.quantity = +data.quantity - 1;
        response = await apiUpdateCart(dt);
      } else {
        dt.quantity = +data.quantity + 1;
        response = await apiUpdateCart(dt);
      }
    }
    if (response.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col gap-10 none w-full">
        <div className="h-[75px] flex items-center justify-center text-3xl font-bold px-4 border-b">
          <h1>My cart</h1>
        </div>
        {current?.cart?.length != 0 && (
          <div className="w-full px-4">
            <table className="table-auto w-full text-center">
              <thead>
                <tr className="">
                  <th className="border py-2">Ảnh sản phẩm</th>
                  <th className="border py-2">Tên sản phẩm</th>
                  <th className="border py-2">Đơn giá</th>
                  <th className="border py-2">Số lượng</th>
                  <th className="border py-2">Thành tiền</th>
                  <th className="border py-2">Xóa</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {current?.cart?.map((el) => (
                  <tr className="">
                    <td className="border flex justify-center">
                      <img
                        src={el.product.thumbnail}
                        alt="thumb"
                        className="w-[98px] h-[98px] object-cover my-4 cursor-pointer"
                        onClick={() => {
                          navigate(
                            `/${path.DETAIL_PRODUCT}/${el.product._id}/${el.product.slug}`
                          );
                        }}
                      />
                    </td>
                    <td className="border">
                      <div>{el.product.title.toUpperCase()}</div>
                      <div className="flex gap-2 justify-center">
                        <span>{el?.size?.toUpperCase()}</span>
                        <span>{el?.color}</span>
                      </div>
                    </td>
                    <td className="border text-[14px] font-medium">
                      {formatMoney(el.product.price)}
                    </td>
                    <td className="border">
                      <div className="flex justify-center">
                        <div className="flex items-center gap-[2px]">
                          <span
                            onClick={() => handleChangeQuantity("minus", el)}
                            className="border w-5 h-full  cursor-pointer flex items-center justify-center"
                          >
                            -
                          </span>
                          <input
                            type="text"
                            value={el?.quantity}
                            className="px-2 py-1 w-[80px] border outline-none text-black text-center"
                          />
                          <span
                            onClick={() => handleChangeQuantity("plus", el)}
                            className="border w-5 h-full cursor-pointer flex items-center justify-center"
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="border text-[14px] font-medium">
                      {formatMoney(+el.quantity * el.product.price)}
                    </td>
                    <td className="border">
                      <RiDeleteBin5Fill
                        onClick={() => handleRemoveCart(el._id)}
                        className="flex justify-center w-full hover:text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className=" flex justify-start text-[15px] px-4 mb-10">
          <div>
            <div className="flex justify-between w-[400px] mb-5">
              <span className="border w-full p-3">Tổng tiền</span>
              <span className="border w-[250px] flex justify-end p-3 font-semibold">
                {current.cart.length !== 0
                  ? formatMoney(
                      current?.cart
                        .map((el) => +el.quantity * el.product.price)
                        .reduce((partialSum, a) => partialSum + a)
                    )
                  : 0}
              </span>
            </div>
            <div>
              <button
                onClick={() => navigate(`/${path.CHECKOUT}`)}
                className="w-full py-2 transition-colors text-white duration-200 flex items-center justify-center bg-main hover:bg-main2"
              >
                CHECK OUT
                <GrFormNextLink size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mycart;
