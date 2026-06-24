import React, { useState } from "react";
import Navbar from "../Compontent/Navbar";
import Sidebar from "../Compontent/Sidebar";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full">

      {/* SIDEBAR */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-screen">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* 💡 FIXED SPACING: pt-32 ensures content starts below the 96px fixed navbar. 
            md:pl-72 ensures on desktop the content is beautifully pushed to the right of the 64w sidebar. */}
        <div className="pt-32 p-6 md:pl-72 transition-all duration-300">
          <h1 className="text-3xl font-semibold text-gray-800">Home Page</h1>
          {/* Baqi home page ka content yahan aayega bina kisi overlap ke */}
        </div>
      </div>

    </div>
  );
}

export default Home;