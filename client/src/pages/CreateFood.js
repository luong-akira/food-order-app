import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateFood = () => {
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

        if (!selectedFiles) {
            return toast("choose your file");
        }

        if (pizza) {
            form.append("category", 1);
        }
        if (friedChicken) {
            form.append("category", 2);
        }
        if (hamburger) {
            form.append("category", 3);
        }

        form.append("name", name);
        form.append("price", price);
        form.append("stock", stock);
        form.append("desc", desc);

        for (let i = 0; i < selectedFiles.length; i++) {
            form.append("foods", selectedFiles[i]);
        }

        axios
            .post("/api/foods", form, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => console.log(response.data));
    };

    return (
        <>
            <ToastContainer />
            <div className="container">
                <form
                    onSubmit={onSubmit}
                    method="post"
                    enctype="multipart/form-data"
                >
                    <div class="form-group">
                        <label htmlFor="foodName">Name</label>
                        <input
                            type="text"
                            id="foodName"
                            class="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label htmlFor="foodStock">Stock</label>
                        <input
                            type="text"
                            id="foodStock input-number"
                            class="form-control"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label htmlFor="foodPrice">Price</label>
                        <input
                            type="text"
                            id="foodPrice input-number"
                            class="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <label htmlFor="foodDesc">Description</label>
                        <textarea
                            id="foodDesc"
                            class="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <p>Choose your food categories</p>

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            onChange={(e) => setPizza(e.target.checked)}
                            id="pizza"
                        />
                        <label class="form-check-label" for="pizza">
                            Pizza
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            onChange={(e) => setFriedChicken(e.target.checked)}
                            id="chicken"
                        />
                        <label class="form-check-label" for="chicken">
                            Chicken
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            onChange={(e) => setHamburger(e.target.checked)}
                            id="hamburger"
                        />
                        <label class="form-check-label" for="hamburger">
                            Hamburger
                        </label>
                    </div>

                    <div className="form-group multi-preview">
                        {(files || []).map((url) => (
                            <img
                                src={url}
                                alt="..."
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "contain",
                                }}
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

                    <button type="submit" class="btn btn-primary my-2">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateFood;
