import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartFoodItem from "../components/CartFoodItem";
import "./Cart.css";

const Cart = () => {
    const [foods, setFoods] = useState([]);

    const childRef = useRef([]);
    const navigate = useNavigate();

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
    }, []);

    return (
        <>
            <div
                className="container"
                style={{
                    display: "flex",
                    background: "#fff",
                    marginTop: "20px",
                }}
            >
                <div className="cartContainer">
                    {foods && foods.length > 0 ? (
                        foods.map((food, index) => (
                            <CartFoodItem
                                key={index}
                                food={food}
                                onDeleteFromCart={onDeleteFromCart}
                                index={index}
                                ref={(el) => (childRef.current[index] = el)}
                            />
                        ))
                    ) : (
                        <h1>You dont have any order</h1>
                    )}
                </div>
                {foods && foods.length > 0 && (
                    <div className="cartSubtotalWrapper">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                childRef.current.forEach((child) =>
                                    child.orderFood()
                                );
                                document.cookie = "foods=[]; path=/";
                                navigate("/");
                            }}
                        >
                            Paynow
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
