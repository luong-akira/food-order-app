import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FoodItem from "../../components/FoodItem/FoodItem";
import axios from "axios";
import "./home.css";

const Home = () => {
    const [searchInput, setSearchInput] = useState();
    const [foods, setFoods] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    let page = parseInt(searchParams.get("page")) || 1;
    let search = searchParams.get("search") || "";
    let category = searchParams.get("category") || "";

    console.log(page, search, category);

    useEffect(() => {
        console.log(window.location.search);
        axios
            .get(
                `/api/foods?page=${page}&search=${search}&category=${category}`
            )
            .then((response) => setFoods(response.data));
    }, [page, search, category]);
    return (
        <>
            <div className="container Home">
                <form action="" className="filterContainer">
                    <input
                        type="text"
                        name="search"
                        placeHolder="Enter food name"
                        className="form-control mx-3 my-3"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <select
                        name="category"
                        className="form-control mx-3 my-3"
                        id="category"
                    >
                        <option value=""></option>
                        <option value="1">Pizza</option>
                        <option value="2">Fried Chicken</option>
                        <option value="3">Hamburger</option>
                        <option value="4">Other</option>
                    </select>
                    <button className="btn btn-primary form-control mx-3 my-3">
                        Filter
                    </button>
                </form>

                <div className="row">
                    {foods &&
                        foods.docs.map((food) => (
                            <FoodItem food={food} key={food.id} />
                        ))}
                </div>
            </div>
            {foods && foods.totalPages > 0 && (
                <div aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li
                            className={`page-item ${
                                page == 1 ? "disabled" : ""
                            }`}
                        >
                            <a
                                className="page-link"
                                href={`?search=${search}&category=${category}&page=${
                                    page - 1
                                }`}
                                tabindex="-1"
                            >
                                {"<"}
                            </a>
                        </li>

                        {Array.from(
                            { length: foods.totalPages },
                            (_, i) => i + 1
                        ).map((index) => (
                            <li
                                className={`page-item ${
                                    foods.currentPage == index ? "active" : ""
                                }`}
                            >
                                <a
                                    className="page-link"
                                    href={`?search=${search}&category=${category}&page=${index}`}
                                >
                                    {index}
                                </a>
                            </li>
                        ))}

                        <li
                            className={`page-item ${
                                foods && foods.totalPages == page
                                    ? "disabled"
                                    : ""
                            }`}
                        >
                            <a
                                className="page-link"
                                href={`?search=${search}&category=${category}&page=${
                                    page + 1
                                }`}
                            >
                                {">"}
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Home;
