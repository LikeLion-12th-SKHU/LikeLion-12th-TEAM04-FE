import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice";
import insuranceReducer from "./insuranceSlice";
import loginReducer from "./slices/loginSlice"; // loginSlice 추가

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    insurance: insuranceReducer,
    login: loginReducer,
  },
});

export default store;
