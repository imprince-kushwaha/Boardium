import React from 'react'
import { MdHome } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";

const Sidebar = () => {
 const sidebarItems = [
    { name: 'Home', icon: <MdHome /> },
    { name: 'Projects', icon: <FaFolderOpen /> },
    { name: 'Tasks', icon: <BsListTask /> },
    { name: 'Team Management', icon: <IoMdPerson /> },
  ];
  return (
    <div className="w-16 sm:w-56 h-full fixed bg-white text-gray-700 shadow-md">
      <div className="p-6 text-2xl font-bold hidden sm:block">
        {/* Here at above sm(768px) the text will show else not */}
        Boardium
      </div>
      <div className="p-4 text-2xl font-bold sm:hidden text-center">
        {/* sm and above sm it will be hidden */}
        B
      </div>

      <nav className="flex flex-col space-y-2 mt-4">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 px-4 py-3 hover:bg-gray-200 cursor-pointer transition-all"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-md font-medium hidden sm:inline">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar