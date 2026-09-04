'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";

const UserList = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/userlist");
                setUserList(res.data.data);
            } catch (error) {
                console.error("Error fetching user list", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div
            className="w-full min-h-screen p-3 sm:p-6 md:p-8 bg-slate-50 dark:bg-slate-900"
            style={{ width: "100%", boxSizing: "border-box" }}
        >
            <div
                className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-800 p-5 sm:p-6 border border-gray-100 dark:border-slate-700"
                style={{
                    width: "100%",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
                    padding: "8px 10px",
                    marginBottom: "20px"
                }}
            >
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
                        User Management
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1 font-medium">
                        View and manage all registered system users
                    </p>
                </div>
                <div
                    className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800/50
                      rounded-xl self-start sm:self-auto"
                    style={{
                        padding: "10px 20px"
                    }}
                >
                    <FaUsers className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    <div>
                        <span className="text-[11px] text-indigo-500 dark:text-indigo-300 font-bold block uppercase tracking-wider">
                            Total Users
                        </span>
                        <span className="text-lg font-black text-indigo-700 dark:text-indigo-200 leading-none">
                            {userList.length}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className="w-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700"
                style={{
                    width: "100%",
                    boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)",
                    overflow: "hidden"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch"
                    }}
                >
                    <table
                        className="text-left border-collapse"
                        style={{
                            width: "100%",
                            minWidth: "650px",
                            tableLayout: "auto"
                        }}
                    >
                        <thead>
                            <tr
                                className="bg-gray-50/90 dark:bg-slate-800/90 text-gray-600 dark:text-slate-300 uppercase text-[11px] sm:text-xs tracking-wider border-b border-gray-200 dark:border-slate-100"
                            >
                                <th style={{ padding: "16px 20px" }} className="font-bold">User Name</th>
                                <th style={{ padding: "16px 20px" }} className="font-bold">User Role</th>
                                <th style={{ padding: "16px 20px" }} className="font-bold">Email</th>
                                <th style={{ padding: "16px 20px" }} className="font-bold">Created Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm text-gray-700 dark:text-slate-100">

                            {userList.length > 0 ? (
                                userList.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-indigo-50/30 dark:hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td style={{ padding: "14px 20px" }} className="font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap">
                                            {item.userName}
                                        </td>
                                        <td style={{ padding: "14px 20px" }} className="whitespace-nowrap">
                                            <span
                                                className={`rounded-full text-xs font-bold uppercase shadow-sm inline-block ${item.role === 'admin'
                                                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                                                    : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                                    }`}
                                                style={{
                                                    padding: "8px 20px"
                                                }}
                                            >
                                                {item.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: "14px 20px" }} className="text-gray-600 dark:text-slate-400 whitespace-nowrap">
                                            {item.email}
                                        </td>
                                        <td style={{ padding: "14px 20px" }} className="text-gray-500 dark:text-slate-500 whitespace-nowrap font-medium">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        style={{ padding: "32px 20px", textAlign: "center" }}
                                        className="text-gray-400 font-medium"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;