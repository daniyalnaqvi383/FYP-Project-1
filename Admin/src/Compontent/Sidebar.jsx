import { NavLink } from "react-router-dom";
import { X, PlusCircle, List, PackageSearch } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  
  return (
    <>
      {/* MOBILE SIDEBAR */}
      {/* 💡 Increased z-index to z-[60] so it slides over the top of the fixed h-24 navbar smoothly on mobile devices */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[60] transform transition-transform duration-300 md:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 z-50"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={26} />
        </button>

        <ul className="mt-20 space-y-4 px-6">
          <SidebarLinks />
        </ul>
      </div>

      {/* DARK OVERLAY */}
      {/* 💡 Adjusted overlay z-index to z-[55] to stay right below the mobile panel but above the fixed top navbar */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-[55]"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* DESKTOP SIDEBAR */}
      {/* 💡 Shifted down using top-24 to align right under the h-24 wrapper. Screen height adjusted safely */}
      <div className="hidden md:block fixed top-24 left-0 h-[calc(100vh-96px)] w-64 bg-white shadow-lg pt-4 z-40">
        <ul className="space-y-4 px-6">
          <SidebarLinks />
        </ul>
      </div>
    </>
  );
}

function SidebarLinks() {
  return (
    <>
      <li>
        <NavLink to="/add" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-100">
          <PlusCircle size={20} /> Add
        </NavLink>
      </li>

      <li>
        <NavLink to="/list" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-100">
          <List size={20} /> List
        </NavLink>
      </li>

      <li>
        <NavLink to="/order" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-100">
          <PackageSearch size={20} /> Orders
        </NavLink>
      </li>
    </>
  );
}