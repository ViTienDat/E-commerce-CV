import React, { useCallback, useEffect, useState } from "react";
import { InputFrom, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProducts, apiDeleteProduct } from "../../apis";
import { formatString } from "../../ultils/helpers";
import icons from "../../ultils/icons";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { BiEdit, RiDeleteBin5Fill } = icons;

const ManageProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const [counts, setCounts] = useState(0);
  const [products, setProducts] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearchProduct = (data) => {};
  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: import.meta.env.VITE_APP_LIMIT,
    });
    if (response?.success) {
      setProducts(response?.data);
      setCounts(response?.counts);
    }
  };

  const queryDecounce = useDebounce(watch("q"), 800);

  useEffect(() => {
    if (queryDecounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ title: queryDecounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queryDecounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params, update]);

  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: "are you sure ?",
      text: "are your ready remove product ?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response?.success) {
          toast.success(response.message);
          render();
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  return (
    <div className="relative">
      <ToastContainer />
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-gray-100">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          />
        </div>
      )}
      <div className="w-full">
        <h1 className="h-[75px] w-full flex items-center justify-center text-3xl font-bold px-4 border-b ">
          Manage Products
        </h1>
      </div>

      <div className="w-full px-4">
        <div className="flex justify-end py-4">
          <InputFrom
            id={"q"}
            register={register}
            error={errors}
            fullwidth
            placeholder={"Search products by title"}
            style={"px-4 py-2"}
          />
        </div>
        <form className="" onSubmit={handleSubmit(handleSearchProduct)}>
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold  text-[13px]  text-white">
              <tr className="border bg-gray-600">
                <th className="px-4 py-2 border">Order</th>
                <th className="px-4 py-2 border">Thubmail</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Isready</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((el, index) => (
                <tr key={index}>
                  <td className="px-4 py-2  border-b ">
                    {params.get("page") > 0
                      ? (+params.get("page") - 1) *
                          import.meta.env.VITE_APP_LIMIT +
                        index +
                        1
                      : index + 1}
                  </td>
                  <td className="px-4 py-2  border-b ">
                    <img
                      src={el?.thumbnail}
                      alt=""
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2  border-b">
                    {formatString(el.title)}
                  </td>
                  <td className="px-4 py-2 border-b">{el?.price}</td>
                  <td className="px-4 py-2 border-b ">{el.category.title}</td>
                  <td className="px-4 py-2 border-b">
                    {el?.isready ? "available" : "sold out"}
                  </td>
                  <td className="px-4 py-2 border-b h-full flex justify-between items-center">
                    <span onClick={() => setEditProduct(el)}>
                      <BiEdit
                        size={20}
                        className="h-12 cursor-pointer hover:text-main"
                      />
                    </span>
                    <span>
                      <RiDeleteBin5Fill
                        onClick={() => handleDeleteProduct(el._id)}
                        size={19}
                        className="h-12 cursor-pointer hover:text-red-600"
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div className="flex justify-end my-8">
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
