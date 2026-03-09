'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserList = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/api/userlist");
            setUserList(res.data.data);
        }
        fetchData();
    }, []);
    return (
        <div className='body'>
            <h1>Total Users {userList.length}</h1>
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>User Role</th>
                        <th>Email</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((item) => (
                            <tr key={item._id}>
                                <td>{item.userName}</td>
                                <td>{item.role}</td>
                                <td>{item.email}</td>
                                <td>{new Date(item.createdAt).toDateString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserList
