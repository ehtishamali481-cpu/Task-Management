'use client'
import ImportantTask from '@/app/dashboard/admin/Important/page'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserPageStyle } from './UserHomeStyle';

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/me");
      setUser(res.data.user);
    };
    fetchData();
  }, [])
  return (
    <UserPageStyle className='body'>
      <div className='username'> <span>Hi ' {user?.userName?.toUpperCase()}</span>
        <span >Welcome back! Here's your dashboard</span>
        ({user?.role?.toUpperCase()})</div>
      <ImportantTask />
    </UserPageStyle>
  )
}

export default User
