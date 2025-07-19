import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock, 
  Award, 
  BarChart3, 
  Settings, 
  UserPlus, 
  TrendingUp, 
  Shield, 
  BookOpen,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  Building,
  Target,
  PieChart,
  Activity
} from 'lucide-react';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashLayout from '@/layouts/DashLayout';

const HRMSProjectPage = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  // Stats data
  const stats = [
    { title: 'Total Employees', value: '1,245', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Projects', value: '84', change: '+5%', icon: Target, color: 'bg-green-500' },
    { title: 'Pending Leaves', value: '23', change: '-8%', icon: Calendar, color: 'bg-yellow-500' },
    { title: 'Monthly Payroll', value: '$2.4M', change: '+3%', icon: DollarSign, color: 'bg-purple-500' }
  ];

  // Module data
  const modules = [
    {
      id: 'employee-management',
      name: 'Employee Management',
      icon: Users,
      description: 'Manage employee profiles, onboarding, and records',
      features: ['Profile Management', 'Onboarding', 'Document Storage', 'Org Chart'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'attendance',
      name: 'Attendance & Time Tracking',
      icon: Clock,
      description: 'Track employee attendance and working hours',
      features: ['Clock In/Out', 'Timesheet', 'Overtime Tracking', 'Reports'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'payroll',
      name: 'Payroll Management',
      icon: DollarSign,
      description: 'Process payroll and manage compensation',
      features: ['Salary Processing', 'Tax Calculation', 'Payslips', 'Benefits'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'leave-management',
      name: 'Leave Management',
      icon: Calendar,
      description: 'Handle leave requests and holiday planning',
      features: ['Leave Applications', 'Approval Workflow', 'Holiday Calendar', 'Balance Tracking'],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'performance',
      name: 'Performance Management',
      icon: Award,
      description: 'Evaluate and track employee performance',
      features: ['Performance Reviews', 'Goal Setting', 'Feedback System', 'Ratings'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'recruitment',
      name: 'Recruitment & Hiring',
      icon: UserPlus,
      description: 'Manage job postings and candidate pipeline',
      features: ['Job Postings', 'Candidate Tracking', 'Interview Scheduling', 'Offer Management'],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'training',
      name: 'Training & Development',
      icon: BookOpen,
      description: 'Organize training programs and skill development',
      features: ['Training Modules', 'Skill Assessment', 'Certification Tracking', 'Learning Paths'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'analytics',
      name: 'HR Analytics & Reports',
      icon: BarChart3,
      description: 'Generate insights and analytical reports',
      features: ['Dashboard Analytics', 'Custom Reports', 'Data Visualization', 'KPI Tracking'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, type: 'New Employee', message: 'John Doe joined as Software Engineer', time: '2 hours ago', icon: UserPlus },
    { id: 2, type: 'Leave Request', message: 'Sarah Smith applied for annual leave', time: '4 hours ago', icon: Calendar },
    { id: 3, type: 'Payroll', message: 'Monthly payroll processed successfully', time: '1 day ago', icon: DollarSign },
    { id: 4, type: 'Performance', message: 'Q2 performance reviews completed', time: '2 days ago', icon: Award },
    { id: 5, type: 'Training', message: 'New training module published', time: '3 days ago', icon: BookOpen }
  ];

  // Quick actions
  const quickActions = [
    { name: 'Add Employee', icon: UserPlus, action: () => {}, color: 'bg-blue-500' },
    { name: 'Process Payroll', icon: DollarSign, action: () => {}, color: 'bg-green-500' },
    { name: 'Generate Report', icon: FileText, action: () => {}, color: 'bg-purple-500' },
    { name: 'Schedule Training', icon: BookOpen, action: () => {}, color: 'bg-orange-500' }
  ];

  const ModuleCard = ({ module }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} text-white`}>
            <module.icon className="w-6 h-6" />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
        </div>
        <CardTitle className="text-xl font-bold text-purple-700 mt-3">{module.name}</CardTitle>
        <p className="text-sm text-gray-600 mt-2">{module.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {module.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              {feature}
            </div>
          ))}
        </div>
        <Button 
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
          onClick={() => setActiveModule(module.id)}
        >
          Access Module
        </Button>
      </CardContent>
    </Card>
  );

  const StatCard = ({ stat }) => (
    <Card className="border-0 bg-gradient-to-br from-white to-purple-50 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              {stat.change}
            </p>
          </div>
          <div className={`p-3 rounded-full ${stat.color} text-white`}>
            <stat.icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashLayout>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50" style={{ backgroundColor: '#E6E2FC' }}>
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  HRMS Project Dashboard
                </h1>
                <p className="text-purple-100 text-lg">Complete Human Resource Management System</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Modules */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-purple-700 flex items-center">
                    <Building className="w-6 h-6 mr-2" />
                    HRMS Modules
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search modules..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modules.map((module) => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activities & Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
                <CardTitle className="text-lg text-purple-700 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 border-purple-200"
                      onClick={action.action}
                    >
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-center">{action.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
                <CardTitle className="text-lg text-purple-700 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <activity.icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-600 hover:bg-purple-50">
                  View All Activities
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
                <CardTitle className="text-lg text-purple-700 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Database Health</span>
                    <Badge className="bg-green-100 text-green-700">Optimal</Badge>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Server Load</span>
                    <Badge className="bg-yellow-100 text-yellow-700">Moderate</Badge>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Storage Usage</span>
                    <Badge className="bg-blue-100 text-blue-700">Good</Badge>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </DashLayout>
  );
};

export default HRMSProjectPage;