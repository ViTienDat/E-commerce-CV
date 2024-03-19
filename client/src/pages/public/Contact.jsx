import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full">
      <div className="text-[14px] bg-[#f5f5f5] py-[15px] w-full ">
        <div className="w-main m-auto">
          <Link to={`/`}>
            <span className="hover:text-main">Trang chủ </span>
          </Link>
          / <span className="text-main">Contact</span>
        </div>
      </div>
      <div className="w-main m-auto my-10">
        <div className="font-bold text-xl mb-7">CONTACT</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-6">
            <span className="font-medium text-[20px]">- Name : </span>
            <span className="flex items-end">Vi Tiến Đạt</span>
          </div>
          <div className="flex gap-6">
            <span className="font-medium text-[20px]">- Phone : </span>
            <span className="flex items-end">0353735296</span>
          </div>
          <div className="flex gap-6">
            <span className="font-medium text-[20px]">- Email : </span>
            <span className="flex items-end">datndls0703@gmail.com</span>
          </div>
          <div className="flex gap-6">
            <span className="font-medium text-[20px]">- Facebook : </span>
            <span
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=100068875787150",
                  "_blank"
                )
              }
              title="Link facebook"
              className="flex items-end cursor-pointer text-blue-500"
            >
              <FaFacebookSquare size={30} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
