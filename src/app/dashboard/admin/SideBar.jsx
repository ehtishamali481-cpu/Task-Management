'use client'
import React from 'react'
import { TiTickOutline } from "react-icons/ti";
import { CiStar } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdHome } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { SideBarStyle } from './AdminHome';





const SideBar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            const res = await axios.get("/api/logout");
            router.push("/login");
        } catch (error) {

        }
    };
    return (
        <SideBarStyle className='sidebar'>
            <h1 className='logo'>Task Management </h1>
            <ul>
                <Link href="/dashboard/admin" ><li className={pathname === "/dashboard/admin" ? "active" : ""}><IoMdHome size={23} />  Home</li></Link>
                <Link href="/dashboard/admin/register" ><li className={pathname === "/dashboard/admin/register" ? "active" : ""}><FaUserAlt size={23} />  User Register</li></Link>
                <Link href="/dashboard/admin/userlist" ><li className={pathname === "/dashboard/admin/userlist" ? "active" : ""}><FaUserFriends size={23} /> Total User List</li></Link>
                <Link href="/dashboard/admin/task" ><li className={pathname === "/dashboard/admin/task" ? "active" : ""}><TiTickOutline size={23} />  tasks</li></Link>
                <Link href="/dashboard/admin/Important" > <li className={pathname === "/dashboard/admin/Important" ? "active" : ""}><CiStar size={23} /> important</li></Link>
                <Link href="/dashboard/admin/Completed" ><li className={pathname === "/dashboard/admin/Completed" ? "active" : ""}><RiDeleteBinLine size={23} />  completed</li></Link>
                <li className='logout' onClick={handleLogOut}> <RiLogoutCircleRLine style={{
                    transform: "rotate(-90deg)",
                }} />Log Out</li>
            </ul>
        </SideBarStyle>
    )
}

export default SideBar
