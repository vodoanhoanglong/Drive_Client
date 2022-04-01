import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
const rootReducer = {
	auth: authReducer,
};

export const store = configureStore({
	reducer: rootReducer,
});
