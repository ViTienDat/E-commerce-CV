import React, { useEffect, useState } from "react";
import { apiGetOrderUser } from "../../apis/order";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import { Loading, DetailOrder } from "../../components";
import moment from "moment";
import { formatMoney } from "../../ultils/helpers";

const History = () => {
  const dispatch = useDispatch();
  const [userOrder, setUserOrder] = useState(null);
  const fetchOrders = async () => {
    dispatch(showModal({ isShowModal: true, modalChildren: "loading" }));
    const response = await apiGetOrderUser();
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      setUserOrder(response.data);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div>
      <header className="h-[75px] w-full flex items-center justify-center text-3xl font-bold px-4 border-b ">
        Manage Order
      </header>
      <div>
        {!userOrder ? (
          <div>History buy is empty</div>
        ) : (
          <div>
            {userOrder?.map((el, index) => (
              <div className="px-4 border py-4 " key={index}>
                <div className="font-semibold text-xl">#{index + 1}</div>
                <div className="px-6 py-2">
                  <div>
                    <span className="font-medium text-lg">Address: </span>
                    <span> {el.address}</span>
                  </div>
                  <div>
                    <span className="font-medium text-lg">Order date : </span>
                    <span>{moment(el?.createdAt).format("DD-MM-YYYY")}</span>
                  </div>
                  <div>
                    <span className="font-medium text-lg">Total : </span>
                    <span>{formatMoney(el.total)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-lg">Status : </span>
                    <span
                      className={`${
                        el.status == "Cancel"
                          ? "text-red-500"
                          : el.status == "Success"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {el.status}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center py-2 bg-main hover:bg-main2 text-white cursor-pointer w-40"
                    onClick={() =>
                      dispatch(
                        showModal({
                          isShowModal: true,
                          modalChildren: el.products,
                        })
                      )
                    }
                  >
                    Details products
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="py-4"></div>
    </div>
  );
};

export default History;
