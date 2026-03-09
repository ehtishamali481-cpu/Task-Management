'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegThumbsUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';



const ImportantTask = () => {
    const [taskList, setTaskList] = useState([]);
    const router = useRouter();
    const fetchData = async () => {
        const res = await axios.get("/api/important");
        setTaskList(res.data.data.filter(taskList => taskList.status === "pending"))
    };
    const delTask = async (id) => {
        try {
            const res = await axios.delete(`/api/completed/${id}`);


        } catch (error) {
            console.log("Not delete task", error)
        }
        toast.error("Your Task Delete Successfully");

    };
    const markUpdate = async (id) => {

        try {
            await axios.put(`/api/updatetask/${id}`, { status: "completed" });

        } catch (error) {
            console.log("update error", error)
        }
        fetchData();
        toast.success("Task marked as completed!");
    }

    useEffect(() => {

        fetchData();
    }, [])
    const handleLogOut = async () => {
        try {
            const res = await axios.get("/api/logout");
            router.push("/login");
        } catch (error) {

        }
    };
    return (
        <div className='body'>
            <div className='important-nav'>
                <h1>Important Task</h1>
                <h1 className='userLogout'><RiLogoutCircleRLine onClick={handleLogOut} style={{
                    transform: "rotate(-90deg)",
                }} /></h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Task Description</th>
                        <th>Task Due Date</th>
                        <th>Task Priority</th>
                        <th>Task Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList.map((item) => (
                            <tr key={item._id}>
                                <td>{item.task}</td>
                                <td>{item.description}</td>
                                <td>{new Date(item.duedate).toDateString()}</td>
                                <td>{item.priority}</td>
                                <td>{item.status}</td>
                                <td>
                                    <MdDeleteForever size={30} className='del' onClick={() => delTask(item?._id)} />
                                    <FaRegThumbsUp size={30} className='succ' onClick={() => markUpdate(item?._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>



        </div>
    )
}

export default ImportantTask
