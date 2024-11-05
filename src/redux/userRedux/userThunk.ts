import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserApiResponse } from "./userTypes";
import { getUser, loginUser, logOutUser } from "../../axios/authAxios";
import { toast } from "react-toastify";
import { logout } from "./userSlice";

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
    if (!sessionStorage.getItem("accessJWT")) {
      return null;
    }
    const result = await getUser();
    if (result && result.data) {
      return result.data as User;
    }
    return null;
  }
);

export const logoutUserAction = createAsyncThunk<void, void>(
  "user/logoutUser",
  async (_, { dispatch }) => {
    const result = await logOutUser();
    console.log(result);
    if (result?.status === "error") {
      toast.error(result.message);
      return;
    }
    if (result?.status === "success") {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
      dispatch(logout()); // Dispatching the logout action straight from the slice
    }
  }
);
