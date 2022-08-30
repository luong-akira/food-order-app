import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast("Password does not match");
        } else {
            dispatch(register({ username, email, password }));
            if (error) {
                toast(error);
            }
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
            <form className="RegisterForm" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </>
    );
};

export default Register;
