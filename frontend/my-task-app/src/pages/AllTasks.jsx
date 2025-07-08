import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import CommonLayout from "./CommonLayout";
import axios from "axios";

const AllTasks = () => {
  const [search, setSearch] = useState("");
  const [myTask, setMyTask] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]); // To store users data

  const loggedInUser = localStorage.getItem("userId");

  // Fetch tasks from the API
  const fetchTask = async () => {
    try {
      const res = await axios.get("http://localhost:5001/task");

      // Filter tasks where createdby matches the loggedInUser
      const filterTasks = res?.data.filter(
        (task) => task.createdBy == loggedInUser
      );

      setMyTask(filterTasks); // Save all tasks (filtered by creator)
      setFilteredTasks(filterTasks); // Save filtered tasks based on search
      console.log("Filtered tasks: ", filterTasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  // Fetch all users to map userId to username
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/login/users"); // Assuming there's an endpoint for users
      setUsers(res?.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    fetchTask();
    fetchUsers(); // Fetch users when component mounts
  }, []);

  // Function to get the user name based on userId
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User"; // Fallback if user not found
  };

  // Function to handle search and filter tasks
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    // Filter tasks based on search term
    const filtered = myTask.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // task.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getUserName(task.assignedTo).toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTasks(filtered);
  };

  return (
    <>
      <CommonLayout>
        <div className="m-4">
          <div className="flex gap-8 justify-between">
            <div className="text-4xl">Tasks</div>
            <div>
              <Button label="+ Add New Task" outlined />
            </div>
          </div>

          <div className="flex justify-end mt-2 mb-2">
            <InputText
              value={search}
              onChange={handleSearch} // Handle search input change
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

          {/* Display filtered tasks */}
          <div className="overflow-auto max-h-[400px]">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div key={index} className="grid grid-cols-4 py-2">
                  <div>{task.title}</div>
                  <div>{getUserName(task.assignedTo)}</div>{" "}
                  {/* Display user's name */}
                  <div>{task.date}</div>
                  <div>{task.status}</div>
                </div>
              ))
            ) : (
              <div>No tasks found</div>
            )}
          </div>
        </div>
      </CommonLayout>
    </>
  );
};

export default AllTasks;
