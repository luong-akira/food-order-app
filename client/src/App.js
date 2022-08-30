import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditProfile from "./pages/EditProfile/EditProfile";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import MyCart from "./pages/MyCart/MyCart";
import MyOrders from "./pages/MyOrders/MyOrders";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AddFood from "./pages/AddFood/AddFood";
import EditFood from "./pages/EditFood/EditFood";
import "./app.css";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-panel/*" element={<AdminPanel />} />
                <Route path="/create-food" element={<AddFood />} />
                <Route path="/edit-food/:id" element={<EditFood />} />
                <Route path="/my-cart" element={<MyCart />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/foods/:id" element={<FoodDetails />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
