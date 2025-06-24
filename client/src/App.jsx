import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Routes Import
import UnAuthenRoutes from "./routes/UnAuthenRoutes";
import AuthenRoutes from "./routes/AuthenRoutes";
import {NotFound}from "./pages/404";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <>
      <ToastContainer />
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            {UnAuthenRoutes()}
            {AuthenRoutes()}
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
