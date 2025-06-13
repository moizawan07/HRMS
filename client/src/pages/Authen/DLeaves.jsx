import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSidebar from "@/components/Dashboard/SideBar";




function DLeaves() {
  return (
    <div className="w-full flex flex-wrap justify-between">
      <DashboardSidebar />
      {/* Right Bar */}
      <div className="w-[82%] px-2">
        <DashboardHeader />
         <h1>Leaves page page</h1>
      </div>
    </div>
  );
}

export default DLeaves;
