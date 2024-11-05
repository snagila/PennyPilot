import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux/userSlice";
import transactionReduder from "./transactionRedux/transactionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReduder,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store as default
export default store;
