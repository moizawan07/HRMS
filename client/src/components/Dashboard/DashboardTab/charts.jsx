import { useState } from 'react';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Lucide Icons
import {
  HelpCircle,
  ArrowUp,
  Users,           // For Total Employees
  CalendarCheck,   // For On Leave
  Search,          // For Hiring Roles
  Settings,
  Calendar,
  Award,
  TrendingUp,
  Info,
  PlusCircleIcon,        // For date selectors in charts
} from "lucide-react";

// Recharts
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell,
  ComposedChart, Area, Line, Legend, CartesianGrid,
  PieChart, Pie,
} from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

// --- 3. CompaniesBarChart Component (using CustomShapeBarChart concept) ---
export function CompaniesBarChart() { // Exported as named export
  const [timeframe, setTimeframe] = useState("this-week");

  const data = [
    { name: 'M', companies: 45 },
    { name: 'T', companies: 135 },
    { name: 'W', companies: 140 },
    { name: 'T', companies: 180 },
    { name: 'F', companies: 105 },
    { name: 'S', companies: 130 },
    { name: 'S', companies: 255 },
  ];

  // Custom Bar to apply consistent styling (e.g., rounded corners)
  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    return <rect x={x} y={y} width={width} height={height} rx={5} ry={5} fill={fill} />;
  };

  return (
    <Card className="col-span-1 p-2.5 pt-4 rounded-xl shadow-md ">
      <CardHeader className="flex flex-row items-center justify-between  px-2 pt-0 border-b ">
        <CardTitle className="text-xl font-bold">Companies</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[130px] h-7 text-[12px]">
              <Calendar className="h-2 w-2" />
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chart Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="w-full mt-4 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide={true} domain={[0, 'auto']} />
              <RechartsTooltip
                cursor={{ fill: 'transparent' }}
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        return (
                            <div className="bg-white p-2 border rounded shadow-md text-sm">
                                <p className="font-semibold">{`${payload[0].value} Companies`}</p>
                            </div>
                        );
                    }
                    return null;
                }}
              />
              <Bar dataKey="companies" fill="#2c3e50" shape={<CustomBar />}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#2c3e50" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center mt-13">
          <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full mr-2 flex items-center">
            <ArrowUp className="h-3 w-3 mr-1" />+6%
          </div>
          <p className="text-sm text-gray-600 whitespace-nowrap">5 Companies from last month</p>
        </div>
      </CardContent>
    </Card>
  );
}

// --- 4. RevenueChart Component (using LineBarAreaComposedChart) ---
export function RevenueChart() { // Exported as named export
  const [year, setYear] = useState("2025");

  const data = [
    { name: 'Jan', revenue: 40000, pv: 2400, amt: 2400 },
    { name: 'Feb', revenue: 30000, pv: 1398, amt: 2210 },
    { name: 'Mar', revenue: 45000, pv: 9800, amt: 2290 },
    { name: 'Apr', revenue: 78000, pv: 3908, amt: 2000 },
    { name: 'May', revenue: 80000, pv: 4800, amt: 2181 },
    { name: 'Jun', revenue: 85000, pv: 3800, amt: 2500 },
    { name: 'Jul', revenue: 80000, pv: 4300, amt: 2100 },
    { name: 'Aug', revenue: 82000, pv: 3500, amt: 2100 },
    { name: 'Sep', revenue: 81000, pv: 4900, amt: 2100 },
    { name: 'Oct', revenue: 20000, pv: 4300, amt: 2100 },
    { name: 'Nov', revenue: 80000, pv: 3500, amt: 2100 },
    { name: 'Dec', revenue: 78000, pv: 4900, amt: 2100 },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2 p-4 rounded-xl shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-0 pt-0">
        <CardTitle className="text-xl font-bold">Revenue</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[130px] h-12 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chart Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="mb-4">
          <h3 className="text-4xl font-bold text-gray-900">$45787</h3>
          <p className="text-sm text-green-600">+40% increased from last year</p>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}K`} />
              <RechartsTooltip />
              <Legend verticalAlign="top" align="right" height={5}  />
              <Bar dataKey="revenue" barSize={20} fill="#f97316" radius={[5, 5, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// --- 5. TopPlansPieChart Component (using PieChartWithCustomizedLabel) ---
export function TopPlansPieChart() { // Exported as named export
  const [timeframe, setTimeframe] = useState("this-month");

  const data = [
    { name: 'Basic', value: 60, color: '#3b82f6' },
    { name: 'Premium', value: 20, color: '#f59e0b' },
    { name: 'Enterprise', value: 20, color: '#ef4444' },
  ];

  return (
    <Card className="col-span-1 p-4 rounded-xl shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-0 pt-0">
        <CardTitle className="text-xl font-bold">Top Plans</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[135px] h-9 text-[12px]">
              <Calendar className="h-2 w-2" />
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chart Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col items-center justify-center">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="45%"
                cy="47%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend
                align="right"
                verticalAlign="middle"
                layout="vertical"
                wrapperStyle={{ right: 20, lineHeight: '24px' }}
                content={({ payload }) => (
                    <ul className="list-none p-0 m-0">
                        {payload.map((entry, index) => (
                            <li key={`item-${index}`} className="flex items-center text-sm mb-1">
                                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                                {entry.value}% {entry.name}
                            </li>
                        ))}
                    </ul>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

