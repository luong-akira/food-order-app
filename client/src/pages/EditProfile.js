import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EditProfile = () => {
    const [username, setUsername] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState();
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        if (username) {
            form.append("username", username);
        }
        if (phoneNumber) {
            form.append("phoneNumber", phoneNumber);
        }
        if (address) {
            form.append("address", address);
        }
        if (file) {
            form.append("profileImage", file);
        }

        axios.put("/api/users", form, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        navigate("/");
    };

    useEffect(() => {
        if (user) {
            axios.get(`/api/users/${user.id}`).then((response) => {
                setUsername(response.data.username);
                setPhoneNumber(response.data.phoneNumber);
                setAddress(response.data.address);
            });
        } else {
            navigate("/login");
        }

        if (!file) {
            setFile(undefined);
            return;
        }

        if (!file.type.includes("image")) {
            toast("not an image");
            setFile(null);
        } else {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file, user]);

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
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                    {preview && (
                        <>
                            <i
                                className="fa fa-times"
                                onClick={() => {
                                    setPreview(null);
                                    setFile();
                                }}
                                style={{
                                    color: "red",
                                    cursor: "pointer",
                                    position: "absolute",
                                }}
                            >
                                {" "}
                            </i>
                            <img
                                src={preview}
                                style={{
                                    width: "150px",
                                    aspectRation: "3/4",
                                    objectFit: "contain",
                                    margin: "10px 0",
                                }}
                            />
                        </>
                    )}

                    <input
                        type="file"
                        className="form-control-file"
                        name="profileImage"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/png, image/jpeg"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </>
    );
};

export default EditProfile;
