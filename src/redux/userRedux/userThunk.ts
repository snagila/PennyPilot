import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserApiResponse } from "./userTypes";
import { getUser, loginUser } from "../../axios/authAxios";
import { toast } from "react-toastify";

type LoginFormData = {
  email: string;
  password: string;
};

// export const loginUserAction = createAsyncThunk<User, LoginFormData>(
//   "user/loginUserAction",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const result = await loginUser({ email, password }); // Call your login API
//       if (result?.status === "success") {
//         return result.data; // Assuming result.user contains the user object
//       }
//       return thunkAPI.rejectWithValue(result?.message || "Login failed");
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.message || "An error occurred during login"
//       );
//     }
//   }
// );

export const getUserDataAction = createAsyncThunk<User | null, void>(
  "user/getUserData",
  async () => {
    const result = await getUser();
    if (result && result.data) {
      return result.data as User; // Assert the data to be of type User
    }
    return null;
  }
);
