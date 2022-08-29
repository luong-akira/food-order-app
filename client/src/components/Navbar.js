import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { logout } from "../features/authSlice";

const Navbar = () => {
    let location = useLocation();
    let pathname = location.pathname.split("/")[1];

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: "#e3f2fd" }}
        >
            <Link className="navbar-brand" to="/">
                <img src="/favicon.png" alt="" />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${
                                pathname == "" ? "active" : ""
                            }`}
                            to="/"
                        >
                            <i class="fas fa-home fa-2x"></i>
                        </Link>
                    </li>
                </ul>
                <div className="my-2 my-lg-0 mx-lg-2">
                    {user ? (
                        <>
                            <div className="dropdown">
                                <p
                                    className="btn dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {user.username}
                                </p>
                                <Link to="/my-cart">
                                    <i className="fa fa-shopping-cart fa-2x"></i>
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <Link
                                        className="dropdown-item"
                                        to={`/profile/${user.id}`}
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        className="dropdown-item"
                                        to="/my-orders"
                                    >
                                        My Orders
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/admin-panel"
                                    >
                                        Admin Panel
                                    </Link>
                                    <button
                                        className="dropdown-item"
                                        onClick={onLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/signin"
                                className="btn btn-outline-success mr-2"
                            >
                                <i className="fas fa-sign-in-alt fa-2x"></i>
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-outline-success"
                            >
                                <i className="fas fa-user-plus fa-2x"></i>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
