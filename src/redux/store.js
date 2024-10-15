// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    signIn(state, action) {
      state.isSignedIn = true;
      state.user = action.payload;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.user = initialUserState.user;
    },
    updateEntries(state, action) {
      state.user.entries = action.payload;
    }
  }
});

export const { signIn, signOut, updateEntries } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;