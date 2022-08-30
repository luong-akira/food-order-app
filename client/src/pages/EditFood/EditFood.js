import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./editFood.css";

const EditFood = () => {
    const { id } = useParams();

    const [files, setFiles] = useState();
    const [selectedFiles, setSelectedFiles] = useState();
    const [name, setName] = useState();
    const [stock, setStock] = useState();
    const [price, setPrice] = useState();
    const [desc, setDesc] = useState();

    const [friedChicken, setFriedChicken] = useState(false);
    const [pizza, setPizza] = useState(false);
    const [hamburger, setHamburger] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    var fileObj = [];
    let fileArray = [];
    const form = new FormData();

    const uploadMultipleFiles = (e) => {
        if (e.target.files.length > 5) {
            toast("Choose maximum 5 image files");
        } else {
            fileObj.push(e.target.files);
            setSelectedFiles(e.target.files);

            for (let i = 0; i < fileObj[0].length; i++) {
                if (fileObj[0][i].type.startsWith("image")) {
                    fileArray.push(URL.createObjectURL(fileObj[0][i]));
                } else {
                    toast("Not image");
                }
            }
            setFiles(fileArray);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(pizza, friedChicken, hamburger);

        if (pizza) {
            form.append("category", 1);
        }
        if (friedChicken) {
            form.append("category", 2);
        }
        if (hamburger) {
            form.append("category", 3);
        }

        if (!pizza && !friedChicken && !hamburger) {
            form.append("category", 4);
        }

        if (!name || name == "") {
            return toast("Please fill in the name field");
        }

        form.append("name", name);

        if (!price || !Number(price)) {
            return toast("Please fill in the price field");
        }
        form.append("price", price);

        if (!stock || !Number(stock)) {
            return toast("Please fill in the stock field");
        }
        form.append("stock", stock);

        if (!desc || desc == "") {
            return toast("Please fill in the description field");
        }
        form.append("desc", desc);

        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                form.append("foods", selectedFiles[i]);
            }
        }

        axios
            .put(`/api/foods/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((response) => navigate("/"));
    };

    useEffect(() => {
        axios.get(`/api/foods/${id}`).then((response) => {
            setName(response.data.name);
            setPrice(response.data.price);
            setStock(response.data.stock);
            setDesc(response.data.desc);

            response.data.categories.map((categ) => {
                if (categ.id == 1) {
                    setPizza(true);
                }
                if (categ.id == 2) {
                    setFriedChicken(true);
                }
                if (categ.id == 3) {
                    setHamburger(true);
                }
            });
        });
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="container">
                <form onSubmit={onSubmit} method="post">
                    <div className="form-group">
                        <label htmlFor="foodName">Name</label>
                        <input
                            type="text"
                            id="foodName"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodStock">Stock</label>
                        <input
                            type="text"
                            id="foodStock input-number"
                            className="form-control"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodPrice">Price</label>
                        <input
                            type="text"
                            id="foodPrice input-number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="foodDesc">Description</label>
                        <textarea
                            id="foodDesc"
                            className="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <div className="form-group multi-preview">
                        {(files || []).map((url) => (
                            <img
                                src={url}
                                alt="..."
                                className="EditFood_PreviewImages"
                            />
                        ))}
                    </div>
                    <div>
                        <input
                            name="foods"
                            type="file"
                            multiple
                            onChange={(e) => uploadMultipleFiles(e)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary my-2">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditFood;
