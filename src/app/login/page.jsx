'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { LoginPage } from './LoginPageStyle';
import { UiPicture } from '../Picture';
import Image from 'next/image';
import { useRef } from 'react';
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";







const Login = () => {
    const router = useRouter();
    const [formInput, setFormInput] = useState({
        email: "",
        password: ""
    });
    const [icon, setIcon] = useState(false);
    const onChangeHandle = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    };
    const inputRef = useRef(null);
    const inputPasswordRef = useRef(null);

    const refClick = () => {
        if (inputPasswordRef.current) {
            inputPasswordRef.current.focus();
        }
    }

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const formSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/login", formInput);
        const data = res.data;
        if (res.status === 200 || res.status === 201) {
            if (data.role === "admin") {
                router.push("/dashboard/admin")
            } else {
                router.push("/dashboard/user")
            }

        } else {
            data.message
        }
    }
    return (
        <LoginPage>
            <Image
                src={UiPicture.Login2}
                alt='Login Image'
                className='img'>
            </Image>
            <form onSubmit={formSubmit}>
                <h2>Welcome to</h2>
                <h1>Task Management</h1>
                <div className="box-1">
                    <Image src={UiPicture.GoogleIcon} alt='Google Icon'></Image>   <p>Login With Google</p>
                </div>
                <div className="box-1">
                    <Image src={UiPicture.Facebook} alt='Google Icon'></Image>   <p>Login With Facebook</p>
                </div>
                <div className='border'>-------------------------------------------- OR ---------------------------------------------</div>
                <div className='input' onClick={handleClick}>
                    <div className="email"><MdEmail size={30} /></div>
                    <div>
                        <label>email</label>
                        <input type="email"
                            ref={inputRef}
                            placeholder='Enter Email'
                            name='email'
                            value={formInput.email}
                            onChange={onChangeHandle}
                        />
                    </div>
                </div>
                <div className='input password' onClick={refClick}>
                    <div className='row-1'>
                        <div><FaKey size={30} /></div>
                        <div>
                            <label>Password</label>
                            <input type={icon ? "text" : "password"}
                                ref={inputPasswordRef}
                                placeholder='Enter Password'
                                name='password'
                                value={formInput.password}
                                onChange={onChangeHandle}
                            />
                        </div>
                    </div>
                    <div onClick={() => setIcon(!icon)}>{icon ? <IoIosEye /> : <IoEyeOffSharp />} </div>
                </div>
                <div className="forgot">
                    <div className="check">
                        <input type="checkbox" />
                        <p>Remember Me</p>
                    </div>
                    <p className='forgotPassword'>Forgot Password</p>
                </div>
                <button className='btn'>Login</button>
            </form>
        </LoginPage>
    )
}

export default Login
