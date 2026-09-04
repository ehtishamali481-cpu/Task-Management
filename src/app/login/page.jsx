"use client"
import { useEffect, useState } from "react";
import { useRef } from "react";
import "./loginpage.css";
import Image from 'next/image';
import { UiPicture } from '../Picture';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [isOn, setIsOn] = useState(false);
    const [pulling, setPulling] = useState(false);

    const startY = useRef(0);

    const handleMouseDown = (e) => {
        startY.current = e.clientY;
        setPulling(true);
    };

    const handleMouseLeave = () => {
        setPulling(false);
    };

    const handleMouseUp = (e) => {
        setPulling(false);

        if (e.clientY - startY.current > 20) {
            setIsOn((prev) => !prev);
        }
    };
    useEffect(() => {
        document.body.classList.toggle("is-lit", isOn);
    }, [isOn]);
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
        try {
            const res = await axios.post("/api/login", formInput);
            const data = res.data;
            if (res.status === 200 || res.status === 201) {
                if (data.role === "admin" || data.role === "viewer") {
                    router.push("/dashboard/admin")
                } else {
                    router.push("/dashboard/user")
                }

            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Login failed");
            }
        }
    }

    return (
        <div className="stage">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className={`glow ${isOn ? "on" : ""}`} />
            <div className="stage-col-1">
                {!isOn && (
                    <div className="lampMessage">
                        on the lamp for login
                    </div>
                )}
                <Image
                    src={UiPicture.Lamp}
                    alt='Login Image'
                    width={400}
                    height={400}
                    className='img'>
                </Image>
                <button
                    type="button"
                    className={`lampButton ${isOn ? "on" : ""}`}
                    aria-pressed={isOn}
                    aria-label={isOn ? "Turn lamp off" : "Turn lamp on to sign in"}
                    onClick={() => setIsOn((v) => !v)}
                >
                    <span className={`lampNeck ${isOn ? "on" : ""}`} />
                    <span className="lampBase" />
                    <span className="lampCaption">
                    </span>
                    <span
                        className={`cord ${pulling ? "pulling" : ""}`}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >  <span className="cordBead" />
                    </span>
                </button>
            </div>
            <form
                className={`card ${isOn ? "visible" : ""}`}
                onSubmit={formSubmit}
            >
                <h2 className="cardTitle">Welcome to Task Management</h2>
                <p>"If you are logging in as a viewer, please use the following credentials:
                    Email: viewer@test.com
                    Password: Password@123"</p>
                <div className='input' onClick={handleClick}>
                    <div className="field">
                        <label className="fieldLabel">email</label>
                        <input type="email"
                            className="fieldInput"
                            ref={inputRef}
                            placeholder='Enter Email'
                            name='email'
                            value={formInput.email}
                            onChange={onChangeHandle}
                        />
                    </div>
                </div>
                <div className="field" onClick={refClick}>
                    <div className='row-1'>
                        <div>
                            <label className="fieldLabel">Password</label>
                            <input type={icon ? "text" : "password"}
                                className="fieldInput"
                                ref={inputPasswordRef}
                                placeholder='Enter Password'
                                name='password'
                                value={formInput.password}
                                onChange={onChangeHandle}
                            />
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "20px",
                    fontSize: "14px",
                    boxSizing: "border-box"
                }}>
                    <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        userSelect: "none",
                        color: "#374151"
                    }}>
                        <input
                            type="checkbox"
                            style={{
                                cursor: "pointer",
                                width: "16px",
                                height: "16px",
                                accentColor: "#2563eb"
                            }}
                        />
                        <span style={{
                            color: "white"
                        }}>Check In</span>
                    </label>

                    <a
                        href="#"
                        style={{
                            color: "#2563eb",
                            fontWeight: "500",
                            textDecoration: "none",
                            cursor: "pointer"
                        }}
                    >
                        Forgot Password?
                    </a>
                </div>
                <button type="submit" className="signInButton">
                    Sign in
                </button>

            </form>
        </div>
    );
}
