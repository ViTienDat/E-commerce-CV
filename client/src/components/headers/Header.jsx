import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../../store/user/asyncActions";
import { logout, clearMessage } from "../../store/user/userSlice";
import Swal from "sweetalert2";
import icons from "../../ultils/icons";

const { IoLogOutOutline, MdOutlineAccountCircle } = icons;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, current, mes } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (isLogin) dispatch(getCurrent());
    }, 500);
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

  const handleLogout = () => {
    Swal.fire({
      title: "Logout!",
      text: "Are you sure ?",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "No!",
      confirmButtonText: "Yes",
    }).then((rs) => {
      if (rs.isConfirmed) {
        dispatch(logout());
      }
    });
  };
  return (
    <div className=" w-full h-10 flex justify-center bg-[#333333] text-[#CCCCCC] text-[13px] ">
      <div className="w-main flex justify-between items-center ">
        <div className="">Hotline: 0353.735.296</div>
        <div className="">
          {isLogin && current ? (
            <div className="flex gap-3">
              <Link
                to={
                  current?.role === "user"
                    ? `/${path.MEMBER}/${path.PERSONAL}`
                    : `/${path.ADMIN}/${path.UPDATE_ADMIN}`
                }
              >
                <span
                  title="Your account"
                  className="px-2 cursor-pointer items-center gap-1 flex"
                >
                  <MdOutlineAccountCircle size={20} />
                  Tài khoản
                </span>
              </Link>
              <span>|</span>
              <span
                onClick={() => handleLogout()}
                className="px-2 cursor-pointer flex items-center gap-1"
                title="Logout"
              >
                Đăng xuất
                <IoLogOutOutline size={20} />
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
