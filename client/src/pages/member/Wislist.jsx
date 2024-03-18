import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icons from "../../ultils/icons";
import { formatMoney } from "../../ultils/helpers";
import { apiRemoveWislist, apiUpdateWislist } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrent } from "../../store/user/asyncActions";
import path from "../../ultils/path";

const { RiDeleteBin5Fill, GrFormNextLink } = icons;

const Wislist = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleRemoveWislist = async (pid) => {
    const response = await apiRemoveWislist(pid);
    if (response?.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col gap-10 none w-full ">
        <div className="h-[75px] flex items-center justify-center text-3xl font-bold px-4 border-b">
          <h1>My wislist</h1>
        </div>
        {current?.wislist?.length != 0 && (
          <div className="w-full px-4">
            <table className="table-auto w-full text-center">
              <thead>
                <tr className="">
                  <th className="border py-2">Ảnh sản phẩm</th>
                  <th className="border py-2">Tên sản phẩm</th>
                  <th className="border py-2">Đơn giá</th>
                  <th className="border py-2">Xóa</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {current?.wislist?.map((el) => (
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
                    </td>
                    <td className="border text-[14px] font-medium">
                      {formatMoney(el.product.price)}
                    </td>
                    <td className="border">
                      <RiDeleteBin5Fill
                        onClick={() => handleRemoveWislist(el._id)}
                        className="flex justify-center w-full hover:text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wislist;
