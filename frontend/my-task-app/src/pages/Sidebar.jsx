import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";

const Sidebar = () => {
  const sidebarItems = [
    { name: "Home", icon: <MdHome />, path: "/home" },
    { name: "Projects", icon: <FaFolderOpen />, path: "/projects" },
    { name: "Tasks", icon: <BsListTask />, path: "/tasks" },
    { name: "Team Management", icon: <IoMdPerson />, path: "/team" },
  ];

  return (

    // <div className="w-16 sm:w-56 h-full fixed bg-[#2C3E50] text-white shadow-md">
    //   <div className="p-6 pt-9 text-2xl font-bold hidden sm:block">
    //     {/* Here at above sm(768px) the text will show else not */}
    //     Boardium
    //   </div>
    //   <div className="p-4 text-2xl font-bold sm:hidden text-center">
    //     {/* sm and above sm it will be hidden */}B
    //   </div>

    //   <nav className="flex flex-col space-y-2 mt-1">
    //     {sidebarItems.map((item, index) => (
    //       <NavLink
    //         key={index}
    //         to={item.path}
    //         className={({ isActive }) =>
    //           `flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 px-4 py-3 transition-all cursor-pointer ${
    //             // isActive
    //             //   ? "bg-gray-400 font-semibold text-blue-600"
    //             //   : "hover:bg-gray-300"
    //              isActive
    //               ? "bg-[#00B4D8] font-semibold"
    //               : "hover:bg-[#00C6D7] hover:font-semibold"
    //           }`
    //         }
    //       >
    //         <span className="text-xl">{item.icon}</span>
    //         <span className="text-md font-medium hidden sm:inline">
    //           {item.name}
    //         </span>
    //       </NavLink>
    //     ))}
    //   </nav>
    // </div>
    <div className="w-16 sm:w-56 h-full fixed bg-[#1E2A47] text-white shadow-lg">
      <div className="p-6 pt-9 text-2xl font-bold text-center text-[#00B4D8] hidden sm:block">
        Boardium
      </div>
      <div className="p-4 pt-9 text-2xl font-bold sm:hidden text-center text-[#00B4D8]">
        B
      </div>

      <nav className="flex flex-col space-y-3 mt-3">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 px-4 py-3 transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00B4D8] font-semibold text-white"
                  : "hover:bg-[#34495E] hover:text-white hover:font-semibold"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-md font-medium hidden sm:inline">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
