import { createSlice } from "@reduxjs/toolkit";
import { TransactionInput } from "./transactionTypes";
import { addTransactionAction } from "./transactionThunk";

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
    builder
      .addCase(addTransactionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransactionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(addTransactionAction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch transaction data.";
      });
  },
});
export const {} = transactionSlice.actions;
export default transactionSlice.reducer;
