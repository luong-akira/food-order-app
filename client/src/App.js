import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import FoodDetails from "./pages/FoodDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import MyOders from "./pages/MyOders";
import "./app.css";
import AdminPanel from "./pages/AdminPanel";
import CreateFood from "./pages/CreateFood";
import EditFood from "./pages/EditFood";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/admin-panel" element={<AdminPanel />}></Route>
                <Route path="/create-food" element={<CreateFood />}></Route>
                <Route path="/edit-food/:id" element={<EditFood />}></Route>
                <Route path="/my-cart" element={<Cart />}></Route>
                <Route path="/my-orders" element={<MyOders />}></Route>
                <Route path="/signin" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/edit-profile" element={<EditProfile />}></Route>
                <Route
                    path="/change_password"
                    element={<ChangePassword />}
                ></Route>
                <Route path="/profile/:id" element={<Profile />}></Route>
                <Route path="/foods/:id" element={<FoodDetails />}></Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
