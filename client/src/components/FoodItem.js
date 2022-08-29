import React from "react";
import { Link } from "react-router-dom";
import "./FoodItem.css";

const FoodItem = ({ food }) => {
    return (
        <div className="col-6 col-md-4 col-lg-3">
            <Link
                to={`/foods/${food.id}`}
                style={{ textDecoration: "none", color: "black" }}
            >
                <div className="foodItemWrapper">
                    <img
                        className="foodItemImage"
                        src={`${food.foodImages[0].image}`}
                        alt="Card image cap"
                    />
                    <div className="foodItemBody">
                        <div className="foodItemName">
                            <strong>{food.name}</strong>
                        </div>
                        <div className="foodItemPrice">
                            <strong>${food.price}</strong>
                        </div>
                    </div>
                    <small>Stock: {food.stock}</small>
                </div>
            </Link>
        </div>
    );
};

export default FoodItem;
