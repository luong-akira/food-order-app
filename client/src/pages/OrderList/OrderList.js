import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./orderList.css";

const OrderList = () => {
    const [orders, setOrders] = useState();
    const [isDeliveredText, setIsDeliveredText] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        } else {
            axios
                .get("/api/orders/orderList", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                .then((response) => {
                    setOrders(response.data);
                });
        }
    }, [user]);
    return (
        <div className="container OrderList__Wrapper">
            <h4 className="OrderList__heading">My Order List</h4>
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Total</th>
                        <th scope="col">Deliver</th>
                        <th scope="col">Address + Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {orders &&
                        orders.map((order) => (
                            <tr>
                                <td>
                                    <Link to={`/foods/${order.food.id}`}>
                                        {order.food.name}
                                    </Link>
                                </td>
                                <td>{order.quantity}</td>
                                <td>${order.total}</td>
                                <td>
                                    <button
                                        id={`isDeliveredButton ${order.id}`}
                                        className="btn btn-danger"
                                        disabled={order.isDelivered}
                                        onClick={() => {
                                            if (order.isDelivered == false) {
                                                axios
                                                    .post(
                                                        `/api/orders/${order.id}`,
                                                        null,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${user.token}`,
                                                            },
                                                        }
                                                    )
                                                    .then((repsonse) => {
                                                        let btn =
                                                            document.getElementById(
                                                                `isDeliveredButton ${order.id}`
                                                            );
                                                        btn.textContent =
                                                            "Delivered";
                                                        btn.disabled = true;
                                                    })
                                                    .catch((err) =>
                                                        console.log(err)
                                                    );
                                            }
                                        }}
                                    >
                                        {order.isDelivered
                                            ? "Delivered"
                                            : "Not delivered"}
                                    </button>
                                </td>
                                <td>{order.address}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
