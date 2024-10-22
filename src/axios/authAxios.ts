import axios from "axios";
import { SignupFormData } from "../interfaces/formsInterface/signUpFormsInterface";
import {
  ApiResponse,
  ReturnErrorMessage,
} from "../interfaces/axiosInterface/authAxiosInterface";

const API_URL = `${import.meta.env.API_URL}` || `http://localhost:8001`;
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
    const response = await axios.post<ApiResponse>(API_URL, formData);
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
