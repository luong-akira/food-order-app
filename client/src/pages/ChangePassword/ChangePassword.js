import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./changePassword.css";

const ChangePassword = () => {
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast("new password does not match");
        } else {
            axios
                .put(
                    "/api/auth/changePassword",
                    { password, newPassword },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                )
                .then((response) => navigate("/"))
                .catch((error) => toast(error.response.data.message));
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <>
            <ToastContainer />
            <form className="ChangePassword_Form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="password">Old Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your current password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        aria-describedby="emailHelp"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmNewPassword">
                        Confirm New Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmNewPassword"
                        placeholder="Enter your new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </>
    );
};

export default ChangePassword;
