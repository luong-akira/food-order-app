import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./FoodDetails.css";

const FoodDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [food, setFood] = useState();
    const [quantity, setQuantity] = useState(1);
    const { user } = useSelector((state) => state.auth);

    let arr;
    if (document.cookie) {
        arr = JSON.parse(document.cookie.split("=")[1]);
    } else {
        arr = [];
    }

    useEffect(() => {
        axios
            .get(`/api/foods/${id}`)
            .then((response) => setFood(response.data));
    }, []);
    return (
        <>
            {food && (
                <div
                    className="container"
                    style={{ backgroundColor: "#fff", marginTop: "30px" }}
                >
                    <div className="foodDetailsBasicInfo">
                        <div className="foodDetailsImages">
                            <div
                                id="carouselExampleControls"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            className="d-block w-100"
                                            src={food.foodImages[0].image}
                                            style={{
                                                aspectRatio: "3/4",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>

                                    {food.foodImages
                                        .slice(1)
                                        .map((foodImage) => (
                                            <div className="carousel-item">
                                                <img
                                                    className="d-block w-100"
                                                    src={foodImage.image}
                                                    style={{
                                                        aspectRatio: "3/4",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                </div>
                                <a
                                    className="carousel-control-prev"
                                    href="#carouselExampleControls"
                                    role="button"
                                    data-slide="prev"
                                >
                                    <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a
                                    className="carousel-control-next"
                                    href="#carouselExampleControls"
                                    role="button"
                                    data-slide="next"
                                >
                                    <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="foodDetailsNameAndBuy">
                            <div className="foodDetailsName">{food.name}</div>
                            <div className="foodDetailsQuantity">
                                <button
                                    className="btn"
                                    onClick={(e) => {
                                        if (quantity <= 1) {
                                            setQuantity(1);
                                        } else {
                                            setQuantity(quantity - 1);
                                        }
                                    }}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="form-control input-number"
                                    style={{ width: "80px" }}
                                    value={quantity}
                                    min="1"
                                    max={food.stock}
                                />
                                <button
                                    className="btn"
                                    onClick={(e) => {
                                        if (quantity >= food.stock) {
                                            setQuantity(food.stock);
                                        } else {
                                            setQuantity(quantity + 1);
                                        }
                                    }}
                                >
                                    +
                                </button>
                                <div style={{ marginLeft: "30px" }}>
                                    Stock : {food.stock}
                                </div>
                            </div>
                            {(user == null || user.id != food.userId) && (
                                <div className="foodDetailsBuyOptions">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={(e) => {
                                            if (!user) {
                                                window.location.href =
                                                    "/signin";
                                            } else {
                                                let jsonFood = {
                                                    foodId: food.id,
                                                    foodName: food.name,
                                                    foodImage:
                                                        food.foodImages[0]
                                                            .image,
                                                    foodPrice: food.price,
                                                    foodAmount: quantity,
                                                };

                                                arr.push(jsonFood);
                                                document.cookie =
                                                    "foods=" +
                                                    JSON.stringify(arr) +
                                                    "; path=/";
                                                navigate("/cart");
                                            }
                                        }}
                                    >
                                        <i className="fa fa-shopping-cart"></i>{" "}
                                        Add to cart
                                    </button>
                                    <button
                                        className="btn btn-outline-success ml-2"
                                        onClick={(e) => {
                                            if (!user) {
                                                navigate("/signin");
                                            }

                                            axios
                                                .post(
                                                    "/api/orders",
                                                    {
                                                        quantity: quantity,
                                                        foodId: food.id,
                                                    },
                                                    {
                                                        headers: {
                                                            Authorization: `Bearer ${user.token}`,
                                                        },
                                                    }
                                                )
                                                .then((response) =>
                                                    navigate("/myorders")
                                                );
                                        }}
                                    >
                                        Buy now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FoodDetails;
