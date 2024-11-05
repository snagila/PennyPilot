import { createSlice } from "@reduxjs/toolkit";
import { User } from "./userTypes";
import { getUserDataAction } from "./userThunk";

interface InitialState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
const initialState: InitialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // THIS IS NOT NEEDED AS I AM USING THUNK
    // setUser: (state, action: PayloadAction<User | null>) => {
    //   state.user = action?.payload;
    // },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDataAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data.";
      });
  },
});

export const { logout } = userSlice.actions;

// we rename in store.ts insated of renaming here
export default userSlice.reducer;
