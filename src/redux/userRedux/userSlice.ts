import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user?: object;
}
const initialState: InitialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
// we rename in store.ts insated of renaming here
