import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUpPage from "./pages/authPages/SignUpPage";
function App() {
  return (
    <>
      <SignUpPage />
      <ToastContainer />
    </>
  );
}

export default App;
