import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FoodItem from "../../components/FoodItem/FoodItem";
import { Markup } from "interweave";
import axios from "axios";
import "./profile.css";

const Profile = () => {
    const [user, setUser] = useState();
    const [foods, setFoods] = useState();
    const { user: loggedInUser } = useSelector((state) => state.auth);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/api/users/${id}`)
            .then((response) => setUser(response.data));
        axios
            .get(`/api/foods/user/${id}`)
            .then((response) => setFoods(response.data));
    }, [loggedInUser]);

    const parseStringToHtml = (str) => {
        var t = document.createElement("template");
        t.innerHTML = str;
        return t.content;
    };

    return (
        <div className="container">
            <div className="Profile__Wrapper">
                <div className="Profile__ImageContainer">
                    <img
                        src={
                            user && user.profilePicture
                                ? user.profilePicture
                                : "/default_profile.png"
                        }
                        className="Profile__ProfilePicture"
                        alt=""
                    />
                </div>
                <div className="Profile__InfoPlusModification">
                    <div className="Profile__InfoContainer">
                        <p className="Profile__Info">
                            <strong> User name:</strong> {user && user.username}
                        </p>
                        <p className="Profile__Info">
                            {" "}
                            <strong>Email:</strong> {user && user.email}
                        </p>
                        <p className="Profile__Info">
                            {" "}
                            <strong>Bio:</strong>{" "}
                            {user && <Markup content={user.bio} />}
                        </p>
                    </div>

                    {loggedInUser && loggedInUser.id == id && (
                        <div className="Profile_ModifyUser">
                            <Link
                                to="/edit-profile"
                                className="btn btn-success mr-2"
                            >
                                Edit Profile
                            </Link>
                            <Link
                                to="/change_password"
                                className="btn btn-danger"
                            >
                                Change password
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="row">
                {foods &&
                    foods.map((food) => <FoodItem food={food} key={food.id} />)}
            </div>
        </div>
    );
};

export default Profile;
