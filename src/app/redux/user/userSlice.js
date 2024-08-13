import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userAllAPIData: null,
    isLoading: false,
    error: null,
};

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
    'userAll/fetchUserData',
    async () => {
        const response = await fetch('/api/getUser');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("API Response Data:", data);
        return data.usersData;
    }
);

const userSlice = createSlice({
    name: 'userAll',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.userAllAPIData = null;
            state.isLoading = false;
            state.error = null;
        },
        // Action to initialize state with server-side fetched data
        initializeUserData: (state, action) => {
            state.userAllAPIData = action.payload;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userAllAPIData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearUserData, initializeUserData } = userSlice.actions;
export default userSlice.reducer;
