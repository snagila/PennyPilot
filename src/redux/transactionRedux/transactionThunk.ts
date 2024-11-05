import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionInput } from "./transactionTypes";
import { addNewTransaction } from "../../axios/transactionAxios";

export const addTransactionAction = createAsyncThunk<
  TransactionInput[],
  TransactionInput
>("transaction/addNewTransaction", async (transactionForm) => {
  const result = await addNewTransaction(transactionForm);

  return result?.data;
});
