import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { isLogin, current } = useSelector((state) => state.user);
  if (!isLogin || !current || current?.role !== "admin")
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div>
      <div>Admin Layout</div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
