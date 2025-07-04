import React from "react";
import KanbanBoard from "../KanbanBoard";
import Header from "../../pages/Header";
import Sidebar from "../../pages/Sidebar";
import CommonLayout from "../../pages/CommonLayout";
import Footer from "../../pages/Footer";

const UserMainPage = () => {
  const UserName=localStorage.getItem("username")
  return (
    <>
      <CommonLayout>
        <div className="">
          <div className="text-2xl font-semibold text-[#00B4D8]">Welcome back {UserName} 👋</div>
          <KanbanBoard />
        </div>
      </CommonLayout>
    </>
  );
};

export default UserMainPage;
