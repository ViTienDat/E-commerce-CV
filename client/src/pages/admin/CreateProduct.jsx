import React from "react";
import { InputFrom, SelectForm2, Loading } from "../../components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { apiCreateProduct } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "../../store/app/appSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const handleCreateProduct = async (data) => {
    const formData = new FormData();
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);

    if (data.thubnail) formData.append("thumbnail", data.thubnail[0]);
    if (data.images) {
      for (let image of data.images) formData.append("images", image);
    }
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateProduct(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      toast.success("Create product successfully!");
      reset();
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="h-[75px] flex items-center justify-center text-3xl font-bold px-4 border-b">
        <span>Manage Users</span>
      </h1>
      <div>
        <form onSubmit={handleSubmit(handleCreateProduct)} className="">
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
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label htmlFor="thumbnail" className="font-bold">
                  Upload Thumb
                </label>
                <input
                  type="file"
                  id="thubnail"
                  {...register("thubnail", { required: "Need fill" })}
                />
                {errors["thubnail"] && (
                  <small className="text-xs text-red-500">
                    {errors["thubnail"]?.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="images" className="font-bold">
                  Upload Images of product
                </label>
                <input
                  type="file"
                  id="images"
                  multiple
                  {...register("images")}
                />
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-main text-white hover:bg-main2"
            type="submit"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
