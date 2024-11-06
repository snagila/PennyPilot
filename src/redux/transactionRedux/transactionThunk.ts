import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionInput } from "./transactionTypes";
import {
  addNewTransaction,
  getAllTransactions,
} from "../../axios/transactionAxios";

export const addTransactionAction = createAsyncThunk<
  TransactionInput,
  TransactionInput
>("transaction/addNewTransaction", async (transactionForm, { dispatch }) => {
  const result = await addNewTransaction(transactionForm);
  await dispatch(getTransactionAction());
  return result?.data;
});

export const getTransactionAction = createAsyncThunk<TransactionInput[], void>(
  "transaction/getAllTransaction",
  async () => {
    const result = await getAllTransactions();
    return result?.data;
  }
);
