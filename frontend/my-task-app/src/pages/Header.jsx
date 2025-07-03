import React, { useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { TieredMenu } from "primereact/tieredmenu";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Header = () => {
  const menu = useRef(null);
  const navigate = useNavigate();

  const items = [
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => navigate("/settings"),
    },
    {
      separator: true,
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      className: "logout-item",
      command: () => {
        localStorage.clear();
        navigate("/login");
      },
    },
  ];

  return (
    // <header className="flex justify-between items-center sticky top-0 px-6 py-4 bg-[#4fb6ed] text-white shadow-md z-50">
    //   <div className="flex items-center">
    //     <img
    //       src="./src/assets/images/Logo.jpg"
    //       alt="Boardium Logo"
    //       className="h-12 w-auto object-contain"
    //     />
    //   </div>

    //   <div className="flex items-center space-x-6">
    //     {/* Search Box */}
    //     {/* <div className="flex items-center border rounded-md px-3 py-1 w-72 bg-white text-gray-800">
    //       <IoMdSearch className="text-gray-600 mr-2" />
    //       <input
    //         type="text"
    //         placeholder="Search"
    //         className="outline-none text-sm text-gray-600 w-full placeholder-gray-500"
    //       />
    //     </div> */}

    //     {/* Profile and Notifications */}
    //     <div className="flex items-center space-x-3">
    //       <TieredMenu
    //         model={items}
    //         popup
    //         ref={menu}
    //         breakpoint="767px"
    //         style={{ width: "160px" }}
    //       />
    //       <span
    //         className="bg-[#00B4D8] text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
    //         onClick={(e) => menu.current.toggle(e)}
    //       >
    //         JP
    //       </span>
    //       <MdNotificationsActive className="text-2xl text-white" />
    //     </div>
    //   </div>
    // </header>

    <header className="flex justify-between items-center sticky top-0 px-8 py-5 bg-[#1E2A47] text-white shadow-lg z-50">
      <div className="flex items-center">
        <img
          src="./src/assets/images/Logo.jpg"
          alt="Boardium Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <TieredMenu
            model={items}
            popup
            ref={menu}
            breakpoint="767px"
            style={{ width: "160px" }}
          />
          <span
            className="bg-[#00B4D8] text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
            onClick={(e) => menu.current.toggle(e)}
          >
            JP
          </span>
        </div>
        <MdNotificationsActive className="text-2xl text-white cursor-pointer hover:text-[#00B4D8]" />
      </div>
    </header>
  );
};

export default Header;
