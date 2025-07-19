import React, { useState } from 'react';
import { Search, Edit, Eye, DollarSign, Users, TrendingUp, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashLayout from '@/layouts/DashLayout';
import PaySalary from './PaySalary';
import {formatCurrency, calculateFinalSalary} from './common'

const SalaryManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
   const [salaries, setSalaries] = useState([
    {
      id: 1,
      name: 'Ali Raza',
      email: 'ali@example.com',
      designation: 'Software Engineer',
      baseSalary: 50000,
      allowances: 5000,
      deductions: 2000,
      bonuses: 3000,
      month: 'July 2025',
    },
    {
      id: 2,
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      designation: 'Product Manager',
      baseSalary: 75000,
      allowances: 8000,
      deductions: 3000,
      bonuses: 5000,
      month: 'July 2025',
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      designation: 'UI/UX Designer',
      baseSalary: 45000,
      allowances: 4000,
      deductions: 1500,
      bonuses: 2000,
      month: 'July 2025',
    },
    {
      id: 4,
      name: 'Sara Malik',
      email: 'sara@example.com',
      designation: 'Data Analyst',
      baseSalary: 55000,
      allowances: 6000,
      deductions: 2500,
      bonuses: 4000,
      month: 'July 2025',
    },
    {
      id: 5,
      name: 'Usman Sheikh',
      email: 'usman@example.com',
      designation: 'DevOps Engineer',
      baseSalary: 60000,
      allowances: 7000,
      deductions: 3000,
      bonuses: 3500,
      month: 'July 2025',
    },
    {
      id: 6,
      name: 'Ayesha Qureshi',
      email: 'ayesha@example.com',
      designation: 'HR Manager',
      baseSalary: 65000,
      allowances: 7500,
      deductions: 2800,
      bonuses: 4500,
      month: 'July 2025',
    }
  ]);


 


  const totalBaseSalary = salaries.reduce((sum, salary) => sum + salary.baseSalary, 0);
  const totalAllowances = salaries.reduce((sum, salary) => sum + salary.allowances, 0);
  const totalDeductions = salaries.reduce((sum, salary) => sum + salary.deductions, 0);
  const totalBonuses = salaries.reduce((sum, salary) => sum + salary.bonuses, 0);
  const totalFinalSalary = salaries.reduce((sum, salary) => sum + calculateFinalSalary(salary), 0);

  return (
    <DashLayout>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Salary Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage employee salaries and compensation</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{salaries.length}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Base Salary</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBaseSalary)}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Allowances</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAllowances)}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Final Salary</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalFinalSalary)}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Component */}
        <Tabs defaultValue="PaySalary" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-purple-100 to-indigo-100">
            <TabsTrigger value="PaySalary" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
             Pay Salary
            </TabsTrigger>
            <TabsTrigger value="name2" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              Name 2
            </TabsTrigger>
            <TabsTrigger value="History" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              History
            </TabsTrigger>
          </TabsList>

              {/* Search and Filter */}
           <Card className="border-purple-100 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Export Report
                </button>
                <button className="px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200">
                  Filter
                </button>
              </div>
            </div>
          </CardContent>
            </Card>

           {/* Pay Salary Content */}
          <TabsContent value="PaySalary" className="mt-6">
            <PaySalary searchTerm={searchTerm}/>
          </TabsContent>

           {/* Name 2 Content */}
          <TabsContent value="name2" className="mt-6">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-600">Name 2 Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">This is the content for Name 2 tab. You can add any components or data here.</p>
              </CardContent>
            </Card>
          </TabsContent>


          {/* History Content */}
          <TabsContent value="History" className="mt-6">
            
          </TabsContent>
        </Tabs>

       

        {/* Summary Footer */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-purple-100 text-sm">Total Base</p>
              <p className="text-xl font-bold">{formatCurrency(totalBaseSalary)}</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Total Allowances</p>
              <p className="text-xl font-bold">{formatCurrency(totalAllowances)}</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Total Deductions</p>
              <p className="text-xl font-bold">{formatCurrency(totalDeductions)}</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Total Bonuses</p>
              <p className="text-xl font-bold">{formatCurrency(totalBonuses)}</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Grand Total</p>
              <p className="text-2xl font-bold">{formatCurrency(totalFinalSalary)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashLayout>
  );
};

export default SalaryManagementPage;