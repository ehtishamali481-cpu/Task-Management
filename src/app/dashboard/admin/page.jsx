'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AdminHome } from './AdminHome';
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
            } catch (error) {

            }

        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/api/me");
            setUser(res.data.user)
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/api/userlist");
            setUserListNumber(res.data.data);
        };
        fetchData();
    }, []);
    return (
        <AdminHome className='body'>
            <div className='username'> <span>Hi ' {user?.userName?.toUpperCase()}</span>
                <span >Welcome back! Here's your dashboard</span>
                ({user?.role?.toUpperCase()})</div>
            <div className="row-1">
                <div className="total-user card">
                    <h3>Total Users</h3>

                    <MdPeopleAlt size={100} className='users mdpeo' />
                    <p>{userListNumber.length}</p>

                </div>
                <div className="card pending">
                    <h3>Total Pending Tasks</h3>
                    <MdPendingActions size={100} className='users mdpen' />
                    <p>{pendingTask.length}</p>
                </div>
                <div className="card complete">
                    <h3>Total Complete Tasks</h3>
                    <MdVerified size={100} className='users mdver' />
                    <p>{completeTask.length}</p>
                </div>

            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card"
            >
            </motion.div>
            <div style={{ maxWidth: "1010px" }}>
                <div className='chartBtn'>
                    <button
                        onClick={() => setChartActive("monthly")}
                        className={chartActive === "monthly" ? "active" : ""}
                    >Monthly Chart</button>
                    <button
                        onClick={() => setChartActive("pie")}
                        className={chartActive === "pie" ? "active" : ""}
                    >Pie Chart</button>
                </div>
                {
                    chartActive === "monthly" && (
                        <MonthlyChart tasks={tasks}
                            pending={pendingTask}
                            complete={completeTask}
                        />
                    )
                }
                {
                    chartActive === "pie" && (
                        <PieTaskChart
                            pending={pendingTask.length}
                            complete={completeTask.length}
                        />
                    )
                }

            </div>
        </AdminHome>
    )
}

export default Admin
