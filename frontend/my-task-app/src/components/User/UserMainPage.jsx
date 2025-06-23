import React from "react";
import KanbanBoard from "../KanbanBoard";
import Header from "../../pages/Header";
import Sidebar from "../../pages/Sidebar";
import CommonLayout from "../../pages/CommonLayout";
import Footer from "../../pages/Footer";

const UserMainPage = () => {
  return (
    <>
      <CommonLayout>
        <div className="">
          <div>Welcome back @User_Name</div>
          <KanbanBoard />
        </div>
      </CommonLayout>
      <Footer />
    </>
  );
};

export default UserMainPage;
