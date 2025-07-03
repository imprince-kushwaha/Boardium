import React, { useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { TieredMenu } from "primereact/tieredmenu";
import { useNavigate } from "react-router-dom"; // Add this import
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // PrimeReact core CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS

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
    <header className="flex justify-between items-center sticky px-6 py-3 bg-white shadow-lg">
      <div className="flex items-center">
        <img
          src="./src/assets/images/Logo.jpg"
          alt="Boardium Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* space-x: Applies horizontal margin to elements within a container.Specifically, it adds margin-right to all elements except the last one. */}
        <div className="flex items-center border rounded-md px-3 py-1 w-72">
          <IoMdSearch className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm text-gray-600 w-40 placeholder-gray-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <TieredMenu
            model={items}
            popup
            ref={menu}
            breakpoint="767px"
            style={{ width: "160px" }}
          />
          <span
            className="bg-blue-700 text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
            onClick={(e) => menu.current.toggle(e)}
          >
            JP
          </span>
          <MdNotificationsActive className="text-2xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
