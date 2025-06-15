
import { Route } from "react-router-dom";
import Home from "../pages/UnAuthen/Home";
import Login from "@/pages/UnAuthen/Login";
import ForgotPasswordPage from "@/pages/UnAuthen/ForgotPassword";
import ResetPassword from "@/pages/UnAuthen/ResetPassword";

function UnAuthenRoutes() {
  return (
    <>
      <Route path="*" element={<div>Page Not Found</div>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </>
  );
}

export default UnAuthenRoutes;
