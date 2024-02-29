import React, { useEffect, useState, useCallback } from "react";
import { apiGetUsers } from "../../apis/user";
import moment from "moment";
import { InputField, Pagination } from "../../components";
import useDebounce from "../../hooks/useDebounce";
const limit = import.meta.env.VITE_APP_LIMIT;
import { useSearchParams } from "react-router-dom";

const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });

  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({ ...params, limit: limit });
    if (response.success) setUsers(response);
  };

  const queriDebounce = useDebounce(queries.q, 800);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriDebounce) queries.q = queriDebounce;
    fetchUsers(queries);
  }, [queriDebounce, params]);

  return (
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
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold  text-[13px]  text-white">
            <tr className="border bg-gray-600">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">Role</th>
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
                <td className="px-4 py-2 border border-gray-950">{el.name}</td>
                <td className="px-4 py-2 border border-gray-950">{el.email}</td>
                <td className="px-4 py-2 border border-gray-950">
                  {el.mobile}
                </td>
                <td className="px-4 py-2 border border-gray-950">{el.role}</td>
                <td className="px-4 py-2 border border-gray-950">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-2 border border-gray-950">
                  <span className="px-2 hover:underline text-red-400 cursor-pointer">
                    Edit
                  </span>
                  <span className="px-2 hover:underline text-red-700 cursor-pointer">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-end">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
