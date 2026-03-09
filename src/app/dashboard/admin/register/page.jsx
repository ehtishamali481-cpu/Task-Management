'use client'
import axios from "axios";
import { useRouter } from "next/navigation"
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { RegisterStyle } from "./registerStyle";
import { useRef } from 'react';
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";




const Register = () => {
  const router = useRouter();
  const [inputList, setInputList] = useState({
    userName: "",
    email: "",
    password: "",
    role: ""
  });
  const [icon, setIcon] = useState(false);

  const inputPasswordRef = useRef(null);
  const inputUserNameRef = useRef(null);
  const inputEmailRef = useRef(null);


  const emailClick = () => {
    if (inputEmailRef.current) {
      inputEmailRef.current.focus();
    }
  }
  const userNameClick = () => {
    if (inputUserNameRef.current) {
      inputUserNameRef.current.focus();
    }
  }

  const refClick = () => {
    if (inputPasswordRef.current) {
      inputPasswordRef.current.focus();
    }
  }

  const { userName, email, password, role } = inputList;

  const formReset = () => {
    setInputList({
      userName: "",
      email: "",
      password: ""
    });
  }
  const onChangeHandle = (e) => {
    setInputList({
      ...inputList,
      [e.target.name]: e.target.value
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/register", inputList);
      formReset();
      toast.success("Form Submit SuccessFully")
      if (res.status === 200 || res.status === 201) {
        router.push("/dashboard/admin")
      }

    } catch (error) {
      console.log("form submit error", error)
    }
  }
  return (
    <RegisterStyle className="body">
      <form onSubmit={formSubmit}>
        <h1>Welcome to Task Management</h1>
        <h2>SignUp User</h2>
        <div className="input" onClick={userNameClick}>
          <div className="email"><MdEmail size={30} /></div>
          <div>
            <label htmlFor="">User Name</label>
            <input type="text"
              ref={inputUserNameRef}
              placeholder='Enter User Name'
              name='userName'
              value={inputList.userName}
              onChange={onChangeHandle}
            />
          </div>

        </div>
        <div className="input" onClick={emailClick}>
          <div className="email"><MdEmail size={30} /></div>
          <div>
            <label htmlFor="">Email</label>
            <input type="email"
              ref={inputEmailRef}
              placeholder='Enter Email'
              name='email'
              value={inputList.email}
              onChange={onChangeHandle}
            />
          </div>

        </div>
        <div className="input password" onClick={refClick}>
          <div className="row-1">
            <div><FaKey size={30} /></div>
            <div>
              <label htmlFor="">Password</label>
              <input type={icon ? "text" : "password"}
                ref={inputPasswordRef}
                placeholder='Enter Password'
                name='password'
                value={inputList.password}
                onChange={onChangeHandle}
              />
            </div>
          </div>
          <div onClick={() => setIcon(!icon)}>{icon ? <IoIosEye /> : <IoEyeOffSharp />} </div>
        </div>
        <select
          name='role'
          value={inputList.role}
          onChange={onChangeHandle}
          className="input select">
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn-1">Submit</button>
      </form>
    </RegisterStyle>
  )
}

export default Register
