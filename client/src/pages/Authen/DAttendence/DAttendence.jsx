import DashLayout from "@/layouts/DashLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import AddAttendanceModal from "./AddAttenceModal";
import { UserContext } from "@/context/userContext";
import AttendanceTable from "./AttendenceTable";
import RequestAttend from "./RequestAttend";

function DAttendence() {
  let { userConData, setUserConData } = useContext(UserContext);

  // Mark UnAttended function call api
  const handleMarkAttended = async () => {
    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/markUnAttended`, {
        method: 'GET',
        credentials : 'include'
      })
      let resData = await res.json()

      if(res.status !== 200) throw new Error(resData.message)

      alert(resData.message)  
      
    } catch (error) {
      alert(error)
    }
  }

  return (
    <DashLayout>
      {/* Right Side */}
      <div
        className="w-full min-h-screen pt-5 px-7 relative pb-5"
        style={{
          background: "linear-gradient(135deg, #f3f0ff 0%, #e6e2fc 100%)",
        }}
      >
        <Tabs defaultValue="YourAttendence">
          <TabsList className="bg-white rounded-lg py-1 mb-2 flex justify-between">
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

           <TabsTrigger
              value="markUnAttended"
              className={`px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700
                ${userConData.user.role === "admin" ? "" : "hidden"}`}
            >
              Mark Un-Attended (attendence)
            </TabsTrigger>

            <Button
              variant="ghost"
              className="ml-4 text-xs text-gray-500 hover:text-blue-700"
              title="Click to toggle current user role for testing"
              >
              Current Role  <span className="text-xs text-blue-400">({userConData.user.role})</span>
            </Button>
          </TabsList>

          

          {/* Attendence Modal compoenents */}
          <div className="absolute top-5 right-9">
            <AddAttendanceModal
              email={
                userConData.user.role != "admin" ? userConData.user.email : ""
              }
              role={userConData.user.role}
            />
          </div>

{/* Attenfdence Show Table */}
          <TabsContent value="YourAttendence">
            <AttendanceTable />
          </TabsContent>

{/* Request Table */}
          <TabsContent value="RequestAttendence">
            <RequestAttend />
          </TabsContent>

          {/* Mark UnAttended Attendence Section */}
          <TabsContent value="markUnAttended">
            <Button className="bg-blue-600"
             onClick={handleMarkAttended}
            >
              Mark UnAttended 
              </Button>
          </TabsContent>
        </Tabs>

      </div>
    </DashLayout>
  );
}

export default DAttendence;
