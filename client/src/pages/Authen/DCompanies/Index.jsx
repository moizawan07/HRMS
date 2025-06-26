import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashLayout from "@/layouts/DashLayout";
import AllCompanies from "./Companies";
import InvitesCompaies from "./InvitesCompaies";
import { useEffect, useState } from "react";
import DashLoading from "@/components/Dashboard/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
function index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  if (loading) {
    return <DashLoading pageName="Companies" />;
  }

  return (
    <DashLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#E6E2FC] to-purple-100 pt-4 px-5">
        <Tabs defaultValue="AllCompanies">
          <TabsList className="bg-white rounded-lg py-1 mb-2 flex justify-between">
            <TabsTrigger
              value="AllCompanies"
              className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700"
            >
              All Companies
            </TabsTrigger>
            {/* Other tabs present for layout consistency, but their content is placeholders */}
            <TabsTrigger
              value="InvitesCompanies"
              className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700"
            >
              Invites Companies
            </TabsTrigger>
            {/* Simulating changing the current user's role for testing the dropdown behavior */}

            <TabsTrigger
              value="History"
              className={`px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700`}
            >
              History
            </TabsTrigger>
          </TabsList>

          {/* All Comapnies Components */}
          <TabsContent value="AllCompanies">
            <AllCompanies />
          </TabsContent>

          {/* Invites Companies Componnets */}
          <TabsContent value="InvitesCompanies">
            <InvitesCompaies />
          </TabsContent>

          {/* History Components */}
          <TabsContent value="History">
            <div className="min-h-screen bg-gray-50 flex items-center  justify-center">
              <Card className="w-96">
                <CardContent className="text-center p-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    No History
                  </h2>
                  <p className="text-gray-600">
                    There are no company invites to display.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashLayout>
  );
}

export default index;
