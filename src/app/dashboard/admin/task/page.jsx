'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";
import { toast } from 'react-toastify';

const Home = () => {
    const [show, setShow] = useState(false);
    const [messageList, setMessageList] = useState({
        task: "",
        description: "",
        duedate: "",
        priority: "",
        status: ""
    });
    const resetForm = () => {
        setMessageList({
            task: "",
            description: "",
            duedate: "",
            priority: "",
            status: ""
        })
    };
    const { task, description, duedate, priority, status } = messageList
    const formSubmit = async (e) => {
        e.preventDefault()
        if (!task || !description || !duedate || !priority || !status) {
            toast.warning("Filed All input")
            return;
        }
        try {
            const postData = await axios.post('/api/task', messageList)
            console.log(postData);
            resetForm();
        } catch (error) {
            console.log("api post error", error)
        }
        toast.success("Your Data sumbit Successfully");
    }
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className='body'>
            <nav><TbSettings size={66} className='setting' /></nav>
            <div className='box' onClick={() => setShow(!show)}>
                <p className='text'>add a task</p>
                <FaPlus size={65} className='plus' />
            </div>
            {
                show && (
                    <form onSubmit={formSubmit}>
                        <div className='formSubmit'>
                            <div>
                                <label>Add Task Tittle</label>
                                <input
                                    type='text'
                                    placeholder='Enter Task Tittle'
                                    name='task'
                                    value={messageList.task}
                                    onChange={(e) => setMessageList({ ...messageList, task: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Add Decription</label>
                                <input
                                    type='text'
                                    placeholder='Enter Task Description'
                                    name='description'
                                    value={messageList.description}
                                    onChange={(e) => setMessageList({ ...messageList, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Add Due Date</label>
                                <input
                                    type='date'
                                    placeholder='Enter Due Date'
                                    name='duedate'
                                    min={today}
                                    value={messageList.duedate}
                                    onChange={(e) => setMessageList({ ...messageList, duedate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Add Priority</label>
                                <input
                                    type='text'
                                    placeholder='Enter Priority'
                                    name='priority'
                                    value={messageList.priority}
                                    onChange={(e) => setMessageList({ ...messageList, priority: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Add Status</label>
                                {/* <input
                  type='text'
                  placeholder='Enter Status'
                  name='status'
                  value={messageList.status}
                  onChange={(e) => setMessageList({ ...messageList, status: e.target.value })}
                /> */}
                                <select
                                    name='status'
                                    value={messageList.status}
                                    onChange={(e) => setMessageList({ ...messageList, status: e.target.value })}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className='end'>
                            <button className='btn'>Submit</button>
                        </div>
                    </form>

                )
            }

        </div>
    )
}

export default Home
