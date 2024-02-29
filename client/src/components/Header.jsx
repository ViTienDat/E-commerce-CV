import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../ultils/path";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../store/user/asyncActions";
import { logout, clearMessage } from "../store/user/userSlice";
import Swal from "sweetalert2";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    setTimeout(() => {
      if (isLogin) dispatch(getCurrent());
    }, 300);
  }, [dispatch, isLogin]);

  useEffect(() => {
    if (mes)
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate({
          pathname: `/${path.LOGIN}`,
        });
      });
  }, [mes]);
  return (
    <div className=" w-full h-10 flex justify-center bg-[#333333] text-[#CCCCCC] text-[13px] ">
      <div className="w-main flex justify-between items-center ">
        <div className="">Hotline: 0353.735.296</div>
        <div className="">
          {isLogin && current ? (
            <div>
              <Link
                to={
                  current?.role === "user"
                    ? `/${path.MEMBER}/${path.PERSONAL}`
                    : `/${path.ADMIN}/${path.DASHBOARD}`
                }
              >
                <span className="px-2 cursor-pointer">Tài khoản</span>
              </Link>
              <span
                onClick={() => dispatch(logout())}
                className="px-2 cursor-pointer"
              >
                Đăng xuất
              </span>
            </div>
          ) : (
            <Link to={path.LOGIN}>
              <span>Đăng nhập / Đăng ký</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
