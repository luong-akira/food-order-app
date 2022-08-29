import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
    const [foods, setFoods] = useState();

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        } else {
            axios
                .get("/api/foods/me", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                .then((response) => setFoods(response.data));
        }
    }, []);

    const onDeleteFood = (id) => {
        axios
            .delete(`/api/foods/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((response) => navigate("/"));
    };

    return (
        <div className="container">
            <h2 style={{ textAlign: "center" }}>My Food List</h2>
            <a href="/create-food">
                <button className="btn btn-danger my-2">+</button>
            </a>
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                        <th scope="col">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {foods &&
                        foods.map((food) => (
                            <tr>
                                <td>{food.id}</td>
                                <td>{food.name}</td>
                                <td>
                                    <img
                                        src={food.foodImages[0].image}
                                        alt=""
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </td>
                                <td>{food.stock}</td>
                                <td>{food.price}</td>
                                <td
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Link to={`/edit-food/${food.id}`}>
                                        <i
                                            className="fa fa-edit"
                                            style={{
                                                color: "blue",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </Link>
                                    <i
                                        className="fa fa-trash"
                                        style={{
                                            color: "red",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => onDeleteFood(food.id)}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
