import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

let initialState = {
    user: JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const register = createAsyncThunk("auth/register", async (user) => {
    try {
        return await authService.register(user);
    } catch (error) {
        console.log(error);
    }
});

export const login = createAsyncThunk("auth/login", async (user) => {
    try {
        return await authService.login(user);
    } catch (error) {
        console.log(error);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        return await authService.logout();
    } catch (error) {
        console.log(error);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset(state) {
            state.user = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (typeof action.payload == "string") {
                    state.error = action.payload;
                } else {
                    state.user = action.payload;
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (typeof action.payload == "string") {
                    state.error = action.payload;
                } else {
                    state.user = action.payload;
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.user = null;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});

const { actions, reducer } = authSlice;
export const { reset } = actions;
export default reducer;
