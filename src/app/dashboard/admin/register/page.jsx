'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from 'react';
import { toast } from "react-toastify";
import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
  const [showPassword, setShowPassword] = useState(false);

  const inputPasswordRef = useRef(null);
  const inputUserNameRef = useRef(null);
  const inputEmailRef = useRef(null);

  const formReset = () => {
    setInputList({
      userName: "",
      email: "",
      password: "",
      role: ""
    });
  };

  const onChangeHandle = (e) => {
    setInputList({
      ...inputList,
      [e.target.name]: e.target.value
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (!inputList.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const res = await axios.post("/api/register", inputList);
      formReset();
      toast.success("Form Submitted Successfully");
      if (res.status === 200 || res.status === 201) {
        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.log("form submit error", error);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-40px)] w-full flex items-center justify-center p-4 sm:p-8">
      <form
        onSubmit={formSubmit}
        className="w-full max-w-[600px] bg-white dark:bg-slate-800 rounded-3xl p-7 sm:px-[35px] sm:py-[40px] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.15),0_0_1px_1px_rgba(0,0,0,0.05)]"
      >
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl leading-snug font-extrabold text-indigo-600 dark:text-indigo-400 tracking-[-0.5px] mb-2">
            Welcome to Task Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 font-medium m-0">
            Create a new account
          </p>
        </div>
        <div className="flex flex-col gap-[22px]">
          <div
            onClick={() => inputUserNameRef.current?.focus()}
            className="flex items-center gap-3.5 px-[18px] py-3 rounded-[14px] border-[1.5px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 cursor-text focus-within:border-indigo-500 transition-colors"
          >
            <FaUser className="text-slate-400 dark:text-slate-500 text-xl shrink-0" />
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.5px]">
                User Name
              </label>
              <input
                type="text"
                ref={inputUserNameRef}
                placeholder="Enter User Name"
                name="userName"
                value={inputList.userName}
                onChange={onChangeHandle}
                required
                className="w-full bg-transparent border-none outline-none text-[15px] text-slate-800 dark:text-slate-100 font-semibold mt-0.5"
              />
            </div>
          </div>
          <div
            onClick={() => inputEmailRef.current?.focus()}
            className="flex items-center gap-3.5 px-[18px] py-3 rounded-[14px] border-[1.5px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 cursor-text focus-within:border-indigo-500 transition-colors"
          >
            <MdEmail className="text-slate-400 dark:text-slate-500 text-[22px] shrink-0" />
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.5px]">
                Email
              </label>
              <input
                type="email"
                ref={inputEmailRef}
                placeholder="Enter Email"
                name="email"
                value={inputList.email}
                onChange={onChangeHandle}
                required
                className="w-full bg-transparent border-none outline-none text-[15px] text-slate-800 dark:text-slate-100 font-semibold mt-0.5"
              />
            </div>
          </div>
          <div
            onClick={() => inputPasswordRef.current?.focus()}
            className="flex items-center justify-between gap-3.5 px-[18px] py-3 rounded-[14px] border-[1.5px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 cursor-text focus-within:border-indigo-500 transition-colors"
          >
            <div className="flex items-center gap-3.5 flex-1">
              <FaKey className="text-slate-400 dark:text-slate-500 text-xl shrink-0" />
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-[0.5px]">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  ref={inputPasswordRef}
                  placeholder="Enter Password"
                  name="password"
                  value={inputList.password}
                  onChange={onChangeHandle}
                  required
                  className="w-full bg-transparent border-none outline-none text-[15px] text-slate-800 dark:text-slate-100 font-semibold mt-0.5"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword(!showPassword);
              }}
              className="bg-transparent border-none cursor-pointer text-slate-500 flex items-center p-1"
            >
              {showPassword ? <IoIosEye size={22} /> : <IoEyeOffSharp size={22} />}
            </button>
          </div>
          <div className="relative">
            <select
              name="role"
              value={inputList.role}
              onChange={onChangeHandle}
              required
              className="w-full px-5 py-4 rounded-[14px] border-[1.5px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-[15px] font-semibold text-slate-800 dark:text-slate-100 outline-none cursor-pointer appearance-none focus:border-indigo-500 transition-colors"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
            <div className="absolute right-[18px] top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
              ▼
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-[30px] p-4 rounded-[14px] bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold border-none cursor-pointer shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] transition-all duration-200"
        >
          Sign Up User
        </button>
      </form>
    </div>
  );
};

export default Register;