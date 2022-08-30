import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./foodList.css";

const FoodList = () => {
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
        <div className="container FoodList__Wrapper">
            <h4 className="FoodList__Heading">My Food List</h4>
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
                                        src={
                                            food.foodImages.length > 0 &&
                                            food.foodImages[0].image
                                        }
                                        alt=""
                                        className="FoodList_FoodImage"
                                    />
                                </td>
                                <td>{food.stock}</td>
                                <td>{food.price}</td>
                                <td className="FoodList_EditDeleteTd">
                                    <Link to={`/edit-food/${food.id}`}>
                                        <i className="fa fa-edit FoodList_EditIcon"></i>
                                    </Link>
                                    <i
                                        className="fa fa-trash FoodList_TrashIcon"
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

export default FoodList;
