import React, { memo } from "react";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white flex justify-center gap-40 text-[14px] mt-10 p-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] font-bold underline">ABOUT US</h3>
        <div className="flex flex-col">
          <span>Name: Vi Tiến Đạt</span>
          <span>Birthday: 07/07/2000</span>
          <span>ĐẠI HỌC CÔNG NGHỆ - ĐẠI HỌC QUỐC GIA HÀ NỘI</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 ">
        <h3 className="text-[18px] font-bold underline">CONTACT US</h3>
        <div className="flex flex-col">
          <span>Phone: 0353.735.296</span>
          <span>Email: datndls0703@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
