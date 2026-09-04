'use client'
import React, { useState, useEffect } from 'react';
import { TiTickOutline } from "react-icons/ti";
import { CiStar } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoMdHome } from "react-icons/io";
import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";
import axios from 'axios';
import './admin.css';
import ThemeToggle from "@/components/ThemeToggle";

const SideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await axios.get("/api/me");
                setUserRole(res.data.user.role);
            } catch (error) { }
        };
        fetchRole();
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleLogOut = async () => {
        try {
            await axios.get("/api/logout");
            router.push("/login");
        } catch (error) { }
    };

    return (
        <aside className="sidebar-container">

            <div className="sidebar-header">
                <h1 className="sidebar-heading">Task Management</h1>
                <button
                    type="button"
                    className="sidebar-toggle-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            <div className="flex justify-between items-center px-3 py-2 my-5">
                <ThemeToggle />
                <li className="sidebar-logout flex-1 ml-4" onClick={() => { handleLinkClick(); handleLogOut(); }}>
                    <span>Log Out</span>
                    <RiLogoutCircleRLine className="sidebar-logout-icon" />
                </li>
            </div>
            <ul className={`sidebar-list ${isOpen ? "sidebar-list-open" : ""}`}>
                <Link href="/dashboard/admin" className="sidebar-link" onClick={handleLinkClick}>
                    <li className={`sidebar-item ${pathname === "/dashboard/admin" ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
                        <IoMdHome size={23} /> Home
                    </li>
                </Link>

                {userRole !== 'viewer' && (
                    <Link href="/dashboard/admin/register" className="sidebar-link" onClick={handleLinkClick}>
                        <li className={`sidebar-item ${pathname === "/dashboard/admin/register" ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
                            <FaUserAlt size={23} /> User Register
                        </li>
                    </Link>
                )}

                <Link href="/dashboard/admin/userlist" className="sidebar-link" onClick={handleLinkClick}>
                    <li className={`sidebar-item ${pathname === "/dashboard/admin/userlist" ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
                        <FaUserFriends size={23} /> Total User List
                    </li>
                </Link>

                {userRole !== 'viewer' && (
                    <Link href="/dashboard/admin/task" className="sidebar-link" onClick={handleLinkClick}>
                        <li className={`sidebar-item ${pathname === "/dashboard/admin/task" ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
                            <TiTickOutline size={23} /> Tasks
                        </li>
                    </Link>
                )}

                <Link href="/dashboard/admin/Important" className="sidebar-link" onClick={handleLinkClick}>
                    <li className={`sidebar-item ${pathname === "/dashboard/admin/Important" ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
                        <CiStar size={23} /> Important
                    </li>
                </Link>

                <Link href="/dashboard/admin/Completed" className="sidebar-link" onClick={handleLinkClick}>
                    <li className={`sidebar-item ${pathname === "/dashboard/admin/Completed" ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
                        <RiDeleteBinLine size={23} /> Completed
                    </li>
                </Link>


            </ul>
        </aside>
    );
};

export default SideBar;