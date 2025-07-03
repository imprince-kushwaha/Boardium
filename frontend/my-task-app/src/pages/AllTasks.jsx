import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import KanbanBoard from "../components/KanbanBoard";

const AllTasks = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header />
      <Sidebar />
      <div className="m-4 ml-20 sm:ml-60">
        <div className="flex gap-8 justify-between">
          <div className="text-4xl">Tasks</div>
          <div>
            <Button label="+ Add New Task" outlined />
          </div>
        </div>

        <div className="flex justify-end mt-2 mb-2">
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Tasks"
            className="w-2xs"
          />
        </div>

        <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2">
          <div>Task Name</div>
          <div>Assigned To</div>
          <div>Due Date</div>
          <div>Status</div>
        </div>
        {/* Here the content should be scrollable */}
      </div>
        {/* <div className="ml-20 sm:ml-60">
        <KanbanBoard/>
        </div> */}
    </>
  );
};

export default AllTasks;
