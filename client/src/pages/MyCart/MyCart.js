import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartFoodItem from "../../components/CartFoodItem/CartFoodItem";
import AddAddressModal from "../AddAddressModal/AddAddressModal";
import "./myCart.css";

const MyCart = () => {
    const [foods, setFoods] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const childRef = useRef([]);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const onDeleteFromCart = (id) => {
        console.log(id);
        let itemsInCart = JSON.parse(document.cookie.split("=")[1]);
        console.log(itemsInCart);

        itemsInCart.splice(id, 1);
        document.cookie = "foods=" + JSON.stringify(itemsInCart) + "; path=/";

        setFoods(itemsInCart);
    };

    useEffect(() => {
        if (document.cookie) {
            setFoods(JSON.parse(document.cookie.split("=")[1]));
            childRef.current = childRef.current.slice(0, foods.length);
        }
        if (user) {
            axios
                .get("/api/users/address", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                .then((response) => {
                    setAddresses(response.data);
                });
        }
    }, [user]);

    return (
        <>
            <div className="container MyCart__Wrapper">
                <div className="MyCart__Container">
                    {foods && foods.length > 0
                        ? foods.map((food, index) => (
                              <CartFoodItem
                                  key={index}
                                  food={food}
                                  onDeleteFromCart={onDeleteFromCart}
                                  index={index}
                                  ref={(el) => (childRef.current[index] = el)}
                              />
                          ))
                        : ""}
                    <div className="MyCart_OrderWrapper">
                        <button
                            className="btn btn-danger MyCart_OrderButton"
                            onClick={() => {
                                if (addresses.length == 0 || !addresses) {
                                    toast("Please create an address");
                                } else {
                                    if (
                                        !selectedAddress ||
                                        selectedAddress == ""
                                    ) {
                                        toast("Please select an address");
                                    } else {
                                        childRef.current.forEach((child) =>
                                            child.orderFood(selectedAddress)
                                        );
                                        document.cookie = "foods=[]; path=/";
                                        navigate("/");
                                    }
                                }
                            }}
                        >
                            Order Now
                        </button>
                    </div>
                </div>
                {foods && foods.length > 0 && (
                    <div className="MyCart__AddressWrapper">
                        <div>
                            <i
                                className="fa fa-plus MyCart_AddAdressIcon"
                                onClick={(e) => setIsModalOpen(true)}
                            ></i>
                        </div>
                        {addresses &&
                            addresses.map((address) => (
                                <div className="MyCart__AddressOption">
                                    <input
                                        className="MyCart__RadioButton"
                                        type="radio"
                                        id={`${address.id}`}
                                        name="fav_language"
                                        value={`${address.id}`}
                                        onClick={(e) => {
                                            setSelectedAddress(
                                                `${address.name} | ${address.phone} | ${address.address}`
                                            );
                                        }}
                                    />
                                    <label
                                        htmlFor={`${address.id}`}
                                        className="MyCart__Address"
                                    >
                                        {address.name} || {address.phone} ||{" "}
                                        {address.address}
                                    </label>
                                    <i
                                        className="fa fa-trash MyCart__DeleteAddressOption"
                                        onClick={(e) => {
                                            axios
                                                .delete(
                                                    `/api/users/address/${address.id}`,
                                                    {
                                                        headers: {
                                                            Authorization: `Bearer ${user.token}`,
                                                        },
                                                    }
                                                )
                                                .then((response) => {
                                                    setAddresses(response.data);
                                                });
                                        }}
                                    ></i>
                                </div>
                            ))}
                    </div>
                )}
            </div>
            {isModalOpen && <AddAddressModal setIsModalOpen={setIsModalOpen} />}
        </>
    );
};

export default MyCart;
