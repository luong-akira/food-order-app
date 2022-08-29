import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyOders = () => {
    const [orders, setOrders] = useState();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        } else {
            axios
                .get("/api/orders/myOrders", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                .then((response) => {
                    setOrders(response.data);
                    console.log(response.data);
                });
        }
    }, []);

    return (
        <div
            className="container"
            style={{ marginTop: "20px", textAlign: "center" }}
        >
            <h2>My orders</h2>
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Is Delivered</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {orders &&
                        orders.map((order) => (
                            <tr>
                                <td>{order.food.name}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    {order.quantity}*${order.food.price}= $
                                    {order.total}
                                </td>
                                <td>
                                    {order.isDelivered
                                        ? "Delivered"
                                        : "Not delivered"}
                                </td>
                                <td>
                                    {!order.isDelivered && (
                                        <i
                                            className="fa fa-trash"
                                            style={{
                                                color: "red",
                                                cursor: "pointer",
                                            }}
                                            onClick={(e) => {
                                                axios.delete(
                                                    `/api/orders/${order.id}`,
                                                    {
                                                        headers: {
                                                            Authorization: `Bearer ${user.token}`,
                                                        },
                                                    }
                                                );
                                            }}
                                        ></i>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOders;
