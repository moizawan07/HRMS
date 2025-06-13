

import DashboardPage from "@/pages/Authen/Dashboard";
import DAttendence from "@/pages/Authen/DAttendence";
import DEmployes from "@/pages/Authen/DEmployes";
import DLeaves from "@/pages/Authen/DLeaves";
import DProfile from "@/pages/Authen/DProfile";
import { Route } from "react-router-dom";

function AuthenRoutes() {
  return (
    <>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/employees" element={<DEmployes />} />
      <Route path="/dashboard/attendance" element={<DAttendence />} />
      <Route path="/dashboard/leaves" element={<DLeaves />} />
      <Route path="/dashboard/profile" element={<DProfile />} />
    </>
  );
}

export default AuthenRoutes;
