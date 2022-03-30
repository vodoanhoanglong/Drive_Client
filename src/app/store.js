import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

const rootReducer = {
	counter: counterReducer,
};

export const store = configureStore({
	reducer: rootReducer,
});
