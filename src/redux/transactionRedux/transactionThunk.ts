import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionInput } from "./transactionTypes";
import {
  addNewTransaction,
  deleteTransaction,
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

export const deleteTransactionsAction = createAsyncThunk<void, string[]>(
  "transaction/deleteTransActions",
  async (ids, { dispatch }) => {
    const result = await deleteTransaction(ids);
    if (result?.status === "success") {
      dispatch(getTransactionAction());
    }
  }
);
