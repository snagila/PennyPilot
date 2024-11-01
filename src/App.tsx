import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUpPage from "./pages/authPages/SignUpPage";
import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./pages/authPages/verifyEmail";
import LoginPage from "./pages/authPages/LoginPage";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import NewPassWordPage from "./pages/authPages/NewPassWordPage";
function App() {
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
        <Route></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
