import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import { SidebarAdmin } from "../../components";

const AdminLayout = () => {
  const { isLogin, current } = useSelector((state) => state.user);
  if (!isLogin || !current || current?.role !== "admin")
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="w-full flex min-h-screen relative">
      <div className="w-1/4 top-0 bottom-0 flex-none fixed ">
        <SidebarAdmin />
      </div>
      <div className="flex w-full bg-gray-100">
        <div className="w-1/4 "></div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
