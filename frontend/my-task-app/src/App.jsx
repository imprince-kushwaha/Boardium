import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import MainPage from "./components/Admin/AdminMainPage";
import Register from "./components/Register";
import Kendo from "./KendoKanban/Kendo";
import AllTasks from "./pages/AllTasks";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";
import UserMainPage from "./components/User/UserMainPage";
import AddProject from "./components/Admin/AddProject";
import UserManagement from "./components/Admin/UserManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MySettings from "./pages/MySettings";

function App() {
  return (
    <>
      {/* <KanbanBoard /> */}
      {/* <Kendo/>  */}

      {/* <MainPage/> */}
      
      {/* <UserMainPage/> */}

      {/* <AllTasks/> */}
      {/* <AddProject/> */}

      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserMainPage />} />
          <Route path="/projects" element={<AddProject />} />
          <Route path="/team" element={<UserManagement />} />
          <Route path="/projects/kanban/:projectId" element={<KanbanBoard />} />
          <Route path="/settings" element={<MySettings />} />
          <Route path="/" element={<Navigate to="/login" />} /> 
        </Routes>
      </Router>
      <ToastContainer position="top-right"/>
    </>
  );
}

export default App;
