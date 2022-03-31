import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	logging: false,
	currentUser: {},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
		},
		loginSuccess: (state, action) => {
			state.isLoggedIn = false;
			state.currentUser = action.payload;
		},
		loginFailure: (state, action) => {
			state.isLoggedIn = false;
		},

		logout: (state) => {},
	},
});

// * Actions
export const authAction = authSlice.actions;
//* Selectors

// * Reducer
const authReducer = authSlice.reducer;
export default authReducer;
