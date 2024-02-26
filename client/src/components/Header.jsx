import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../store/user/asyncActions";
import { logout } from "../store/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLogin) dispatch(getCurrent());
  }, [isLogin, dispatch]);
  return (
    <div className=" w-full h-10 flex justify-center bg-[#333333] text-[#CCCCCC] text-[13px] ">
      <div className="w-main flex justify-between items-center ">
        <div className="">Hotline: 0353.735.296</div>
        <div className="">
          {isLogin ? (
            <div>
              <Link to={path.ACCOUNT}>
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
