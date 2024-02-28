import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";

const MemberLayout = () => {
  const { isLogin, current } = useSelector((state) => state.user);
  if (!isLogin || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div>
      member layout
      <Outlet />
    </div>
  );
};

export default MemberLayout;
