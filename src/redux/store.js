// store.js
import { configureStore } from "@reduxjs/toolkit";

// Creează un reducer simplu (poți avea mai mulți și să-i combini ulterior)
const initialState = {
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        user: action.payload
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        user: initialState.user
      };
    case "UPDATE_ENTRIES":
      return {
        ...state,
        user: {
          ...state.user, // Menținem restul proprietăților din user
          entries: action.payload // Actualizăm doar numărul de entries
        }
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
