'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdPeopleAlt } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";
import MonthlyChart from './charts/MonthlyChart';
import PieTaskChart from './charts/PieTask';

const Admin = () => {
    const [userListNumber, setUserListNumber] = useState([]);
    const [pendingTask, setPendingTask] = useState([]);
    const [completeTask, setCompleteTask] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [chartActive, setChartActive] = useState("monthly");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/important");
                const task = res.data.data;
                setTasks(task);
                const pending = task.filter((task) => task.status === "pending");
                const complete = task.filter((task) => task.status === "completed");

                setPendingTask(pending);
                setCompleteTask(complete);
            } catch (error) { }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/me");
                setUser(res.data.user);
            } catch (error) { }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/userlist");
                setUserListNumber(res.data.data);
            } catch (error) { }
        };
        fetchData();
    }, []);

    return (
        <div className='body text-center w-full min-h-screen px-4 py-2'>
            <div
                className="flex flex-col items-center justify-center p-4 sm:p-6 
                rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md shadow-sm border border-white/50 dark:border-slate-700/50 w-full mb-5"
                style={{ marginBottom: "20px" }}
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 tracking-tight text-center">
                    Hi, {user?.userName?.toUpperCase()}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-slate-300 mt-2 font-medium flex flex-wrap items-center justify-center gap-2 text-center">
                    <span>Welcome back! Here's your dashboard</span>
                    <span className="text-xs sm:text-sm px-2.5  sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/40
                     text-blue-800 dark:text-blue-200 rounded-full font-bold shadow-sm"
                        style={{ padding: "5px 8px" }}
                    >
                        {user?.role?.toUpperCase()}
                    </span>
                </p>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center w-full"
                style={{ marginBottom: "40px" }}
            >

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white max-w-sm w-full h-52 rounded-3xl shadow-xl relative cursor-pointer group overflow-hidden"
                    style={{ padding: "10px" }}
                >
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between p-2">
                        <h3 className="text-2xl font-semibold tracking-wide text-left">Total Users</h3>
                        <div className="flex justify-between items-end w-full">
                            <MdPeopleAlt size={75} className='-rotate-12 transition-transform duration-500 ease-in-out group-hover:rotate-0 opacity-80 text-blue-200 drop-shadow-md' />
                            <p className="text-5xl font-black">{userListNumber.length}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-orange-500 to-red-600 text-white max-w-sm w-full h-52 rounded-3xl shadow-xl relative cursor-pointer group overflow-hidden"
                    style={{ padding: "10px" }}
                >
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between p-2">
                        <h3 className="text-2xl font-semibold tracking-wide text-left">Pending Tasks</h3>
                        <div className="flex justify-between items-end w-full">
                            <MdPendingActions size={75} className='-rotate-12 transition-transform duration-500 ease-in-out group-hover:rotate-0 opacity-80 text-orange-200 drop-shadow-md' />
                            <p className="text-5xl font-black">{pendingTask.length}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-emerald-400 to-teal-700 text-white max-w-sm w-full h-52 rounded-3xl shadow-xl relative cursor-pointer group overflow-hidden"
                    style={{ padding: "10px" }}
                >
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between p-2">
                        <h3 className="text-2xl font-semibold tracking-wide text-left">Complete Tasks</h3>
                        <div className="flex justify-between items-end w-full">
                            <MdVerified size={75} className='-rotate-12 transition-transform duration-500 ease-in-out group-hover:rotate-0 opacity-80 text-teal-100 drop-shadow-md' />
                            <p className="text-5xl font-black">{completeTask.length}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div style={{ maxWidth: "1010px", margin: "0 auto" }}>
                <div
                    className='flex items-center justify-center gap-6'
                    style={{ marginBottom: "35px" }}
                >
                    <button
                        onClick={() => setChartActive("monthly")}
                        className={`max-w-[200px] w-full py-3 px-6 shadow-sm transition-all duration-300 font-bold rounded-full ${chartActive === "monthly" ? "bg-gradient-to-r from-gray-900 to-gray-700 dark:from-indigo-600 dark:to-blue-600 text-white scale-105 shadow-md" : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700"}`}
                    >
                        Monthly Chart
                    </button>
                    <button
                        onClick={() => setChartActive("pie")}
                        className={`max-w-[200px] w-full py-3 px-6 shadow-sm transition-all duration-300 font-bold rounded-full ${chartActive === "pie" ? "bg-gradient-to-r from-gray-900 to-gray-700 dark:from-indigo-600 dark:to-blue-600 text-white scale-105 shadow-md" : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700"}`}
                    >
                        Pie Chart
                    </button>
                </div>

                {chartActive === "monthly" && (
                    <MonthlyChart
                        tasks={tasks}
                        pending={pendingTask}
                        complete={completeTask}
                    />
                )}

                {chartActive === "pie" && (
                    <PieTaskChart
                        pending={pendingTask.length}
                        complete={completeTask.length}
                    />
                )}
            </div>
        </div>
    );
};

export default Admin;