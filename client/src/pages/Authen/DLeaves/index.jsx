import React, { useContext, useState } from 'react';
import DashLoading from "@/components/Dashboard/Loading";
import DashLayout from "@/layouts/DashLayout"
import { Calendar, Clock, User, Mail, FileText, Plus, Eye, History, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import UserLeaves from './UserLeaves';
import LeaveRequest from './LeaveRequest';
import { StatusBadge } from './LeaveCard';
import { UserContext } from '@/context/userContext';

const LeaveManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });
  const {userConData: {user}} = useContext(UserContext)
   console.log("index ==>", user);
   
 
  const leaveHistory = [
    { id: 1, type: 'Annual Leave', from: '2024-06-01', to: '2024-06-05', status: 'Approved', days: 5 },
    { id: 2, type: 'Sick Leave', from: '2024-05-15', to: '2024-05-16', status: 'Approved', days: 2 },
    { id: 3, type: 'Personal Leave', from: '2024-04-20', to: '2024-04-22', status: 'Approved', days: 3 },
    { id: 4, type: 'Emergency Leave', from: '2024-03-10', to: '2024-03-11', status: 'Approved', days: 2 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      leaveType: '',
      fromDate: '',
      toDate: '',
      reason: ''
    });
  };

  return (
    <DashLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50" style={{ backgroundColor: '#E6E2FC' }}>
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Leave Management System
            </h1>
            <p className="text-purple-100 text-lg">Manage your leave requests efficiently and professionally</p>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <CardTitle className="text-2xl text-purple-700 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Leave Dashboard
              </CardTitle>
              <Button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Apply Leave
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue={`${user.role !== 'admin' ? 'your-leaves' : 'requests'}`} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-purple-100 to-indigo-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="your-leaves"
                //   disable={"true"} 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Your Leaves
                </TabsTrigger>
                <TabsTrigger 
                  value="requests"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Requests
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>

                 {/* User Leaves  */}
              <TabsContent value="your-leaves" className="space-y-4">
               <UserLeaves />
              </TabsContent>

                  {/*  Leaves Request Tab */}
              <TabsContent value="requests" className="space-y-4">
              <LeaveRequest />
              </TabsContent>

                {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full mr-4"></div>
                  <h3 className="text-xl font-semibold text-purple-700">Leave History</h3>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Apply Leave Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-purple-50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center">
                <Plus className="w-6 h-6 mr-2" />
                Apply for Leave
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-purple-700 font-medium">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="pl-10 border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-700 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="pl-10 border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="leaveType" className="text-purple-700 font-medium">Leave Type</Label>
                  <Select
                    value={formData.leaveType}
                    onValueChange={(value) => handleSelectChange('leaveType', value)}
                  >
                    <SelectTrigger className="border-purple-200 focus:border-purple-500">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal Leave</SelectItem>
                      <SelectItem value="maternity">Maternity Leave</SelectItem>
                      <SelectItem value="emergency">Emergency Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromDate" className="text-purple-700 font-medium">From Date</Label>
                    <Input
                      id="fromDate"
                      name="fromDate"
                      type="date"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toDate" className="text-purple-700 font-medium">To Date</Label>
                    <Input
                      id="toDate"
                      name="toDate"
                      type="date"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-purple-700 font-medium">Reason</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Enter detailed reason for leave..."
                    rows={4}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Leave Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      </div>
    </DashLayout>
  );
};

export default LeaveManagementPage;