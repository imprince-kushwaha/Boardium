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
    <div className="w-16 sm:w-56 h-full fixed bg-white text-gray-700 shadow-md">
      <div className="p-6 text-2xl font-bold hidden sm:block">
        {/* Here at above sm(768px) the text will show else not */}
        Boardium
      </div>
      <div className="p-4 text-2xl font-bold sm:hidden text-center">
        {/* sm and above sm it will be hidden */}B
      </div>

      <nav className="flex flex-col space-y-2 mt-4">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 px-4 py-3 transition-all cursor-pointer ${
                isActive
                  ? "bg-gray-300 font-semibold text-blue-600"
                  : "hover:bg-gray-200"
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
