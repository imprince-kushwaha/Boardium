import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import CommonLayout from "../../pages/CommonLayout";
import Footer from "../../pages/Footer";
import { toast } from "react-toastify";

const priorityOptions = [
  { label: "Urgent", value: 1 },
  { label: "Routine", value: 2 },
  { label: "High priority", value: 3 },
  { label: "Medium priority", value: 4 },
  { label: "Low priority", value: 5 },
];

const priorityColors = {
  1: "bg-red-600 text-white",
  2: "bg-blue-500 text-white",
  3: "bg-indigo-600 text-white",
  4: "bg-yellow-400 text-white",
  5: "bg-green-600 text-white",
};

const AddProject = () => {
  const [visible, setVisible] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [priority, setPriority] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5001/project");
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    if (!projectName || !priority || !createdDate) {
      toast.warn("Please fill all fields.", { autoClose: 3000 });
      return;
    }

    try {
      await axios.post("http://localhost:5001/project", {
        projectName,
        projectPriority: priority,
        projectCreatedDate: createdDate.toISOString().split("T")[0],
        projectCreatedBy:localStorage.getItem('userId')
      });

      toast.success("Project added!", { autoClose: 3000 });

      setVisible(false);
      setProjectName("");
      setPriority(null);
      setCreatedDate(null);
      fetchProjects();
    } catch (err) {
      console.error("Could not add project.",err.response?.data || err.message)
      toast.error("Could not add project.", { autoClose: 3000 });
    }
  };

  const getPriorityLabel = (value) => {
    const option = priorityOptions.find((opt) => opt.value === value);
    return option?.label || "Unknown";
  };

  return (
    <>
      <CommonLayout>
        <div className="h-[82vh]">
          <div className="flex justify-between items-center m-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <Button
              label="Add Project"
              icon="pi pi-plus"
              onClick={() => setVisible(true)}
              rounded
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="rounded-xl border shadow-md p-4 bg-white flex flex-col justify-between"
              >
                <div className="font-semibold text-lg mb-1">
                  {project.projectName}
                </div>
                <div className="text-sm mb-2">
                  Due Date:{" "}
                  <span className="font-medium text-black">
                    {project.projectCreatedDate}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full self-start font-medium ${
                    priorityColors[project.projectPriority]
                  }`}
                >
                  {getPriorityLabel(project.projectPriority)}
                </span>
              </div>
            ))}
          </div>

          <Dialog
            header="Add Project"
            visible={visible}
            style={{ width: "35vw" }}
            onHide={() => setVisible(false)}
            footer={
              <div className="flex justify-end gap-2">
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  className="p-button-text"
                  onClick={() => setVisible(false)}
                />
                <Button
                  label="Add Project"
                  icon="pi pi-check"
                  onClick={handleAddProject}
                  autoFocus
                />
              </div>
            }
          >
            <div className="flex flex-col gap-3 mt-1">
              <InputText
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Dropdown
                value={priority}
                options={priorityOptions}
                onChange={(e) => setPriority(e.value)}
                placeholder="Select Priority"
              />
              <Calendar
                value={createdDate}
                onChange={(e) => setCreatedDate(e.value)}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="Select Due Date"
                minDate={new Date()} // disables all past dates
              />
            </div>
          </Dialog>
        </div>
      </CommonLayout>

      <Footer />
    </>
  );
};

export default AddProject;
