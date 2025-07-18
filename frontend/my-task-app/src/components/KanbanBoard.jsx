// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { Card, CardContent } from './Card';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';

// const initialData = {
//   columns: {
//     'todo': {
//       id: 'todo',
//       title: 'To-Do',
//       color: 'bg-yellow-100',
//       tasks: [
//         { id: 'task-1', title: 'Create a new landing page for campaign', icon: '🖥️' },
//         { id: 'task-2', title: 'Send newsletter', icon: '📧' },
//       ],
//     },
//     'inProgress': {
//       id: 'inProgress',
//       title: 'In Progress',
//       color: 'bg-blue-100',
//       tasks: [
//         { id: 'task-3', title: 'Review SEO results', icon: '🎯' },
//         { id: 'task-4', title: 'Funnel analysis', icon: '📊' },
//       ],
//     },
//     'done': {
//       id: 'done',
//       title: 'Done',
//       color: 'bg-green-100',
//       tasks: [
//         { id: 'task-5', title: 'Review shopping cart experience', icon: '🛒' },
//         { id: 'task-6', title: 'Publish new blogpost', icon: '📝' },
//       ],
//     },
//   },
// };

// export default function KanbanBoard() {
//   const [data, setData] = useState(initialData);
//   const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   const [newTask, setNewTask] = useState({ title: '', icon: '' });
//   const [activeColumnId, setActiveColumnId] = useState(null);

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceCol = data.columns[source.droppableId];
//     const destCol = data.columns[destination.droppableId];
//     const sourceTasks = [...sourceCol.tasks];
//     const [movedTask] = sourceTasks.splice(source.index, 1);

//     if (source.droppableId === destination.droppableId) {
//       sourceTasks.splice(destination.index, 0, movedTask);
//       const newCol = {
//         ...sourceCol,
//         tasks: sourceTasks,
//       };
//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [newCol.id]: newCol,
//         },
//       });
//     } else {
//       const destTasks = [...destCol.tasks];
//       destTasks.splice(destination.index, 0, movedTask);
//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
//           [destCol.id]: { ...destCol, tasks: destTasks },
//         },
//       });
//     }
//   };

//   const confirmDelete = (columnId, taskId) => {
//     setTaskToDelete({ columnId, taskId });
//     setDeleteDialogVisible(true);
//   };

//   const deleteTask = () => {
//     const { columnId, taskId } = taskToDelete;
//     const column = data.columns[columnId];
//     const newTasks = column.tasks.filter((t) => t.id !== taskId);
//     setData({
//       ...data,
//       columns: {
//         ...data.columns,
//         [columnId]: { ...column, tasks: newTasks },
//       },
//     });
//     setDeleteDialogVisible(false);
//   };

//   const addTask = (columnId) => {
//     if (!newTask.title) return;
//     const taskId = `task-${Date.now()}`;
//     const newTaskObj = { id: taskId, title: newTask.title, icon: newTask.icon || '📌' };
//     const column = data.columns[columnId];
//     const updatedColumn = {
//       ...column,
//       tasks: [...column.tasks, newTaskObj],
//     };
//     setData({
//       ...data,
//       columns: {
//         ...data.columns,
//         [columnId]: updatedColumn,
//       },
//     });
//     setNewTask({ title: '', icon: '' });
//     setActiveColumnId(null);
//   };

//   return (
//     <div className="flex gap-4 overflow-x-auto p-4 w-full">
//       <DragDropContext onDragEnd={onDragEnd}>
//         {Object.values(data.columns).map((column) => (
//           <Droppable droppableId={column.id} key={column.id}>
//             {(provided) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className={`w-72 min-w-[18rem] rounded-lg shadow-md ${column.color} p-3 flex flex-col gap-3`}
//               >
//                 <h2 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
//                   {column.title}
//                   <Button icon="pi pi-plus" rounded text aria-label="Add" onClick={() => setActiveColumnId(column.id)} />
//                 </h2>
//                 {column.tasks.map((task, index) => (
//                   <Draggable key={task.id} draggableId={task.id} index={index}>
//                     {(provided) => (
//                       <Card
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="relative bg-white rounded-lg shadow-sm border border-gray-200"
//                       >
//                         <CardContent className="p-3 flex items-center gap-2 justify-between cursor-grab">
//                           <span className="flex items-center gap-2">
//                             <span className="text-xl">{task.icon}</span>
//                             <span className="text-sm text-gray-700 font-medium">
//                               {task.title}
//                             </span>
//                           </span>
//                           <Button icon="pi pi-trash" className="p-0" text rounded severity="danger" onClick={() => confirmDelete(column.id, task.id)} />
//                         </CardContent>
//                       </Card>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//                 {activeColumnId === column.id && (
//                   <div className="flex flex-col gap-2 mt-2">
//                     <InputText
//                       value={newTask.title}
//                       onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                       placeholder="Task title"
//                       className="w-full"
//                     />
//                     <InputText
//                       value={newTask.icon}
//                       onChange={(e) => setNewTask({ ...newTask, icon: e.target.value })}
//                       placeholder="Icon (e.g., ✏️)"
//                       className="w-full"
//                     />
//                     <Button label="Add Task" onClick={() => addTask(column.id)} />
//                   </div>
//                 )}
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </DragDropContext>

//       <Dialog
//         header="Confirm Delete"
//         visible={deleteDialogVisible}
//         style={{ width: '300px' }}
//         onHide={() => setDeleteDialogVisible(false)}
//         footer={
//           <div className="flex justify-end gap-2">
//             <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" />
//             <Button label="Yes" icon="pi pi-check" onClick={deleteTask} autoFocus />
//           </div>
//         }
//       >
//         <p>Are you sure you want to delete this task?</p>
//       </Dialog>
//     </div>
//   );
// }

// DragDropContext: Wraps everything, listens to drag events.
// Droppable: Defines a droppable area (e.g., column).
// Draggable: Makes a task draggable.

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "./Card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import { useLocation, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { toast } from "react-toastify";

// const initialData = {
//   columns: {
//     todo: {
//       id: "todo",
//       title: "To-Do",
//       color: "bg-yellow-100",
//       tasks: [
//         {
//           id: "task-1",
//           title: "Create a new landing page for campaign",
//           icon: "🖥️",
//         },
//         { id: "task-2", title: "Send newsletter", icon: "📧" },
//       ],
//     },
//     inProgress: {
//       id: "inProgress",
//       title: "In Progress",
//       color: "bg-blue-100",
//       tasks: [
//         { id: "task-3", title: "Review SEO results", icon: "🎯" },
//         { id: "task-4", title: "Funnel analysis", icon: "📊" },
//       ],
//     },
//     done: {
//       id: "done",
//       title: "Done",
//       color: "bg-green-100",
//       tasks: [
//         { id: "task-5", title: "Review shopping cart experience", icon: "🛒" },
//         { id: "task-6", title: "Publish new blogpost", icon: "📝" },
//       ],
//     },
//   },
// };

const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "To-Do",
      color: "bg-yellow-200",
      tasks: [],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      color: "bg-cyan-200",
      tasks: [],
    },
    done: {
      id: "done",
      title: "Done",
      color: "bg-lime-200",
      tasks: [],
    },
  },
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [addDialogVisible, setAddDialogVisible] = useState(false);

  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);
  const role = localStorage.getItem("role"); // <-- add this line at the top

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    icon: "",
    priority: "",
    date: null,
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const priorityOptions = [
    { label: "High", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Low", value: 3 },
  ];

  const { projectId } = useParams();
  const [confettiVisible, setConfettiVisible] = useState(false); // Track confetti visibility
  const [confettiDuration, setConfettiDuration] = useState(0); // Track the confetti duration

  useEffect(() => {
    // const fetchTasks = async () => {
    //   try {
    //     const userId = localStorage.getItem("userId");
    //     const res = await axios.get(
    //       `http://localhost:5001/task?createdBy=${userId}`
    //     );
    //     // const res = await axios.get("http://localhost:5001/task");
    //     console.log("res", res);
    //     const tasks = res.data;

    //     const grouped = {
    //       todo: [],
    //       inProgress: [],
    //       done: [],
    //     };

    //     tasks.forEach((task) => {
    //       if (grouped[task.status]) {
    //         grouped[task.status].push(task);
    //       }
    //     });

    //     setData({
    //       columns: {
    //         todo: { ...initialData.columns.todo, tasks: grouped.todo },
    //         inProgress: {
    //           ...initialData.columns.inProgress,
    //           tasks: grouped.inProgress,
    //         },
    //         done: { ...initialData.columns.done, tasks: grouped.done },
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Failed to fetch tasks:", error);
    //   }
    // };
    const userId = localStorage.getItem("userId");

    // const fetchTasks = async () => {
    //   try {
    //     // const createdRes = await axios.get(
    //     //   `http://localhost:5001/task?createdBy=${userId}`
    //     // );
    //     // const assignedRes = await axios.get(
    //     //   `http://localhost:5001/task?assignedTo=${userId}`
    //     // );
    //     const createdRes = await axios.get(
    //       `http://localhost:5001/task?createdBy=${userId}&projectId=${projectId}`
    //     );
    //     const assignedRes = await axios.get(
    //       `http://localhost:5001/task?assignedTo=${userId}&projectId=${projectId}`
    //     );

    //     const createdTasks = createdRes.data;
    //     const assignedTasks = assignedRes.data.filter(
    //       (task) => task.createdBy !== parseInt(userId)
    //     ); // avoid duplication

    //     const allTasks = [...createdTasks, ...assignedTasks];

    //     const grouped = {
    //       todo: [],
    //       inProgress: [],
    //       done: [],
    //     };

    //     allTasks.forEach((task) => {
    //       if (grouped[task.status]) {
    //         grouped[task.status].push(task);
    //       }
    //     });

    //     setData({
    //       columns: {
    //         todo: { ...initialData.columns.todo, tasks: grouped.todo },
    //         inProgress: {
    //           ...initialData.columns.inProgress,
    //           tasks: grouped.inProgress,
    //         },
    //         done: { ...initialData.columns.done, tasks: grouped.done },
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Failed to fetch tasks:", error);
    //   }
    // };

    //     const fetchTasks = async () => {
    //   try {
    //     const userId = localStorage.getItem("userId");

    //     // Fetch tasks created by the user with or without projectId
    //     const createdRes = await axios.get(
    //       `http://localhost:5001/task?createdBy=${userId}&projectId=${projectId || ''}`
    //     );

    //     // Fetch tasks assigned to the user
    //     const assignedRes = await axios.get(
    //       `http://localhost:5001/task?assignedTo=${userId}&projectId=${projectId || ''}`
    //     );

    //     const createdTasks = createdRes.data;
    //     const assignedTasks = assignedRes.data.filter(
    //       (task) => task.createdBy !== parseInt(userId)
    //     );

    //     const allTasks = [...createdTasks, ...assignedTasks];

    //     const grouped = {
    //       todo: [],
    //       inProgress: [],
    //       done: [],
    //     };

    //     // Group tasks based on status
    //     allTasks.forEach((task) => {
    //       if (grouped[task.status]) {
    //         grouped[task.status].push(task);
    //       }
    //     });

    //     // Update state with tasks, including those with no projectId
    //     setData({
    //       columns: {
    //         todo: { ...initialData.columns.todo, tasks: grouped.todo },
    //         inProgress: { ...initialData.columns.inProgress, tasks: grouped.inProgress },
    //         done: { ...initialData.columns.done, tasks: grouped.done },
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Failed to fetch tasks:", error);
    //   }
    // };

    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem("userId");

        let projectQuery = projectId || ""; // If projectId is null or undefined, use an empty string

        // Fetch tasks where createdBy and assignedTo are the same when projectId is null
        if (!projectQuery) {
          const createdRes = await axios.get(
            `http://localhost:5001/task?createdBy=${userId}&assignedTo=${userId}&projectId=null`
          );
          const assignedRes = await axios.get(
            `http://localhost:5001/task?createdBy=${userId}&assignedTo=${userId}&projectId=null`
          );

          const createdTasks = createdRes.data;
          const assignedTasks = assignedRes.data.filter(
            (task) => task.createdBy !== parseInt(userId)
          );

          const allTasks = [...createdTasks, ...assignedTasks];

          const grouped = {
            todo: [],
            inProgress: [],
            done: [],
          };

          // Group tasks based on their status
          allTasks.forEach((task) => {
            if (grouped[task.status]) {
              grouped[task.status].push(task);
            }
          });

          // Update state with grouped tasks
          setData({
            columns: {
              todo: { ...initialData.columns.todo, tasks: grouped.todo },
              inProgress: {
                ...initialData.columns.inProgress,
                tasks: grouped.inProgress,
              },
              done: { ...initialData.columns.done, tasks: grouped.done },
            },
          });
        } else {
          // Fetch tasks for a specific projectId
          const createdRes = await axios.get(
            `http://localhost:5001/task?createdBy=${userId}&projectId=${projectQuery}`
          );
          const assignedRes = await axios.get(
            `http://localhost:5001/task?assignedTo=${userId}&projectId=${projectQuery}`
          );

          const createdTasks = createdRes.data;
          const assignedTasks = assignedRes.data.filter(
            (task) => task.createdBy !== parseInt(userId)
          );

          const allTasks = [...createdTasks, ...assignedTasks];

          const grouped = {
            todo: [],
            inProgress: [],
            done: [],
          };

          // Group tasks based on their status
          allTasks.forEach((task) => {
            if (grouped[task.status]) {
              grouped[task.status].push(task);
            }
          });

          // Update state with grouped tasks
          setData({
            columns: {
              todo: { ...initialData.columns.todo, tasks: grouped.todo },
              inProgress: {
                ...initialData.columns.inProgress,
                tasks: grouped.inProgress,
              },
              done: { ...initialData.columns.done, tasks: grouped.done },
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/login/users");
        setUsers(res.data); // Should return list of users
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  // const onDragEnd = (result) => {
  //   const { source, destination } = result;
  //   if (!destination) return;

  //   const sourceCol = data.columns[source.droppableId];
  //   const destCol = data.columns[destination.droppableId];
  //   const sourceTasks = [...sourceCol.tasks];
  //   const [movedTask] = sourceTasks.splice(source.index, 1);

  //   if (source.droppableId === destination.droppableId) {
  //     sourceTasks.splice(destination.index, 0, movedTask);
  //     const newCol = {
  //       ...sourceCol,
  //       tasks: sourceTasks,
  //     };
  //     setData({
  //       ...data,
  //       columns: {
  //         ...data.columns,
  //         [newCol.id]: newCol,
  //       },
  //     });
  //   } else {
  //     const destTasks = [...destCol.tasks];
  //     destTasks.splice(destination.index, 0, movedTask);
  //     setData({
  //       ...data,
  //       columns: {
  //         ...data.columns,
  //         [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
  //         [destCol.id]: { ...destCol, tasks: destTasks },
  //       },
  //     });
  //   }
  // };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];
    const sourceTasks = [...sourceCol.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const newCol = {
        ...sourceCol,
        tasks: sourceTasks,
      };
      setData({
        ...data,
        columns: {
          ...data.columns,
          [newCol.id]: newCol,
        },
      });
    } else {
      const destTasks = [...destCol.tasks];
      movedTask.status = destCol.id; // update task status

      try {
        await axios.put(`http://localhost:5001/task/${movedTask.id}`, {
          status: destCol.id, // This is what updates the task
        });
      } catch (error) {
        console.error("Failed to update task status:", error);
      }

      destTasks.splice(destination.index, 0, movedTask);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
          [destCol.id]: { ...destCol, tasks: destTasks },
        },
      });
      // Show confetti when a task is moved to "done"
      if (destCol.id === "done") {
        setConfettiVisible(true);
        setConfettiDuration(6000); // Confetti will show for 5 seconds
        setTimeout(() => setConfettiVisible(false), 6000); // Hide confetti after 5 seconds
      }
    }
  };

  const confirmDelete = (columnId, taskId) => {
    setTaskToDelete({ columnId, taskId });
    setDeleteDialogVisible(true);
  };

  const deleteTask = async () => {
    const { columnId, taskId } = taskToDelete;

    try {
      await axios.delete(`http://localhost:5001/task/${taskId}`);

      const column = data.columns[columnId];
      const newTasks = column.tasks.filter((t) => t.id !== taskId);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [columnId]: { ...column, tasks: newTasks },
        },
      });
      setDeleteDialogVisible(false);
      toast.warn("Task deleted", { autoClose: 3000 })
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // const addTask = (columnId) => {
  //   if (!newTask.title) return;
  //   const taskId = `task-${Date.now()}`;
  //   console.log(taskId, "taskId");
  //   const newTaskObj = {
  //     id: taskId,
  //     title: newTask.title,
  //     description: newTask.description || "",
  //     icon: newTask.icon || "📌",
  //     priority: newTask.priority,
  //     date: newTask.date ? newTask.date.toISOString().split("T")[0] : null,
  //   };

  //   const column = data.columns[columnId];
  //   const updatedColumn = {
  //     ...column,
  //     tasks: [...column.tasks, newTaskObj],
  //   };

  //   setData({
  //     ...data,
  //     columns: {
  //       ...data.columns,
  //       [columnId]: updatedColumn,
  //     },
  //   });

  //   setNewTask({
  //     title: "",
  //     description: "",
  //     icon: "",
  //     priority: "",
  //     date: null,
  //   });
  //   setAddDialogVisible(false);
  // };

  const addTask = async (columnId) => {
    if (!newTask.title) return;
    // if (!newTask.title || !assignedTo) return;
    const createdBy = parseInt(localStorage.getItem("userId")); // set this after login
    // const projectId = window.location.pathname.split("/").pop(); // Assuming route: /projects/kanban/:projectId
    const path = window.location.pathname;

    // Check if the current URL matches `/projects/kanban/:projectId`
    const projectId = /\/projects\/kanban\/(\d+)/.test(path)
      ? path.split("/").pop() // Extract the projectId from the URL
      : null; // If the route doesn't match, set projectId to null
    console.log("projectId", projectId);

    const getTodayDate = new Date(
      Date.UTC(
        newTask.date.getFullYear(),
        newTask.date.getMonth(),
        newTask.date.getDate()
      )
    );
    console.log("getTodayDate", getTodayDate);
    const taskData = {
      title: newTask.title,
      description: newTask.description || "",
      icon: newTask.icon || "📌",
      priority: newTask.priority,
      date: getTodayDate,
      // date: newTask.date ? newTask.date.toISOString().split("T")[0] : null,
      status: "todo", // always starts in "todo"
      createdBy,
      assignedTo,
      ...(projectId ? { projectId } : {}), // ✅ only include if exists,
    };

    try {
      const response = await axios.post("http://localhost:5001/task", taskData);
      const savedTask = await response.data;

      // Add backend task to state
      const column = data.columns[columnId];
      const updatedColumn = {
        ...column,
        tasks: [...column.tasks, savedTask],
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [columnId]: updatedColumn,
        },
      });

      // Reset form
      setNewTask({
        title: "",
        description: "",
        icon: "",
        priority: "",
        date: null,
      });
      setAddDialogVisible(false);
      toast.success("Task in Todo Added Successfully", { autoClose: 3000 })
    } catch (err) {
      console.error("Failed to add task:", err.response?.data || err.message);
    }
  };

  const isOverdue = (taskDate) => {
    const today = new Date();
    return new Date(taskDate) < today;
  };
  const UserName = localStorage.getItem("username");
  const location = useLocation();
  return (
    <div className="pt-4">
      <div className="pb-2">
        {location.pathname.startsWith("/home") ? (
          <div className="flex justify-between items-center text-2xl font-semibold text-[#00B4D8]">
            <span>Welcome back {UserName} 👋</span>
            <Button
              icon="pi pi-plus"
              label="Add new Task"
              outlined
              className="p-button-sm" // For smaller button
              onClick={() => {
                setActiveColumnId("todo"); // Set any column here
                setAddDialogVisible(true);
              }}
            />
          </div>
        ) : (
          <div className="flex justify-end">
            <Button
              icon="pi pi-plus"
              label="Add new Task"
              outlined
              className="p-button-sm" // For smaller button
              onClick={() => {
                setActiveColumnId("todo"); // Set any column here
                setAddDialogVisible(true);
              }}
            />
          </div>
        )}
      </div>

      {/* w-screen overflow-x-auto p-4 */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 w-full min-w-full">
          {Object.values(data.columns).map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  className={`w-full min-w-[18rem] rounded-lg shadow-md ${column.color} flex flex-col h-[730px]`}
                >
                  {/* Sticky Header */}
                  <div className="sticky top-0 z-10 bg-inherit p-3 border-b">
                    <h2 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
                      <span>
                        {column.title}{" "}
                        <span className="text-sm text-gray-600">
                          ({column.tasks.length})
                        </span>
                      </span>

                      {/* Show Add Button only for 'todo' column */}
                      {/* {column.id === "todo" && (
                        <Button
                          icon="pi pi-plus"
                          rounded
                          text
                          aria-label="Add"
                          onClick={() => {
                            setActiveColumnId(column.id);
                            setAddDialogVisible(true);
                          }}
                        />
                      )} */}
                    </h2>
                  </div>

                  {/* Scrollable Task Content */}
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={JSON.stringify(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            // className="relative bg-white rounded-lg shadow-sm border border-gray-200"
                            className={`relative bg-white rounded-lg shadow-sm  ${
                              task.priority === 1
                                ? "border-l-4 border-red-500"
                                : task.priority === 2
                                ? "border-l-4 border-pink-600"
                                : task.priority === 3
                                ? "border-l-4 border-green-500"
                                : ""
                            }`}
                          >
                            <CardContent className="p-3 flex items-center gap-2 justify-between cursor-grab">
                              <span className="flex flex-col">
                                <span className="flex items-center gap-2">
                                  <span className="text-2xl">{task.icon}</span>
                                  <span className="text-base text-gray-700 font-medium">
                                    {task.title}
                                  </span>
                                  {isOverdue(task.date) && (
                                    <span className="ml-2 text-xs text-red-500">
                                      Overdue
                                    </span>
                                  )}
                                </span>
                                {task.description && (
                                  <span className="text-sm text-gray-500 ml-7">
                                    {task.description}
                                  </span>
                                )}
                                {task.date && (
                                  <span className="text-xs text-gray-500 ml-7">
                                    Due Date: {task.date}
                                  </span>
                                )}
                              </span>
                              {["todo", "inProgress"].includes(column.id) && (
                                <Button
                                  icon="pi pi-trash"
                                  className="p-0"
                                  text
                                  rounded
                                  severity="danger"
                                  onClick={() =>
                                    confirmDelete(column.id, task.id)
                                  }
                                />
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Confetti Effect - Only visible when a task is moved to 'done' */}
      {confettiVisible && (
        <Confetti
          numberOfPieces={150} // Increase for more confetti pieces
          gravity={0.4}
        />
      )}

      <Dialog
        header="Add New Task"
        visible={addDialogVisible}
        style={{ width: "550px" }}
        onHide={() => setAddDialogVisible(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setAddDialogVisible(false)}
            />
            <Button
              label="Add Task"
              icon="pi pi-check"
              onClick={() => addTask(activeColumnId)}
              autoFocus
            />
          </div>
        }
      >
        <div className="flex flex-col gap-3 m-1">
          <InputText
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task Title"
          />
          <InputTextarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Task Description"
          />
          <div className="flex flex-col relative w-full">
            <div className="flex w-full items-center gap-2">
              <InputText
                value={newTask.icon}
                disabled
                onChange={(e) =>
                  setNewTask({ ...newTask, icon: e.target.value })
                }
                placeholder="Choose Icon"
                className="flex-1"
              />
              <Button
                icon="pi pi-face-smile"
                type="button"
                text
                rounded
                size="large"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              />
            </div>

            {/* Emoji Picker below the input field */}
            {showEmojiPicker && (
              <div className="mt-2 z-50">
                <EmojiPicker
                  height={300}
                  previewConfig={{
                    showPreview: false, // This hides the "What's your mood?" caption
                  }}
                  onEmojiClick={(emojiData) => {
                    setNewTask({ ...newTask, icon: emojiData.emoji });
                    setShowEmojiPicker(false);
                  }}
                  width="100%"
                  suggestedEmojisMode={null}
                />
              </div>
            )}
          </div>

          <Dropdown
            value={newTask.priority}
            options={priorityOptions}
            onChange={(e) => setNewTask({ ...newTask, priority: e.value })}
            placeholder="Select Priority"
          />
          {role == 1 && (
            <MultiSelect
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.value)}
              options={users.map((user) => ({
                label: user.name,
                value: user.id,
              }))}
              placeholder="Assign to"
              display="chip"
            />
          )}
          <Calendar
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.value })}
            showIcon
            dateFormat="yy-mm-dd"
            placeholder="Select Due Date"
            minDate={new Date()}
          />
        </div>
      </Dialog>

      <Dialog
        header="Confirm Delete"
        visible={deleteDialogVisible}
        style={{ width: "400px" }}
        onHide={() => setDeleteDialogVisible(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setDeleteDialogVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={deleteTask}
              autoFocus
            />
          </div>
        }
      >
        <p>Are you sure you want to delete this task?</p>
      </Dialog>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { Card, CardContent } from "./Card";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import EmojiPicker from "emoji-picker-react";
// import axios from "axios";
// import { MultiSelect } from "primereact/multiselect";
// import { useParams } from "react-router-dom";

// const initialData = {
//   columns: {
//     todo: {
//       id: "todo",
//       title: "To-Do",
//       color: "bg-yellow-100",
//       tasks: [],
//     },
//     inProgress: {
//       id: "inProgress",
//       title: "In Progress",
//       color: "bg-blue-100",
//       tasks: [],
//     },
//     done: {
//       id: "done",
//       title: "Done",
//       color: "bg-green-100",
//       tasks: [],
//     },
//   },
// };

// export default function KanbanBoard() {
//   const [data, setData] = useState(initialData);
//   const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   const [activeColumnId, setActiveColumnId] = useState(null);
//   const [addDialogVisible, setAddDialogVisible] = useState(false);

//   const [users, setUsers] = useState([]);
//   const [assignedTo, setAssignedTo] = useState(null);
//   const role = localStorage.getItem("role");

//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     icon: "",
//     priority: "",
//     date: null,
//   });
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const priorityOptions = [
//     { label: "High", value: 1 },
//     { label: "Medium", value: 2 },
//     { label: "Low", value: 3 },
//   ];

//   const { projectId } = useParams();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const userId = localStorage.getItem("userId");

//         let projectQuery = projectId || '';

//         if (!projectQuery) {
//           const createdRes = await axios.get(
//             `http://localhost:5001/task?createdBy=${userId}&assignedTo=${userId}&projectId=null`
//           );
//           const assignedRes = await axios.get(
//             `http://localhost:5001/task?createdBy=${userId}&assignedTo=${userId}&projectId=null`
//           );

//           const createdTasks = createdRes.data;
//           const assignedTasks = assignedRes.data.filter(
//             (task) => task.createdBy !== parseInt(userId)
//           );

//           const allTasks = [...createdTasks, ...assignedTasks];

//           const grouped = {
//             todo: [],
//             inProgress: [],
//             done: [],
//           };

//           allTasks.forEach((task) => {
//             if (grouped[task.status]) {
//               grouped[task.status].push(task);
//             }
//           });

//           setData({
//             columns: {
//               todo: { ...initialData.columns.todo, tasks: grouped.todo },
//               inProgress: { ...initialData.columns.inProgress, tasks: grouped.inProgress },
//               done: { ...initialData.columns.done, tasks: grouped.done },
//             },
//           });
//         } else {
//           const createdRes = await axios.get(
//             `http://localhost:5001/task?createdBy=${userId}&projectId=${projectQuery}`
//           );
//           const assignedRes = await axios.get(
//             `http://localhost:5001/task?assignedTo=${userId}&projectId=${projectQuery}`
//           );

//           const createdTasks = createdRes.data;
//           const assignedTasks = assignedRes.data.filter(
//             (task) => task.createdBy !== parseInt(userId)
//           );

//           const allTasks = [...createdTasks, ...assignedTasks];

//           const grouped = {
//             todo: [],
//             inProgress: [],
//             done: [],
//           };

//           allTasks.forEach((task) => {
//             if (grouped[task.status]) {
//               grouped[task.status].push(task);
//             }
//           });

//           setData({
//             columns: {
//               todo: { ...initialData.columns.todo, tasks: grouped.todo },
//               inProgress: { ...initialData.columns.inProgress, tasks: grouped.inProgress },
//               done: { ...initialData.columns.done, tasks: grouped.done },
//             },
//           });
//         }
//       } catch (error) {
//         console.error("Failed to fetch tasks:", error);
//       }
//     };

//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5001/login/users");
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//     };

//     fetchTasks();
//     fetchUsers();
//   }, []);

//   const onDragEnd = async (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceCol = data.columns[source.droppableId];
//     const destCol = data.columns[destination.droppableId];
//     const sourceTasks = [...sourceCol.tasks];
//     const [movedTask] = sourceTasks.splice(source.index, 1);

//     if (source.droppableId === destination.droppableId) {
//       sourceTasks.splice(destination.index, 0, movedTask);
//       const newCol = {
//         ...sourceCol,
//         tasks: sourceTasks,
//       };
//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [newCol.id]: newCol,
//         },
//       });
//     } else {
//       const destTasks = [...destCol.tasks];
//       movedTask.status = destCol.id;

//       try {
//         await axios.put(`http://localhost:5001/task/${movedTask.id}`, {
//           status: destCol.id,
//         });
//       } catch (error) {
//         console.error("Failed to update task status:", error);
//       }

//       destTasks.splice(destination.index, 0, movedTask);
//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
//           [destCol.id]: { ...destCol, tasks: destTasks },
//         },
//       });
//     }
//   };

//   const confirmDelete = (columnId, taskId) => {
//     setTaskToDelete({ columnId, taskId });
//     setDeleteDialogVisible(true);
//   };

//   const deleteTask = async () => {
//     const { columnId, taskId } = taskToDelete;

//     try {
//       await axios.delete(`http://localhost:5001/task/${taskId}`);

//       const column = data.columns[columnId];
//       const newTasks = column.tasks.filter((t) => t.id !== taskId);

//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [columnId]: { ...column, tasks: newTasks },
//         },
//       });
//       setDeleteDialogVisible(false);
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   };

//   const addTask = async (columnId) => {
//     // Ensure we have a valid column, default to "todo" if not provided
//     const column = columnId ? data.columns[columnId] : data.columns.todo;

//     if (!newTask.title) return;

//     const createdBy = parseInt(localStorage.getItem("userId"));
//     const path = window.location.pathname;

//     const projectId = /\/projects\/kanban\/(\d+)/.test(path)
//       ? path.split("/").pop()
//       : null;

//     const taskData = {
//       title: newTask.title,
//       description: newTask.description || "",
//       icon: newTask.icon || "📌",
//       priority: newTask.priority,
//       date: newTask.date ? newTask.date.toISOString().split("T")[0] : null,
//       status: column.id, // set the status of the task to the column's id
//       createdBy,
//       assignedTo,
//       ...(projectId ? { projectId } : {}),
//     };

//     try {
//       const response = await axios.post("http://localhost:5001/task", taskData);
//       const newTaskData = response.data;

//       const updatedColumn = {
//         ...column,
//         tasks: [...column.tasks, newTaskData],
//       };

//       setData({
//         ...data,
//         columns: {
//           ...data.columns,
//           [updatedColumn.id]: updatedColumn,
//         },
//       });
//       setAddDialogVisible(false);
//       setNewTask({
//         title: "",
//         description: "",
//         icon: "",
//         priority: "",
//         date: null,
//       });
//     } catch (error) {
//       console.error("Failed to add task:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Button
//           icon="pi pi-plus"
//           rounded
//           text
//           aria-label="Add"
//           onClick={() => {
//             setActiveColumnId(null);  // No column assigned initially
//             setAddDialogVisible(true);
//           }}
//           className="absolute top-4 right-4 z-10"
//         />
//         <div className="flex gap-4 w-full min-w-full">
//           {Object.values(data.columns).map((column) => (
//             <Droppable droppableId={column.id} key={column.id}>
//               {(provided) => (
//                 <div
//                   className={`w-full min-w-[18rem] rounded-lg shadow-md ${column.color} flex flex-col h-[740px]`}
//                 >
//                   <div className="sticky top-0 z-10 bg-inherit p-3 border-b">
//                     <h2 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
//                       <span>
//                         {column.title}{" "}
//                         <span className="text-sm text-gray-600">
//                           ({column.tasks.length})
//                         </span>
//                       </span>
//                     </h2>
//                   </div>

//                   <div
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
//                   >
//                     {column.tasks.map((task, index) => (
//                       <Draggable
//                         key={task.id}
//                         draggableId={JSON.stringify(task.id)}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <Card
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className={`relative bg-white rounded-lg shadow-sm  ${
//                               task.priority === 1
//                                 ? "border-l-4 border-red-500"
//                                 : task.priority === 2
//                                 ? "border-l-4 border-pink-600"
//                                 : task.priority === 3
//                                 ? "border-l-4 border-green-500"
//                                 : ""
//                             }`}
//                           >
//                             <CardContent className="p-3 flex items-center gap-2 justify-between cursor-grab">
//                               <span className="flex flex-col">
//                                 <span className="flex items-center gap-2">
//                                   <span className="text-2xl">{task.icon}</span>
//                                   <span className="text-base text-gray-700 font-medium">
//                                     {task.title}
//                                   </span>
//                                 </span>
//                                 {task.description && (
//                                   <span className="text-sm text-gray-500 ml-7">
//                                     {task.description}
//                                   </span>
//                                 )}
//                                 {task.date && (
//                                   <span className="text-xs text-gray-500 ml-7">
//                                     Due Date: {task.date}
//                                   </span>
//                                 )}
//                               </span>
//                               {["todo", "inProgress"].includes(column.id) && (
//                                 <Button
//                                   icon="pi pi-trash"
//                                   className="p-0"
//                                   text
//                                   rounded
//                                   severity="danger"
//                                   onClick={() =>
//                                     confirmDelete(column.id, task.id)
//                                   }
//                                 />
//                               )}
//                             </CardContent>
//                           </Card>
//                         )}
//                       </Draggable>
//                     ))}

//                     {provided.placeholder}
//                   </div>
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>

//       <Dialog
//         header="Add New Task"
//         visible={addDialogVisible}
//         style={{ width: "550px" }}
//         onHide={() => setAddDialogVisible(false)}
//         footer={
//           <div className="flex justify-end gap-2">
//             <Button
//               label="Cancel"
//               icon="pi pi-times"
//               className="p-button-text"
//               onClick={() => setAddDialogVisible(false)}
//             />
//             <Button
//               label="Add Task"
//               icon="pi pi-check"
//               onClick={() => addTask(activeColumnId)}
//               autoFocus
//             />
//           </div>
//         }
//       >
//         <div className="flex flex-col gap-3 m-1">
//           <InputText
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             placeholder="Task Title"
//           />
//           <InputTextarea
//             value={newTask.description}
//             onChange={(e) =>
//               setNewTask({ ...newTask, description: e.target.value })
//             }
//             placeholder="Task Description"
//           />
//           <div className="flex flex-col relative w-full">
//             <div className="flex w-full items-center gap-2">
//               <InputText
//                 value={newTask.icon}
//                 disabled
//                 onChange={(e) =>
//                   setNewTask({ ...newTask, icon: e.target.value })
//                 }
//                 placeholder="Choose Icon"
//                 className="flex-1"
//               />
//               <Button
//                 icon="pi pi-face-smile"
//                 type="button"
//                 text
//                 rounded
//                 size="large"
//                 onClick={() => setShowEmojiPicker((prev) => !prev)}
//               />
//             </div>

//             {showEmojiPicker && (
//               <div className="mt-2 z-50">
//                 <EmojiPicker
//                   onEmojiClick={(emojiData) => {
//                     setNewTask({ ...newTask, icon: emojiData.emoji });
//                     setShowEmojiPicker(false);
//                   }}
//                   width="100%"
//                   suggestedEmojisMode={null}
//                 />
//               </div>
//             )}
//           </div>

//           <Dropdown
//             value={newTask.priority}
//             options={priorityOptions}
//             onChange={(e) => setNewTask({ ...newTask, priority: e.value })}
//             placeholder="Select Priority"
//           />
//           {role == 1 && (
//             <MultiSelect
//               value={assignedTo}
//               onChange={(e) => setAssignedTo(e.value)}
//               options={users.map((user) => ({
//                 label: user.name,
//                 value: user.id,
//               }))}
//               placeholder="Assign to"
//               display="chip"
//             />
//           )}
//           <Calendar
//             value={newTask.date}
//             onChange={(e) => setNewTask({ ...newTask, date: e.value })}
//             showIcon
//             dateFormat="yy-mm-dd"
//             placeholder="Select Due Date"
//             minDate={new Date()}
//           />
//         </div>
//       </Dialog>
//     </div>
//   );
// }
