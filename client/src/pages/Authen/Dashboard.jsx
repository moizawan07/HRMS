import DashboardHeader from "@/components/Dashboard/DashHeader";
import DashboardSidebar from "@/components/Dashboard/SideBar";
import TopHeader from "@/components/Dashboard/DashboardTab/TopHeader";
// import DashboardMetrics from "@/components/Dashboard/DashboardTab/MetricCards"
import { LeftRightCards } from "@/components/Dashboard/DashboardTab/AllsimpleCom";
import DashboardMetrics from "@/components/Dashboard/DashboardTab/MetricCards";
import {CompaniesBarChart,  RevenueChart, TopPlansPieChart} from '@/components/Dashboard/DashboardTab/charts'
import DashLayout from "@/layouts/DashLayout";
import { useEffect, useState } from "react";
import DashLoading from "@/components/Dashboard/Loading";



function DashboardPage() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

 
  

  if(loading) {
   return <DashLoading  pageName= "Dashboard"/>
  }

  return (
    <DashLayout>
        <TopHeader />
        <DashboardMetrics />
        <LeftRightCards />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
          <CompaniesBarChart />
          <RevenueChart /> {/* This will span 2 columns on lg screens */}
          <TopPlansPieChart />
          
        </div>
      </DashLayout>
  
  );
}

export default DashboardPage;
