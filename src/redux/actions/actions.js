// actions.js
export const signIn = (userData) => ({
  type: "SIGN_IN",
  payload: userData
});

export const signOut = () => ({
  type: "SIGN_OUT"
});

export const updateEntries = (numberOfEntries) => ({
  type: "UPDATE_ENTRIES",
  payload: numberOfEntries
});
