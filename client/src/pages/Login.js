import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
        if (error) {
            toast(error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <ToastContainer />
            <form
                style={{
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10px",
                }}
                onSubmit={onSubmit}
            >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    style={{
                        width: "100%",
                        fontSize: "20px",
                        marginBottom: "20px",
                    }}
                    type="submit"
                    className="btn btn-primary"
                >
                    Login
                </button>
            </form>
        </>
    );
};

export default Login;
