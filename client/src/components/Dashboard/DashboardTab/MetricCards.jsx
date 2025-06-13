
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


import {
  Users,          
  CalendarCheck,   
  Search,          
  HelpCircle ,
  ArrowUp     
} from "lucide-react";


export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Card 1: Total Employees */}
      <MetricCard
        icon={Users} // People icon
        title="Total Employees"
        value="289"
        description="Total number of active employees."
        bgColor="bg-purple-100"
        textColor="text-gray-900"
        iconColor="text-purple-600"
      />

      {/* Card 2: On Leave */}
      <MetricCard
        icon={CalendarCheck} // Calendar icon
        title="On Leave"
        value="08"
        description="Number of employees currently on leave."
        bgColor="bg-green-100"
        textColor="text-gray-900"
        iconColor="text-green-600"
      />

      {/* Card 3: Hiring Roles */}
      <MetricCard
        icon={Search} // Magnifying glass icon
        title="Hiring Roles"
        value="03"
        description="Number of open positions currently being hired for."
        bgColor="bg-orange-100"
        textColor="text-gray-900"
        iconColor="text-orange-600"
      />

      {/* Card 4: Requests */}
      <MetricCard
        icon={HelpCircle} // Question mark in square icon
        title="Requests"
        value="28"
        description="Total pending requests from employees."
        bgColor="bg-blue-100"
        textColor="text-gray-900"
        iconColor="text-blue-600"
      />
    </div>
  );
}


// cards compoenet multiple times use 
function MetricCard({ icon: Icon, title, value, description, bgColor, textColor, iconColor }) {
  return (
    <Card className={`relative p-6 rounded-xl shadow-md overflow-hidden ${bgColor || 'bg-white'} ${textColor || 'text-gray-900'} flex flex-col justify-between`}>
      {/* Top right icons: Question Mark (Help) and Arrow Up (Trend) */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {/* Help/Info Icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Trend Arrow Icon */}
        <ArrowUp className="h-4 w-4 text-green-500" /> {/* Assuming green for up trend */}
      </div>

      {/* Main Content */}
      <CardContent className="p-0">
        <div className={`mb-3`}>
          {/* Main Icon */}
          {Icon && <Icon className={`h-8 w-8 ${iconColor || 'text-gray-700'}`} />}
        </div>
        <p className="text-base font-medium mb-2">{title}</p>
        <h2 className="text-5xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}