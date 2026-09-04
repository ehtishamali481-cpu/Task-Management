'use client';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { FaPlus, FaTimes, FaTasks, FaFlag } from "react-icons/fa";
import { MdDescription, MdDateRange } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { toast } from 'react-toastify';

const Home = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState({
        task: "",
        description: "",
        duedate: "",
        priority: "",
        status: ""
    });

    const inputTaskRef = useRef(null);
    const inputDescRef = useRef(null);
    const inputDateRef = useRef(null);

    const resetForm = () => {
        setMessageList({
            task: "",
            description: "",
            duedate: "",
            priority: "",
            status: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessageList((prev) => ({ ...prev, [name]: value }));
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const { task, description, duedate, priority, status } = messageList;

        if (!task.trim() || !description.trim() || !duedate || !priority || !status) {
            toast.warning("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            await axios.post('/api/task', messageList);
            toast.success("Task created successfully");
            resetForm();
            setShow(false);
        } catch (error) {
            console.error("API post error:", error);
            toast.error(error.response?.data?.message || "Failed to submit task");
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen w-full bg-slate-100/60 dark:bg-slate-900/60 p-4 sm:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <div
                    onClick={() => setShow(true)}
                    className="w-full sm:w-80 h-44 rounded-3xl border-2 border-dashed border-indigo-300 dark:border-indigo-500 bg-white dark:bg-slate-800 hover:bg-indigo-50/40 dark:hover:bg-slate-700/80 hover:border-indigo-400 flex flex-col items-center justify-center gap-3 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                    <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                        <FaPlus size={22} />
                    </div>
                    <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Add a Task
                    </p>
                </div>
            </div>
            {show && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-sm overflow-y-auto"
                    onClick={() => { setShow(false); resetForm(); }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700 shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
                        style={{
                            boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.2)"
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => { setShow(false); resetForm(); }}
                            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                        >
                            <FaTimes size={15} />
                        </button>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                                Create New Task
                            </h2>
                            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                                Fill in details to schedule your task
                            </p>
                        </div>
                        <form onSubmit={formSubmit} className="space-y-4">
                            <div
                                onClick={() => inputTaskRef.current?.focus()}
                                className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/70 transition-all cursor-text"
                            >
                                <FaTasks className="text-slate-400 group-focus-within:text-indigo-600 text-lg flex-shrink-0 transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        ref={inputTaskRef}
                                        placeholder="Enter Task Title"
                                        name="task"
                                        value={messageList.task}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 font-medium placeholder-slate-400 p-0 focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div
                                onClick={() => inputDescRef.current?.focus()}
                                className="group flex items-start gap-3 px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/70 transition-all cursor-text"
                            >
                                <MdDescription className="text-slate-400 group-focus-within:text-indigo-600 text-xl mt-1 flex-shrink-0 transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                        Description
                                    </label>
                                    <textarea
                                        rows="2"
                                        ref={inputDescRef}
                                        placeholder="Enter Task Description"
                                        name="description"
                                        value={messageList.description}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 font-medium placeholder-slate-400 p-0 resize-none focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div
                                onClick={() => inputDateRef.current?.focus()}
                                className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/70 transition-all cursor-text"
                            >
                                <MdDateRange className="text-slate-400 group-focus-within:text-indigo-600 text-xl flex-shrink-0 transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        ref={inputDateRef}
                                        min={today}
                                        name="duedate"
                                        value={messageList.duedate}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 font-medium p-0 cursor-pointer focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/70 transition-all">
                                    <FaFlag className="text-slate-400 group-focus-within:text-indigo-600 text-base flex-shrink-0 transition-colors" />
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                            Priority
                                        </label>
                                        <select
                                            name="priority"
                                            value={messageList.priority}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-0 outline-none text-sm font-medium text-slate-800 cursor-pointer p-0 focus:ring-0"
                                        >
                                            <option value="" disabled>Select Priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/70 transition-all">
                                    <GrStatusInfo className="text-slate-400 group-focus-within:text-indigo-600 text-base flex-shrink-0 transition-colors" />
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={messageList.status}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-0 outline-none text-sm font-medium text-slate-800 cursor-pointer p-0 focus:ring-0 capitalize"
                                        >
                                            <option value="" disabled>Select Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => { setShow(false); resetForm(); }}
                                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 font-semibold text-sm transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        boxShadow: "0 8px 16px -4px rgba(79, 70, 229, 0.35)"
                                    }}
                                >
                                    {loading ? "Saving..." : "Save Task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;