import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import FoodList from "../FoodList/FoodList";
import OrderList from "../OrderList/OrderList";
import "./adminPanel.css";

const AdminPanel = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/signin");
    }, [user]);

    return (
        <>
            <div className="container AdminPanel_Wrapper">
                <h1 className="AdminPanel_Heading">Admin panel</h1>
                <nav className="AdminPanel_Nav">
                    <div className="AdminPanel_LinkWrapper">
                        <Link
                            className="AdminPanel_Link"
                            to="/admin-panel/foodList"
                        >
                            FoodList
                        </Link>
                    </div>
                    <div className="AdminPanel_LinkWrapper">
                        <Link
                            className="AdminPanel_Link"
                            to="/admin-panel/orderList"
                        >
                            OrderList
                        </Link>
                    </div>
                </nav>
            </div>
            <Routes>
                <Route path="foodList" element={<FoodList />} />
                <Route path="" element={<FoodList />} />
                <Route path="orderList" element={<OrderList />} />
            </Routes>
        </>
    );
};

export default AdminPanel;
