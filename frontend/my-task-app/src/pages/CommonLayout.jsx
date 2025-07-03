import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const CommonLayout = ({ children }) => {
  return (

    <div className="flex flex-col h-screen">
    {/* Fixed Header */}
    <header className="fixed top-0 left-0 right-0 z-10">
      <Header />
    </header>

    <div className="flex flex-1 mt-[64px]"> {/* Adjust mt for header height */}
      {/* Sidebar */}
      <Sidebar />

      {/* Scrollable Main Content Area */}
      <main className="flex-1 bg-gray-50 p-6 sm:ml-60 ml-15">
        {children}
      </main>
    </div>

    {/* Fixed Footer */}
    <footer className="fixed bottom-0 left-0 right-0 z-10">
      <Footer />
    </footer>
  </div>
  );
};

export default CommonLayout;
