import React, { useEffect, useState, useCallback } from "react";
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "../../apis/user";
import moment from "moment";
import {
  InputField,
  Pagination,
  InputFrom,
  SelectFrom,
  Loading,
} from "../../components";
import useDebounce from "../../hooks/useDebounce";
const limit = import.meta.env.VITE_APP_LIMIT;
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";

const ManageUser = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    name: "",
    email: "",
    mobile: "",
    role: "",
    isblock: "",
  });
  const [editElement, setEditElement] = useState(null);
  const options = ["user", "admin"];
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [update, setUpdate] = useState(false);

  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    dispatch(showModal({ isShowModal: true, modalChildren: "loading" }));
    const response = await apiGetUsers({ ...params, limit: limit });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) setUsers(response);
  };

  const queriDebounce = useDebounce(queries.q, 800);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriDebounce) queries.q = queriDebounce;
    fetchUsers(queries);
  }, [queriDebounce, params, update]);

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleUpdate = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: "loading" }));
    const response = await apiUpdateUser(data, editElement._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      setEditElement(null);
      toast.success(response.message);
      render();
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "are you sure ?",
      text: "are your ready remove user ?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response?.success) {
          toast.success(response.message);
          render();
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  useEffect(() => {
    if (editElement)
      reset({
        name: editElement?.name,
        email: editElement?.email,
        mobile: editElement?.mobile,
        role: editElement?.role,
        isblock: editElement?.isblock,
      });
  }, [editElement]);

  return (
    <>
      <ToastContainer />
      <div className="w-full">
        <h1 className="h-[75px] flex items-center justify-center text-3xl font-bold px-4 border-b">
          <span>Manage Users</span>
        </h1>
        <div className="w-full p-4">
          <div className="flex justify-end py-4">
            <InputField
              nameKey={"q"}
              value={queries.q}
              setValue={setQueries}
              placeholder={"Search user..."}
            />
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            {editElement && (
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
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">isBlock</th>
                  <th className="px-4 py-2 border">Create At</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.data?.map((el, index) => (
                  <tr key={el._id} className="border border-gray-950">
                    <td className="px-4 py-2 border border-gray-950">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-950">
                      {editElement?._id === el._id ? (
                        <InputFrom
                          defaultValue={editElement?.name}
                          register={register}
                          fullwidth
                          error={errors}
                          id={"name"}
                          validate={{
                            required: "Require fill.",
                          }}
                        />
                      ) : (
                        <span>{el.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-950">
                      {editElement?._id === el._id ? (
                        <InputFrom
                          register={register}
                          fullwidth
                          defaultValue={editElement?.email}
                          error={errors}
                          id={"email"}
                          validate={{
                            required: "Require fill.",
                            pattern: {
                              value: /^\S+@\S+\.\S+$/,
                              message: "Invalid eamil",
                            },
                          }}
                        />
                      ) : (
                        <span>{el.email}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-950">
                      {editElement?._id === el._id ? (
                        <InputFrom
                          defaultValue={editElement?.mobile}
                          register={register}
                          fullwidth
                          error={errors}
                          id={"mobile"}
                          validate={{ required: "Require fill." }}
                        />
                      ) : (
                        <span>{el.mobile}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-950">
                      {editElement?._id === el._id ? (
                        <SelectFrom
                          defaultValue={editElement?.role}
                          register={register}
                          fullwidth
                          errors={errors}
                          options={options}
                          id={"role"}
                          validate={{ required: "Require fill." }}
                        />
                      ) : (
                        <span>{el.role}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-950">
                      {editElement?._id === el._id ? (
                        <SelectFrom
                          defaultValue={editElement?.isblock}
                          register={register}
                          fullwidth
                          errors={errors}
                          options={["Blocked", "Active"]}
                          id={"isblock"}
                          validate={{ required: "Require fill." }}
                        />
                      ) : (
                        <span>{el.isblock}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-950">
                      {moment(el.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-4 py-2 border border-gray-950">
                      <span
                        onClick={() => setEditElement(el)}
                        className="px-2 hover:underline text-red-400 cursor-pointer"
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => handleDeleteUser(el._id)}
                        className="px-2 hover:underline text-red-700 cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          <div className="w-full flex justify-end">
            <Pagination totalCount={users?.counts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
