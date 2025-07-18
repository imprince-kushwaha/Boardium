import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AllTasks from "./pages/AllTasks";
import UserMainPage from "./components/User/UserMainPage";
import AddProject from "./components/Admin/AddProject";
import UserManagement from "./components/Admin/UserManagement";
import AdminMainPage from "./components/Admin/AdminMainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MySettings from "./pages/MySettings";
import ProjectKanban from "./components/User/ProjectKanban";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserMainPage />} />
          <Route path="/projects" element={<AddProject />} />
          <Route path="/team" element={<UserManagement />} />
          <Route path="/projects/kanban/:projectId" element={<ProjectKanban />} />
          <Route path="/settings" element={<MySettings />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
