import React from "react";
import KanbanBoard from "../KanbanBoard";
import CommonLayout from "../../pages/CommonLayout";

const UserMainPage = () => {
  const UserName=localStorage.getItem("username")
  return (
    <>
      <CommonLayout>
        <div className="">
          {/* <div className="text-2xl font-semibold text-[#00B4D8]">Welcome back {UserName} 👋</div> */}
          <KanbanBoard />
        </div>
      </CommonLayout>
    </>
  );
};

export default UserMainPage;
