// import React from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import Footer from "./Footer";

// const CommonLayout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar (Fixed Width) */}
//       <div className="mt-14">

//       <Sidebar />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-1 flex-col">
//         {/* Header */}
//         <Header />

//         {/* Dynamic Page Content */}
//         <main className="flex-1 p-4 ml-20 sm:ml-60 bg-gray-50">{children}</main>

//         {/* Footer */}
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default CommonLayout;





import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const CommonLayout = ({ children }) => {
  return (
    <div className="flex overflow-hidden">
      {/* Sidebar fixed on the left */}
      <aside className="fixed top-0 left-0 h-full w-16 sm:w-56 bg-white shadow-md z-30">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-16 sm:ml-56">
        {/*  style={{ height: "100vh" }} */}
        {/* Header fixed on top */}
        <header className="fixed top-0 sm:left-56 right-0 h-14 bg-white shadow-md z-20">
          <Header />
        </header>

        {/* Main scrollable content */}
        <main
          className="pt-18 pb-6 pl-4 overflow-auto bg-gray-50"
        //   style={{ height: "calc(100vh - 56px - 48px)" }} // 56px header + 48px footer height approx
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default CommonLayout;
