import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isLogging: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogging = true;
    },
    loginSuccess: (state, action) => {
      state.isLogging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLogging = false;
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
