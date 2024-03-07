import React, { useState, useCallback, useEffect } from "react";
import { InputField, ButtonCt, Loading } from "../../components";
import { apiRegister, apiLogin } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { validate } from "../../ultils/helpers";
import { showModal } from "../../store/app/appSlice";

const Login = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);

  const resetPayload = () => {
    setPayload({
      name: "",
      email: "",
      password: "",
      mobile: "",
    });
  };
  const handleSubmit = useCallback(async () => {
    const { name, mobile, ...data } = payload;
    const invalid = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalid === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          Swal.fire("Congratulation", response?.message, "success").then(() => {
            setIsRegister(false);
            resetPayload();
          });
        } else {
          Swal.fire("Oops!", response?.message, "error");
        }
      } else {
        const response = await apiLogin(data);
        if (response.success) {
          dispatch(
            login({
              isLogin: true,
              token: response.accessToken,
              userData: response.data,
            })
          );
          navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Oops!", response?.message, "error");
        }
      }
    }
  }, [payload, isRegister]);

  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-300 ">
      <div className="p-6 bg-white flex flex-col min-w-[500px]  gap-4">
        <h1 className="text-[25px] font-semibold pb-4 flex-none m-auto">
          {isRegister ? "Register" : "Login"}
        </h1>
        {isRegister && (
          <InputField
            value={payload.name}
            setValue={setPayload}
            nameKey="name"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <InputField
          value={payload.email}
          setValue={setPayload}
          nameKey="email"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputField
          value={payload.password}
          setValue={setPayload}
          nameKey="password"
          type="password"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        {isRegister && (
          <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey="mobile"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <ButtonCt
          name={isRegister ? "Register" : "Login"}
          style={`w-full py-2 flex items-center justify-center text-white bg-main hover:bg-main2 `}
          handleOnclick={handleSubmit}
        />
        <div className="flex justify-between">
          <span
            className="text-[13px] hover:text-main cursor-pointer flex-none "
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Not a member? Signup"}
          </span>
          <Link
            to={"/"}
            className="text-[13px] hover:text-main cursor-pointer flex-none "
          >
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
