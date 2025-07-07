import React from "react";
import CommonLayout from "../../pages/CommonLayout";
import KanbanBoard from "../KanbanBoard";

const ProjectKanban = () => {
  return (
   <CommonLayout>
        <div className="">
          <KanbanBoard />
        </div>
      </CommonLayout>
  )
}

export default ProjectKanban