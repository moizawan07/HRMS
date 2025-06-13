import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSidebar from "@/components/Dashboard/SideBar";
import TopHeader from "@/components/Dashboard/DashboardTab/TopHeader";
// import DashboardMetrics from "@/components/Dashboard/DashboardTab/MetricCards"
import { LeftRightCards } from "@/components/Dashboard/DashboardTab/AllsimpleCom";
import DashboardMetrics from "@/components/Dashboard/DashboardTab/MetricCards";
import {CompaniesBarChart,  RevenueChart, TopPlansPieChart} from '@/components/Dashboard/DashboardTab/charts'



function DashboardPage() {
  return (
    <div className="w-full flex flex-wrap justify-between">
      <DashboardSidebar />
      {/* Right Bar */}
      <div className="w-[82%] px-2">
        <DashboardHeader />
        <TopHeader />
        <DashboardMetrics />
        <LeftRightCards />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
          <CompaniesBarChart />
          <RevenueChart /> {/* This will span 2 columns on lg screens */}
          <TopPlansPieChart />
          
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
