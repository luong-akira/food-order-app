import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./addAddressModal.css";
import { useSelector } from "react-redux";

const AddAddressModal = ({ setIsModalOpen }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState("");

    const { user } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!name || name == "") {
            return toast("Please fill in name field");
        }

        if (!address || address == "") {
            return toast("Please fill in address field");
        }

        if (!phone || !Number(phone)) {
            return toast("Please fill in phone field");
        }

        axios
            .post(
                "/api/users/address",
                { name, phone, address },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="AddAddressModal_Wrapper">
                <div className="AddAddressModal_Centered">
                    <div className="AddAddressModal_Content">
                        <form
                            action=""
                            className="AddAddressModal_Form"
                            onSubmit={onSubmit}
                        >
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label for="phone">Phone Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id="phone"
                                />
                            </div>

                            <div className="form-group">
                                <label for="address">Address:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-danger">
                                Submit
                            </button>
                            <i
                                className="fa fa-times AddAddressModal_CloseIcon"
                                onClick={(e) => setIsModalOpen(false)}
                            ></i>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAddressModal;
