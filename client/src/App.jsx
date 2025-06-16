import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Routes Import
import UnAuthenRoutes from "./routes/UnAuthenRoutes";
import AuthenRoutes from "./routes/AuthenRoutes";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <>
      <ToastContainer />
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            {UnAuthenRoutes()}
            {AuthenRoutes()}
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
