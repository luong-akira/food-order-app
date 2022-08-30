import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./cartFoodItem.css";

const CartFoodItem = forwardRef(({ food, onDeleteFromCart, index }, ref) => {
    const [amount, setAmount] = useState(food.foodAmount);
    const [stock, setStock] = useState();

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        orderFood(address) {
            axios
                .post(
                    "/api/orders",
                    {
                        quantity: amount,
                        foodId: food.foodId,
                        address,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                )
                .catch((err) => toast(err.response.data.message));
        },
    }));

    useEffect(() => {
        if (!user) navigate("/");
        axios
            .get(`/api/foods/${food.foodId}`)
            .then((response) => setStock(response.data.stock));
    }, []);

    return (
        <>
            <ToastContainer />

            <div className="CartFoodItem__Wrapper">
                <div className="CartFoodItem__FoodDetails">
                    <div className="CartFoodItem__FoodName">
                        <strong>{food.foodName}</strong>
                    </div>
                    <div className="CartFoodItem__FoodPrice">
                        Price: {amount}*${food.foodPrice} ={" "}
                        {amount * food.foodPrice}
                    </div>
                    <div className="CartFoodItem__FoodAmount">
                        <button
                            className="btn"
                            onClick={(e) => {
                                if (amount <= 1) {
                                    setAmount = 1;
                                } else {
                                    setAmount(amount - 1);
                                }
                            }}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            className="form-control input-number"
                            style={{ width: "80px" }}
                            value={amount}
                            min="1"
                            max={stock}
                        />
                        <button
                            className="btn"
                            onClick={(e) => {
                                if (amount >= stock) {
                                    setAmount(stock);
                                } else {
                                    setAmount(amount + 1);
                                }
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="CartFoodItem__FoodImageWrapper">
                    <img
                        className="CartFoodItem__FoodImage"
                        src={food.foodImage}
                        alt=""
                    />
                </div>
                <div
                    className="CartFoodItem__DeleteFoodWrapper"
                    onClick={(e) => onDeleteFromCart(index)}
                >
                    <i className="fa fa-trash"></i>
                </div>
            </div>
        </>
    );
});

export default CartFoodItem;
