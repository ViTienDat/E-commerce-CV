import React, { useCallback, useEffect, useState } from "react";
import { apiGetAllOrder, apiUpdateStatus } from "../../apis";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DetailOrder,
  InputField,
  InputFrom,
  Loading,
  SelectFrom,
} from "../../components";
import { useForm } from "react-hook-form";
import { Pagination } from "../../components";
import { formatMoney } from "../../ultils/helpers";
import moment from "moment";
import icons from "../../ultils/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDebounce from "../../hooks/useDebounce";
import { showModal } from "../../store/app/appSlice";
const { BiEdit, IoMdMenu } = icons;

const ManageOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [elmentEdit, setElmentEdit] = useState(null);
  const [order, setOrder] = useState(null);
  const [counts, setCounts] = useState(null);
  const options = ["Cancel", "Processing", "Success"];
  const [update, setUpdate] = useState(false);
  const [queries, setQueries] = useState({
    q: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const q = watch("q");

  const fetchOrder = async (params) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiGetAllOrder({
      ...params,
      limit: import.meta.env.VITE_APP_LIMIT,
    });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      setOrder(response?.data);
      setCounts(response?.counts);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [update]);

  const queriDebounce = useDebounce(queries.q, 800);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriDebounce) queries.q = queriDebounce;
    fetchOrder(queries);
  }, [queriDebounce, params, update]);

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateStatus(data, elmentEdit._id);
    if (response.success) {
      setElmentEdit(null);
      toast.success(response.message);
      render();
    } else {
      toast.error(response.message);
    }
  };
  useEffect(() => {
    if (elmentEdit)
      reset({
        status: elmentEdit?.status,
      });
  }, [elmentEdit]);
  return (
    <div className="w-full">
      <ToastContainer />
      <header className="h-[75px] w-full flex items-center justify-center text-3xl font-bold px-4 border-b ">
        Manage Order
      </header>
      <div className="flex justify-end w-full px-4 py-5">
        <InputField
          nameKey={"q"}
          value={queries.q}
          setValue={setQueries}
          placeholder={"Search status..."}
        />
      </div>
      <form className="" onSubmit={handleSubmit(handleUpdate)}>
        {elmentEdit && (
          <button
            className="px-4 py-2 bg-main text-white hover:bg-main2"
            type="submit"
          >
            Update
          </button>
        )}
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold  text-[13px]  text-white">
            <tr className="border bg-gray-600">
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Adress</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Order date</th>
              <th className="px-4 py-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((el, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{el?.orderBy?.mobile}</td>
                <td className="px-4 py-2 border">
                  <span
                    onClick={() =>
                      dispatch(
                        showModal({
                          isShowModal: true,
                          modalChildren: <DetailOrder items={el.products} />,
                        })
                      )
                    }
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <IoMdMenu size={20} />
                  </span>
                </td>
                <td className="px-4 py-2 border">{formatMoney(el.total)}</td>
                <td className="px-4 py-2 border">{el?.address}</td>
                <td className="px-4 py-2 border">{el?.payment}</td>
                <td className="px-4 py-2 border">
                  {elmentEdit?._id === el._id ? (
                    <SelectFrom
                      defaultValue={el?.status}
                      register={register}
                      fullwidth
                      errors={errors}
                      options={options}
                      id={"status"}
                      validate={{ required: "Require fill." }}
                    />
                  ) : (
                    <span>{el?.status}</span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {moment(el?.createdAt).format("DD-MM-YYYY")}
                </td>
                <td className="border-b">
                  <span onClick={() => setElmentEdit(el)}>
                    <BiEdit
                      size={20}
                      className="cursor-pointer m-auto hover:text-main"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <div className="flex w-full justify-end">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default ManageOrder;
