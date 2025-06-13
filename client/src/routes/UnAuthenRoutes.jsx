
import { Route } from "react-router-dom";
import Home from "../pages/UnAuthen/Home";

function UnAuthenRoutes() {
  return (
    <>
      <Route path="*" element={<div>Page Not Found</div>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/forgetPassword" element={<div>Forget password Page</div>} />
    </>
  );
}

export default UnAuthenRoutes;
