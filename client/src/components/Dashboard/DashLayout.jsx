import DashboardHeader from "@/components/Dashboard/DashHeader";
import DashboardSidebar from "@/components/Dashboard/SideBar";





function DashLayout({children}) {
  return (
    <div className="w-full flex flex-wrap justify-between">
      <DashboardSidebar />
      {/* Right Bar */}
      <div className="w-[82%] px-2">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashLayout;
