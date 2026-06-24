import axios from 'axios';
import React, { useContext } from 'react';
import { AdminDataContext } from '../Context/AdminContext';
import { AuthDataContext } from '../Context/AuthContext';
import { Links, useNavigate } from 'react-router-dom';
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

function Navbar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();
    const { serverUrl } = useContext(AuthDataContext);
    const { getAdmin } = useContext(AdminDataContext);

    const logout = async () => {
        try {
            await axios.get(`${serverUrl}/api/admin/logout`, { withCredentials: true });
            getAdmin();
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* FIXED NAVBAR CONTAINER */}
            <nav className="w-full h-24 bg-white shadow-md px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100">

                {/* Mobile Sidebar Toggle */}
                <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={28} />
                </button>

                {/* LOGO AREA */}
                <Link to="/" className="flex items-center py-2">
                    <img 
                        src={logo} 
                        alt="TryLo Logo" 
                        className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                    />
                </Link>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={logout}
                >
                    Logout
                </button>

            </nav>

            {/* 💡 THE GLOBAL SPACING FIX: This block creates an exact height gap (h-24) globally.
                Yeh block fixed navbar ke niche space banaye rakhay ga taake Add, List, aur Order pages 
                ka content kabhi bhi header ke piche na chhupe! */}
            <div className="h-24 w-full block clear-both"></div>
        </>
    );
}

export default Navbar;