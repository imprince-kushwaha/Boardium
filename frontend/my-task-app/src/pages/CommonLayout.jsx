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

      {/* Main content wrapper (with left margin for sidebar) */}
      <div className="flex flex-col flex-1 ml-16 sm:ml-56">
        {/* Header fixed on top */}
        <header className="fixed top-0 left-16 sm:left-56 right-0 h-14 bg-white shadow-md z-20">
          <Header />
        </header>

        {/* Scrollable content area between header and footer */}
        <main className="flex-1 pt-12 bg-gray-50 px-4 mt-10">
          <div className="h-[800px]">

          {children}
          </div>
        </main>

        {/* Footer fixed at bottom */}
        <footer className="fixed bottom-0 left-16 sm:left-56 right-0 bg-white shadow-md z-20">
          <Footer />
        </footer>
      </div>
    </div>
  );
};
export default CommonLayout;
