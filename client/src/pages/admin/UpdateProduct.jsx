import React, { memo, useEffect } from "react";
import { InputFrom, SelectForm2, Loading } from "../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import icons from "../../ultils/icons";
import { apiUpdateProduct } from "../../apis";

const { IoClose } = icons;

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price,
      color: editProduct?.color.toString(),
      size: editProduct?.size.toString(),
      description: editProduct?.description,
      category: editProduct?.category._id,
      isready: editProduct?.isready,
    });
    window.scrollTo(0, 0);
  }, [editProduct]);
  const handleUpdateProduct = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateProduct(data, editProduct._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      toast.success("Create product successfully!");
      render();
      setEditProduct(null);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="absolute inset-0 min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full">
        <h1 className="h-[75px] w-full flex items-center justify-center text-3xl font-bold px-4 border-b ">
          Update Products
        </h1>
      </div>
      <div className="w-full justify-end flex">
        <span
          onClick={() => setEditProduct(null)}
          className="m-1 h-7 w-7 flex items-center justify-center bg-red-400 hover:bg-red-700 cursor-pointer"
        >
          <IoClose color="white" />
        </span>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleUpdateProduct)} className="">
          <InputFrom
            label={"Name product"}
            register={register}
            error={errors}
            id="title"
            validate={{
              required: "Need fill this field",
            }}
            fullwidth
            placeholder="Name of new product"
            style={"p-2 "}
            className=""
          />
          <div className="w-full flex flex-col gap-16 my-16">
            <InputFrom
              label={"Price"}
              register={register}
              error={errors}
              id="price"
              validate={{
                required: "Need fill this field",
              }}
              placeholder="Price of new product"
              style={"p-2 w-full"}
              type="number"
            />
            <InputFrom
              label={"Color"}
              register={register}
              error={errors}
              id="color"
              placeholder="Color of new product"
              style={"p-2 w-full"}
            />
            <InputFrom
              label={"Size"}
              register={register}
              error={errors}
              id="size"
              placeholder="Size of new product"
              style={"p-2 w-full"}
            />
            <InputFrom
              label={"Description"}
              register={register}
              error={errors}
              id="description"
              placeholder="Description of new product"
              style={"p-2 w-full"}
            />
            <SelectForm2
              label={"Category"}
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              id={"category"}
              validate={{
                required: true,
              }}
              style={"w-full p-2"}
              errors={errors}
            />
            <SelectForm2
              label={"Isready"}
              options={[
                { code: true, value: "available" },
                { code: false, value: "sold out" },
              ]}
              register={register}
              id={"isready"}
              validate={{
                required: true,
              }}
              style={"w-full p-2"}
              errors={errors}
            />
          </div>
          <button
            className="px-4 py-2 bg-main text-white hover:bg-main2"
            type="submit"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
