import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  displayName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

// * Actions
export const authAction = authSlice.actions;
//* Selectors

// * Reducer
const authReducer = authSlice.reducer;
export default authReducer;
