'use client'
import ImportantTask from '@/app/dashboard/admin/Important/page'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import ThemeToggle from "@/components/ThemeToggle";

const User = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="w-full max-w-full min-h-screen py-4 sm:py-6 px-3 sm:px-6 md:px-8 flex flex-col items-center overflow-x-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="w-full max-w-7xl flex flex-col gap-4 sm:gap-6 min-w-0">

        {/* Header / Navbar */}
        <div className="relative w-full flex flex-row sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-700/80 gap-2">

          {/* Left Side (Mobile): Name aur Paragraph aik hi line mein */}
          <div className="flex flex-row sm:flex-col items-center flex-wrap gap-2 sm:gap-1 text-left sm:text-center min-w-0">
            <h1 className="text-base sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 tracking-tight whitespace-nowrap">
              Hi, {user?.userName ? user.userName.toUpperCase() : "..."}
            </h1>

            <p className="text-xs sm:text-base text-gray-600 dark:text-slate-300 font-medium flex items-center gap-1.5 whitespace-nowrap">
              <span>Welcome back! Here's your dashboard</span>
              {user?.role && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full font-bold shadow-sm">
                  {user.role.toUpperCase()}
                </span>
              )}
            </p>
          </div>

          {/* Right Side (Mobile): Theme Toggle & Logout button */}
          <div className="sm:absolute top-5 right-5 flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-semibold rounded-xl text-xs sm:text-sm transition-all duration-200 border border-red-200 dark:border-red-800/50 cursor-pointer shadow-sm active:scale-95 shrink-0"
            >
              <FiLogOut className="text-sm sm:text-base" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Table Container: Proper Mobile Horizontal Scroll */}
        <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-300/70 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm [-webkit-overflow-scrolling:touch] touch-pan-x">
          <div className="inline-block min-w-[800px] w-full align-middle">
            <ImportantTask />
          </div>
        </div>

      </div>
    </div>
  )
}

export default User;