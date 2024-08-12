import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    userAPIData: null,
    isLoading: true,
    error: null,
};


export const fetchApiUsers = createAsyncThunk(
    "user/fetchApiUsers",
    async (_, { dispatch }) => {
        const response = await fetch("/api/me");

        if (response.status === 401) {
            dispatch(logout());
            throw new Error("Unauthorized. Redirecting to login.");
        }

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return response.json();
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.userAPIData = null;
            state.isLoading = false;
            state.error = "You have been logged out.";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchApiUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userAPIData = action.payload.dataUser;
            })
            .addCase(fetchApiUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
