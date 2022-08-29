import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./profile.css";

const Profile = () => {
    const [user, setUser] = useState();
    const { user: loggedInUser } = useSelector((state) => state.auth);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/api/users/${id}`)
            .then((response) => setUser(response.data));
    }, [loggedInUser]);

    return (
        <div className="profileWrapper">
            <div className="profileImageContainer">
                <img
                    src={
                        user && user.profilePicture
                            ? user.profilePicture
                            : "/default_profile.png"
                    }
                    className="profilePicture"
                    alt=""
                />
            </div>
            <div className="profileInfoContainer">
                <p className="profileInfo">Username: {user && user.username}</p>
                <p className="profileInfo">Email: {user && user.email}</p>
                <p className="profileInfo">Phone: {user && user.phoneNumber}</p>
                <p className="profileInfo">Address: {user && user.address}</p>
                {loggedInUser && loggedInUser.id == id && (
                    <div>
                        <Link
                            to="/edit_profile"
                            className="btn btn-success mr-2"
                        >
                            Edit Profile
                        </Link>
                        <Link to="/change_password" className="btn btn-danger">
                            Change password
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
