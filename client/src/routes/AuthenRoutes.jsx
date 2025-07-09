

import DashboardPage from "@/pages/Authen/Dashboard";
import DAttendence from "@/pages/Authen/DAttendence/DAttendence";
import DInvite from "@/pages/Authen/DInvite";
import DLeaves from "@/pages/Authen/DLeaves/index";
import DProfile from "@/pages/Authen/DProfile";
import InviteVerify from "@/pages/Authen/InviteVerify";
import { Route } from "react-router-dom";
import DManageStaff from "@/pages/Authen/DManageStaff";
import DCompanies from "@/pages/Authen/DCompanies/Index";
import ProtectedRoute from "@/components/ProtectedRoute";

function AuthenRoutes() {
  return (
    <>
      <Route path="/dashboard" element={
       <ProtectedRoute> <DashboardPage /> </ProtectedRoute>
      } />

      <Route path="/dashboard/manageStaff" element={
        <ProtectedRoute> <DManageStaff /> </ProtectedRoute>
      }/>

      <Route path="/dashboard/attendance" element={
         <ProtectedRoute> <DAttendence /> </ProtectedRoute>
        }/>

      <Route path="/dashboard/leaves" element={
        <ProtectedRoute>  <DLeaves /> </ProtectedRoute>
        } />

      <Route path="/dashboard/profile" element={
               <ProtectedRoute>   <DProfile /> </ProtectedRoute>

        } />

      <Route path="/dashboard/invite" element={
        <ProtectedRoute>  <DInvite /> </ProtectedRoute>

        } />

      <Route path="/verify/:id" element={
        <InviteVerify />
        } />

      <Route path="/dashboard/companies" element={
              <ProtectedRoute>    <DCompanies /> </ProtectedRoute>

        } />

    </>
  );
}

export default AuthenRoutes;
