import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Kendo from "./KendoKanban/Kendo";
import AllTasks from "./pages/AllTasks";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";

function App() {
  return (
    <>     
      {/* <KanbanBoard /> */}
      {/* <Kendo/>  */}

      {/* <Header />
      <Sidebar /> */}
      <MainPage/>
      {/* <AllTasks/> */}
      {/* <Register/>
      <Login/> */}

    </>
  );
}

export default App;
