import axios from "axios";
import { SignupFormData } from "../interfaces/formsInterface/signUpFormsInterface";

interface ApiResponse {
  status: string;
  message: string;
  data?: any;
}

interface ReturnErrorMessage {
  status: string;
  message: string;
  data?: any;
}

const API_URL =
  `${import.meta.env.VITE_APP_API_URL}/auth` || `http://localhost:8001/auth`;

const errorResponse = (errorMessage: string): ReturnErrorMessage => ({
  status: "error",
  message: errorMessage,
  data: undefined,
});

// signup User
export const signUpUser = async (
  formData: SignupFormData
): Promise<ApiResponse | undefined> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${API_URL}/signup`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return errorResponse(error.message);
    } else {
      console.log("Something went wrong !!");
      return errorResponse("Something went wrong !!");
    }
  }
};

// verify user
export const verifyUser = async (
  verificationData: object
): Promise<ApiResponse | undefined> => {
  try {
    const response = await axios.post(
      `${API_URL}/verifyuser`,
      verificationData
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return errorResponse(error.message);
    }
  }
};

// resetPassword
export const resetPassword = async (
  userEmail: object
): Promise<ApiResponse | undefined> => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, userEmail);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return errorResponse(error.message);
    }
  }
};

// newPassword
export const newPasswordReset = async (
  resetData: object
): Promise<ApiResponse | undefined> => {
  try {
    const response = await axios.post(`${API_URL}/new-Password`, resetData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return errorResponse(error.message);
    }
  }
};

// login user
export const loginUser = async (
  formData: object
): Promise<ApiResponse | undefined> => {
  try {
    console.log(formData);
    const response = await axios.post(`${API_URL}/login`, formData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return errorResponse(error.message);
    }
  }
};
