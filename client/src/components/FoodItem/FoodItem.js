import React from "react";
import { Link } from "react-router-dom";
import "./FoodItem.css";

const FoodItem = ({ food }) => {
    return (
        <div className="col-6 col-md-4 col-lg-3">
            <Link to={`/foods/${food.id}`} className="FoodItem_Link">
                <div className="FoodItem_Wrapper">
                    <img
                        className="FoodItem_Image"
                        src={`${
                            food.foodImages &&
                            food.foodImages.length > 0 &&
                            food.foodImages[0].image
                        }`}
                    />
                    <div className="FoodItem_Body">
                        <div className="FoodItem_Name">
                            <strong>{food.name}</strong>
                        </div>
                        <div className="FoodItem_Price">
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
