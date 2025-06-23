import React, { useState } from "react";
import { TaskBoard } from "@progress/kendo-react-taskboard";
import "@progress/kendo-theme-default/dist/all.css";

const initialColumns = [
  { id: 1, title: "To Do", status: "todo" },
  { id: 2, title: "In Progress", status: "inProgress" },
  { id: 3, title: "Done", status: "done" },
];

const initialTasks = [
  { id: 1, title: "Task One", description: "Details...", status: "todo", priority: "low" },
];

const priorities = [
  { priority: "low", color: "green" },
  { priority: "medium", color: "blue" },
  { priority: "high", color: "red" },
];

const KendoKanban = () => {
  const [columns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const handleChange = ({ tasks: updatedTasks }) => {
    setTasks(updatedTasks);
  };

  return (
    <div style={{ height: "80vh" }}>
      <TaskBoard
        columnData={columns}
        taskData={tasks}
        priorities={priorities}
        onChange={handleChange}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default KendoKanban;
