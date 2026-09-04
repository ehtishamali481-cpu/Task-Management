'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiOutlinePencil } from "react-icons/hi2";

const CompletedTasks = () => {
    const [doneTask, setDoneTask] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await axios.get("/api/me");
                setUserRole(res.data?.user?.role);
            } catch (error) {
                console.error("Fetch role error:", error);
            }
        };

        const fetchData = async () => {
            try {
                const res = await axios.get("/api/important");
                setDoneTask(res.data.data.filter(task => task.status === "completed"));
            } catch (error) {
                console.error("Fetch data error:", error);
            } finally {
                setLoading(false);
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
                                <th className="px-6 py-4">Task Description</th>
                                <th className="px-6 py-4">Task Priority</th>
                                <th className="px-6 py-4">Task Status</th>
                                <th className="px-6 py-4">Completed By</th>
                                <th className="px-6 py-4">Completed Time</th>
                                {userRole !== 'viewer' && (
                                    <th className="px-6 py-4 text-center">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={userRole !== 'viewer' ? 7 : 6}
                                        className="text-center py-12 text-slate-400 font-normal"
                                    >
                                        Loading tasks...
                                    </td>
                                </tr>
                            ) : doneTask.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={userRole !== 'viewer' ? 7 : 6}
                                        className="text-center py-12 text-slate-400 font-normal"
                                    >
                                        No completed tasks found.
                                    </td>
                                </tr>
                            ) : (
                                doneTask.map((item) => (
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getPriorityBadge(item.priority)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                                            {item.completedBy ? (
                                                <span className="font-semibold text-slate-800 dark:text-slate-200 tracking-wider">
                                                    {item.completedBy.toUpperCase()}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 font-normal">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-xs">
                                            {item.completedAt ? new Date(item.completedAt).toLocaleString() : 'N/A'}
                                        </td>
                                        {userRole !== 'viewer' && (
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button
                                                    type="button"
                                                    title="Edit Task"
                                                    className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 active:scale-95 transition-all cursor-pointer"
                                                >
                                                    <HiOutlinePencil size={18} />
                                                </button>
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

export default CompletedTasks;