import DashLayout from "@/components/Dashboard/DashLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import AddAttendanceModal from "./AddAttenceModal";
import { UserContext } from "@/context/userContext";
import AttendanceTable from "./AttendenceTable";
import RequestAttend from "./RequestAttend";

function DAttendence() {
  let { userConData, setUserConData } = useContext(UserContext);

  return (
    <DashLayout>
      {/* Right Side */}
      <div
        className="w-full min-h-screen pt-5 px-10"
        style={{
          background: "linear-gradient(135deg, #f3f0ff 0%, #e6e2fc 100%)",
        }}
      >
        <Tabs defaultValue="YourAttendence">
          <TabsList className="bg-white rounded-lg p-1">
            <TabsTrigger
              value="YourAttendence"
              className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700"
            >
              Your Attendence
            </TabsTrigger>
            {/* Other tabs present for layout consistency, but their content is placeholders */}
            <TabsTrigger
              value="RequestAttendence"
              className={`px-8 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 ${
                userConData.user.role !== "employee" ? "" : "hidden"
              }`}
            >
              Request Attendence
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700"
            >
              Invitation History
            </TabsTrigger>
            {/* Simulating changing the current user's role for testing the dropdown behavior */}
            <Button
              variant="ghost"
              className="ml-4 text-xs text-gray-500 hover:text-blue-700"
              title="Click to toggle current user role for testing"
            >
              Current Role
            </Button>
          </TabsList>

          <div className="flex justify-between mt-10">
            <h1>Check Attendence</h1>
            <AddAttendanceModal
              email={
                userConData.user.role != "admin" ? userConData.user.email : ""
              }
              role={userConData.user.role}
            />
          </div>

{/* Request Table */}
          <TabsContent value="RequestAttendence">
            <RequestAttend />
          </TabsContent>

{/* Attenfdence Show Table */}
          <TabsContent value="YourAttendence">
            <AttendanceTable />
          </TabsContent>

        </Tabs>
      </div>
    </DashLayout>
  );
}

export default DAttendence;
