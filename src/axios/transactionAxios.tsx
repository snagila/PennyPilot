import axios from "axios";
import { TransactionInput } from "../redux/transactionRedux/transactionTypes";

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
const errorResponse = (errorMessage: string): ReturnErrorMessage => ({
  status: "error",
  message: errorMessage,
  data: undefined,
});

const TRANSACTION_API_URL =
  `${import.meta.env.VITE_APP_API_URL}/transaction` ||
  `http://localhost:8001/transaction`;

// add new transaction
export const addNewTransaction = async (
  transactionData: TransactionInput
): Promise<ApiResponse | undefined> => {
  try {
    const response = await axios.post(
      `${TRANSACTION_API_URL}/addtransaction`,
      transactionData,
      {
        headers: { Authorization: sessionStorage.getItem("accessJWT") },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return errorResponse(error.message);
    }
  }
};

// get all transactions
export const getAllTransactions = async (): Promise<
  ApiResponse | undefined
> => {
  try {
    const response = await axios.get(TRANSACTION_API_URL, {
      headers: { Authorization: sessionStorage.getItem("accessJWT") },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return errorResponse(error.message);
    }
  }
};

// delete TransaActions
export const deleteTransaction = async (
  idToDelete: string[]
): Promise<ApiResponse | undefined> => {
  try {
    const response = await axios.delete(TRANSACTION_API_URL, {
      headers: { Authorization: sessionStorage.getItem("accessJWT") },
      data: idToDelete,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return errorResponse(error.message);
    }
  }
};
