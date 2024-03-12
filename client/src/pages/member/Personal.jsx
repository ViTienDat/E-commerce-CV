import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputFrom } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { apiUpdateCurrent } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrent } from "../../store/user/asyncActions";

const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      name: current.name,
      email: current.email,
      mobile: current.mobile,
    });
  }, [current]);
  const handleUpdateInfor = async (data) => {
    const response = await apiUpdateCurrent(data);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full">
      <ToastContainer />
      <h1 className="h-[75px] flex items-center justify-center text-3xl font-bold px-4 border-b">
        Personal
      </h1>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="px-4 w-[70%] flex flex-col gap-16 m-auto my-3"
      >
        <InputFrom
          label={"Name"}
          register={register}
          error={errors}
          id={"name"}
          validate={{
            required: "Need fill this fields",
          }}
          style={"px-4 py-2 under outline-none"}
        />
        <InputFrom
          label={"Email"}
          register={register}
          error={errors}
          id={"email"}
          validate={{
            required: "Need fill this fields",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Email invalid",
            },
          }}
          style={"px-4 py-2 under outline-none "}
        />
        <InputFrom
          label={"Mobile"}
          register={register}
          error={errors}
          id={"mobile"}
          validate={{
            required: "Need fill this fields",
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Phone invalid ",
            },
          }}
          style={"px-4 py-2 under outline-none"}
        />
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-medium">Account status: </span>
            <span
              className={`${
                current?.isblock === "Active"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {current?.isblock}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Created at:</span>
            <span>{moment(current?.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className="w-full flex justify-end">
          {isDirty ? (
            <button
              className=" text-white px-8 py-2 bg-main hover:bg-main2"
              type="submit"
            >
              Update information
            </button>
          ) : (
            <div className=" text-white px-8 py-2 bg-gray-300">
              Update information
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Personal;
