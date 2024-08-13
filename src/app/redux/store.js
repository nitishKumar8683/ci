import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice'; // Check this file for any issues
import userAllReducer from './user/userSlice'; // Ensure this is the correct slice

const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,       // This could be for different state
            userAll: userAllReducer, // This is for user-related data
        },
    });
};

export default makeStore;
