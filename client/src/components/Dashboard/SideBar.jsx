import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// Lucide Icons
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  FolderKanban,
  Building,
  DollarSign,
  FileText,
  UserCog,
  LogOut,
  PanelLeftClose, // Icon for collapsing
  PanelLeftOpen, // Icon for expanding
  BadgePlus,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "@/context/userContext";

// --- Navigation Data ---
// Define your sidebar links with their icons
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Manage Staff", icon: Users, href: "/manageStaff" },
  { name: "Attendance", icon: CalendarCheck, href: "/attendance" },
  { name: "Leaves", icon: CalendarOff, href: "/leaves" },
  { name: "Projects", icon: FolderKanban, href: "/projects" },
  { name: "Organization", icon: Building, href: "/organization" },
  { name: "Finance", icon: DollarSign, href: "/finance" },
  { name: "HR Documents", icon: FileText, href: "/hr-documents" },
  { name: "Profile", icon: UserCog, href: "/profile" },
  { name: "invite", icon: BadgePlus, href: "/invite" },
];

const logoutItem = {
  name: "Logout",
  icon: LogOut,
  href: "/logout",
  isLogout: true,
};

export default function DashboardSidebar() {
  console.log("sidebar com run==>");
  const [navItemsSta, setNavItems] = useState(navItems)
  let { userConData, setUserConData } = useContext(UserContext);
  let { role } = userConData.user;


 
  useEffect(() => {
  let updatedNav = [...navItems]
    .map((item) => {
      if (item.name === "Attendance" && role === "owner") {
        return {
          ...item,
          name: "Companies",
          href: "/companies",
        };
      }
      return item;
    })
    .filter((item) => {
      if (item.name === "Manage Staff" && role !== "admin") return false;
      if (item.name === "invite" && role === "employee") return false;
      return true;
    });

  setNavItems(updatedNav);
}, [role]);


  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    // Main sidebar container with gradient background and responsive width
    <div
      className={`
        flex flex-col h-screen
        bg-gradient-to-b from-hrms-gradient-start to-hrms-gradient-end
        text-gray-900
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-[18%]" : "w-[5%]"} 
        p-4 border-r border-gray-200
        rounded-xl
        bg-gradient-to-br from-purple-50 via-indigo-250 to-blue-100
        sticky top-0.5 
      `}
      style={{ backgroundColor: "#E6E2FC" }}
    >
      {/* Top Section: Logo/HRMS Name and Toggle Button */}
      <div className="flex items-center justify-between h-16 mb-6">
        {isExpanded ? (
          <div className="flex items-center space-x-2">
            {/* Replace with your actual logo, maybe a smaller version for sidebar */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzxrvZiUTKMaPf7hn1OHk_qp8nXd1h2HYgA&s"
              alt="HRMS Logo"
              className="h-8 w-auto"
            />
            {/* <span className="text-xl font-bold">HRMS Admin</span> */}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            {/* Small logo/icon when collapsed */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzxrvZiUTKMaPf7hn1OHk_qp8nXd1h2HYgA&s"
              alt="HRMS"
              className="h-8 w-auto"
            />
          </div>
        )}

        {/* Toggle Button for Desktop */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={`
                  hidden md:flex
                  ${
                    isExpanded
                      ? ""
                      : "absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md z-10"
                  }
                `}
                aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
              >
                {isExpanded ? (
                  <PanelLeftClose className="h-10 w-10 text-gray-700" />
                ) : (
                  <PanelLeftOpen className="h-25  w-25 text-gray-700" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* This is a simple placeholder for mobile: On small screens, the sidebar width is set by a parent layout, 
            and this component just fills it. The toggle button is hidden on mobile, assuming the main layout 
            will handle collapsing the parent container or using a different mobile menu strategy.
            If you truly need a different mobile toggle within this component, we can add it.
        */}
      </div>

      {/* Navigation Links */}
      <ScrollArea className="flex-grow">
        {" "}
        {/* Allows scrolling if too many items */}
        <nav className="space-y-2">
          {navItemsSta.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={
                      item.href.includes("dashboard")
                        ? item.href
                        : `/dashboard${item.href}`
                    } // Use actual router links if you have one (e.g., <NavLink href={item.href}>)
                    className={` sidebar
                      flex items-center 
                      ${isExpanded ? "justify-start" : "justify-center"}
                      gap-3 p-3 rounded-lg text-gray-800
                      hover:bg-hrms-primary hover:text-gray-900
                      transition-colors duration-200
                      ${!isExpanded ? "w-full" : ""}
                      ${
                        window.location.pathname === item.href
                          ? "bg-hrms-primary-dark text-gray-900 font-semibold"
                          : ""
                      }
                    `}
                  >
                    <item.icon
                      className={`h-6 w-6 ${!isExpanded ? "mr-0" : ""}`}
                    />
                    {isExpanded && (
                      <span className="text-base font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout Link - Always at the bottom */}
      <div className="mt-auto pt-6">
        {" "}
        {/* Use mt-auto to push to bottom */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to={logoutItem.href} // Use actual router links if you have one
                className={`
                  flex items-center
                  ${isExpanded ? "justify-start" : "justify-center"}
                  gap-3 p-3 rounded-lg text-red-600
                  hover:bg-red-100 hover:text-red-700
                  transition-colors duration-200
                  ${!isExpanded ? "w-full" : ""}
                `}
              >
                <logoutItem.icon
                  className={`h-6 w-6 ${!isExpanded ? "mr-0" : ""}`}
                />
                {isExpanded && (
                  <span className="text-base font-medium whitespace-nowrap">
                    {logoutItem.name}
                  </span>
                )}
              </NavLink>
            </TooltipTrigger>
            {!isExpanded && (
              <TooltipContent side="right">
                <p>{logoutItem.name}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
