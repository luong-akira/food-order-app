import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./editProfile.css";

const EditProfile = () => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState();
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        if (username) {
            form.append("username", username);
        }

        if (bio && bio.length > 0) {
            form.append("bio", bio);
        }

        if (file) {
            form.append("profileImage", file);
        }

        console.log(form);

        axios
            .put("/api/users", form, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((repsonse) => navigate("/"));
    };

    useEffect(() => {
        if (user) {
            axios.get(`/api/users/${user.id}`).then((response) => {
                setUsername(response.data.username);
                setBio(response.data.bio);
            });
        } else {
            navigate("/login");
        }

        if (!file) {
            setFile(undefined);
            return;
        }

        if (!file.type.includes("image")) {
            toast("not an image");
            setFile(null);
        } else {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [file, user]);

    return (
        <>
            <ToastContainer />
            <form className="EditProfile_Form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group EditProfile_PreviewWrapper">
                    {preview && (
                        <>
                            <i
                                className="fa fa-times EditProfile_TimesIcon"
                                onClick={() => {
                                    setPreview(null);
                                    setFile();
                                }}
                            >
                                {" "}
                            </i>
                            <img src={preview} className="EditProfile_Image" />
                        </>
                    )}

                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: ["bold", "italic"],
                        }}
                        data={bio ? bio : ""}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log(data);
                            setBio(data);
                        }}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor1 is ready to use!", editor);
                        }}
                    />

                    <input
                        type="file"
                        className="form-control-file"
                        name="profileImage"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/png, image/jpeg"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </>
    );
};

export default EditProfile;
