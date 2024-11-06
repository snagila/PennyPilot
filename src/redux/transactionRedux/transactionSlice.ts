import { createSlice } from "@reduxjs/toolkit";
import { TransactionInput } from "./transactionTypes";
import {
  deleteTransactionsAction,
  getTransactionAction,
} from "./transactionThunk";

interface InitialState {
  transactions: TransactionInput[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getting all transaction
    builder
      .addCase(getTransactionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(getTransactionAction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch transaction data.";
      });

    // delete Transactions
    builder
      .addCase(deleteTransactionsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransactionsAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTransactionsAction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message || "Failed to delete transaction data.";
      });
  },
});
export const {} = transactionSlice.actions;
export default transactionSlice.reducer;
