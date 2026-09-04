'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';

const ImportantTask = () => {
    const [taskList, setTaskList] = useState([]);
    const [userRole, setUserRole] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/important");
            setTaskList(res.data.data.filter(task => task.status === "pending"));
        } catch (error) {
            console.error("Fetch data error:", error);
        }
    };

    const delTask = async (id) => {
        try {
            await axios.delete(`/api/completed/${id}`);
            toast.success("Task deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Delete task error:", error);
            toast.error("Failed to delete task");
        }
    };

    const markUpdate = async (id) => {
        try {
            await axios.put(`/api/updatetask/${id}`, { status: "completed" });
            toast.success("Task marked as completed!");
            fetchData();
        } catch (error) {
            console.error("Update task error:", error);
            toast.error("Failed to mark task as completed");
        }
    };

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await axios.get("/api/me");
                setUserRole(res.data?.user?.role);
            } catch (error) {
                console.error("Fetch role error:", error);
            }
        };
        fetchRole();
        fetchData();
    }, []);

    const getPriorityBadge = (priority) => {
        const p = priority?.toLowerCase();
        if (p === 'high') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                    High
                </span>
            );
        }
        if (p === 'medium') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                    Medium
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                {priority || 'Low'}
            </span>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <th className="px-6 py-4">Task Title</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Due Date</th>
                                <th className="px-6 py-4">Priority</th>
                                <th className="px-6 py-4">Status</th>
                                {userRole !== 'viewer' && (
                                    <th className="px-6 py-4 text-center">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {taskList.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={userRole !== 'viewer' ? 6 : 5}
                                        className="text-center py-12 text-slate-400 font-normal"
                                    >
                                        No pending tasks found.
                                    </td>
                                </tr>
                            ) : (
                                taskList.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-slate-50/60 dark:hover:bg-slate-700/60 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                                            {item.task}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 max-w-sm truncate font-normal">
                                            {item.description}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                            {item.duedate ? new Date(item.duedate).toDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getPriorityBadge(item.priority)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200 capitalize">
                                                {item.status}
                                            </span>
                                        </td>
                                        {userRole !== 'viewer' && (
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="inline-flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => markUpdate(item?._id)}
                                                        title="Mark as Completed"
                                                        className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 active:scale-95 transition-all cursor-pointer"
                                                    >
                                                        <FaRegThumbsUp size={17} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => delTask(item?._id)}
                                                        title="Delete Task"
                                                        className="p-2 rounded-xl text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/50 active:scale-95 transition-all cursor-pointer"
                                                    >
                                                        <MdDeleteForever size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ImportantTask;