import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUpPage from "./pages/authPages/SignUpPage";
import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./pages/authPages/verifyEmail";
import LoginPage from "./pages/authPages/LoginPage";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import NewPassWordPage from "./pages/authPages/NewPassWordPage";
import Dashboard from "./pages/dashboard/Dashboard";
import User_Private_Route from "./components/authComponents/UserPrivateRoute";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDataAction } from "./redux/userRedux/userThunk";
import { getTransactionAction } from "./redux/transactionRedux/transactionThunk";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);
  useEffect(() => {
    if (user?._id) {
      dispatch(getTransactionAction());
    }
  }, [user]);

  return (
    <>
      <Routes>
        {/*PUBLIC ROUETS  */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/new-Password" element={<NewPassWordPage />} />

        {/* PRIVATE ROUTES */}
        <Route path="/user" element={<User_Private_Route />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
