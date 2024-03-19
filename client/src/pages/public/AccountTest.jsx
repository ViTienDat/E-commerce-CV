import React from "react";

const AccountTest = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 w-main m-auto">
        <div className="flex gap-10">
          <span>Admin acount: admin</span>
          <span>|</span>
          <span>Password: 123456</span>
        </div>
        <div className="flex gap-10">
          <span>User acount: user1@gmail.com</span>
          <span>|</span>
          <span>Password: 123456</span>
        </div>
      </div>
      <div className="py-[100px]"></div>
    </div>
  );
};

export default AccountTest;
