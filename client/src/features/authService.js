import axios from "axios";

const register = async (user) => {
    try {
        let response = await axios.post("/api/auth/register", user, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

const login = async (user) => {
    try {
        let response = await axios.post("/api/auth/login", user, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        }
    } catch (error) {
        return error.response.data.message;
    }
};

const logout = async () => {
    try {
        console.log("remove");
        localStorage.removeItem("user");
    } catch (error) {
        console.log(error);
    }
};

const authService = { register, login, logout };

export default authService;
