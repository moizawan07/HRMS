

import DashboardPage from "@/pages/Authen/Dashboard";
import DAttendence from "@/pages/Authen/DAttendence/DAttendence";
import DInvite from "@/pages/Authen/DInvite";
import DLeaves from "@/pages/Authen/DLeaves";
import DProfile from "@/pages/Authen/DProfile";
import InviteVerify from "@/pages/Authen/InviteVerify";
import { Route } from "react-router-dom";
import DManageStaff from "@/pages/Authen/DManageStaff";

function AuthenRoutes() {
  return (
    <>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/manageStaff" element={<DManageStaff />} />
      <Route path="/dashboard/attendance" element={<DAttendence />} />
      <Route path="/dashboard/leaves" element={<DLeaves />} />
      <Route path="/dashboard/profile" element={<DProfile />} />
      <Route path="/dashboard/invite" element={<DInvite />} />
      <Route path="/verify/:id" element={<InviteVerify />} />
    </>
  );
}

export default AuthenRoutes;
