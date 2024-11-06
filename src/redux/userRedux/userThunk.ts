import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./userTypes";
import { getUser, logOutUser } from "../../axios/authAxios";
import { toast } from "react-toastify";
import { logout } from "./userSlice";

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
