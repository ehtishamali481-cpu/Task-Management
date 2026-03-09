'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiOutlinePencil } from "react-icons/hi2";

const page = () => {
    const [doneTask, setDoneTask] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/api/important");
            setDoneTask(res.data.data.filter(doneTask => doneTask.status === "completed"))
        };
        fetchData()
    }, [])
    return (
        <div className='body'>
            <div className='important-nav'><h1>Completed</h1></div>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Task Description</th>
                        <th>Task Priority</th>
                        <th>Task Status</th>
                        <th>Completed By</th>
                        <th>Completed Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        doneTask.map((item) => (
                            <tr key={item._id}>
                                <td>{item.task}</td>
                                <td>{item.description}</td>
                                <td>{item.priority}</td>
                                <td>{item.status}</td>
                                <td>{item.completedBy ? item.completedBy.toUpperCase() : ""}</td>
                                <td>{new Date(item.completedAt).toLocaleString()}</td>
                                <td><HiOutlinePencil /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default page
