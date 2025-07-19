import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Activity,
  TrendingUp,
  PieChart,
  Target
} from 'lucide-react';
import DashLayout from '@/layouts/DashLayout';

const OrganizationPage = () => {
  const [expandedDepts, setExpandedDepts] = useState({});
  const [activeTab, setActiveTab] = useState('structure');
  const [searchTerm, setSearchTerm] = useState('');

  const organizationData = {
    company: {
      name: "TechCorp Solutions",
      established: "2015",
      employees: 1250,
      locations: 8,
      departments: 12
    },
    departments: [
      {
        id: 1,
        name: "Engineering",
        manager: "Sarah Johnson",
        employees: 245,
        location: "San Francisco",
        budget: "$2.5M",
        subdepartments: [
          { name: "Frontend Development", employees: 45, manager: "Alex Chen" },
          { name: "Backend Development", employees: 52, manager: "Mike Roberts" },
          { name: "DevOps", employees: 28, manager: "Lisa Wang" },
          { name: "QA Testing", employees: 35, manager: "John Smith" }
        ]
      },
      {
        id: 2,
        name: "Marketing",
        manager: "Emma Davis",
        employees: 85,
        location: "New York",
        budget: "$1.8M",
        subdepartments: [
          { name: "Digital Marketing", employees: 35, manager: "Tom Wilson" },
          { name: "Content Strategy", employees: 25, manager: "Rachel Green" },
          { name: "Brand Management", employees: 25, manager: "David Brown" }
        ]
      },
      {
        id: 3,
        name: "Sales",
        manager: "Robert Miller",
        employees: 120,
        location: "Chicago",
        budget: "$3.2M",
        subdepartments: [
          { name: "Enterprise Sales", employees: 45, manager: "Jennifer Lee" },
          { name: "SMB Sales", employees: 40, manager: "Mark Taylor" },
          { name: "Customer Success", employees: 35, manager: "Amy Johnson" }
        ]
      },
      {
        id: 4,
        name: "Human Resources",
        manager: "Maria Garcia",
        employees: 45,
        location: "Austin",
        budget: "$850K",
        subdepartments: [
          { name: "Recruitment", employees: 18, manager: "Chris Anderson" },
          { name: "Employee Relations", employees: 15, manager: "Diana Ross" },
          { name: "Compensation", employees: 12, manager: "Kevin White" }
        ]
      },
      {
        id: 5,
        name: "Finance",
        manager: "William Chen",
        employees: 65,
        location: "Boston",
        budget: "$1.2M",
        subdepartments: [
          { name: "Accounting", employees: 25, manager: "Patricia Martinez" },
          { name: "Financial Planning", employees: 20, manager: "James Wilson" },
          { name: "Treasury", employees: 20, manager: "Linda Davis" }
        ]
      }
    ],
    locations: [
      { city: "San Francisco", address: "123 Tech Street", employees: 350, established: "2015" },
      { city: "New York", address: "456 Business Ave", employees: 280, established: "2017" },
      { city: "Chicago", address: "789 Commerce Blvd", employees: 220, established: "2018" },
      { city: "Austin", address: "321 Innovation Dr", employees: 180, established: "2019" },
      { city: "Boston", address: "654 Finance Way", employees: 150, established: "2020" }
    ]
  };

  const toggleDepartment = (deptId) => {
    setExpandedDepts(prev => ({
      ...prev,
      [deptId]: !prev[deptId]
    }));
  };

  const filteredDepartments = organizationData.departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ icon: Icon, title, value, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: '#E6E2FC' }}>
          <Icon className="h-6 w-6" style={{ color: '#8B5CF6' }} />
        </div>
      </div>
    </div>
  );

  const DepartmentCard = ({ department }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mb-4">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={() => toggleDepartment(department.id)}
              className="mr-3 p-1 hover:bg-gray-100 rounded"
            >
              {expandedDepts[department.id] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
              <p className="text-sm text-gray-600">Manager: {department.manager}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Edit3 className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">Employees</span>
            </div>
            <p className="text-lg font-semibold">{department.employees}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">Location</span>
            </div>
            <p className="text-lg font-semibold">{department.location}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">Budget</span>
            </div>
            <p className="text-lg font-semibold">{department.budget}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">Teams</span>
            </div>
            <p className="text-lg font-semibold">{department.subdepartments.length}</p>
          </div>
        </div>

        {expandedDepts[department.id] && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Sub-departments</h4>
            <div className="grid gap-3">
              {department.subdepartments.map((subDept, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{subDept.name}</p>
                    <p className="text-sm text-gray-600">Manager: {subDept.manager}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{subDept.employees} employees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashLayout>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50" style={{ backgroundColor: '#E6E2FC'}}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Organization Management</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Overview */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{organizationData.company.name}</h2>
                <p className="text-gray-600">Established {organizationData.company.established}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit3 className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                title="Total Employees"
                value={organizationData.company.employees.toLocaleString()}
                trend="+12% this year"
              />
              <StatCard
                icon={MapPin}
                title="Locations"
                value={organizationData.company.locations}
                trend="+2 new offices"
              />
              <StatCard
                icon={Building2}
                title="Departments"
                value={organizationData.company.departments}
                trend="+1 this quarter"
              />
              <StatCard
                icon={TrendingUp}
                title="Growth Rate"
                value="15.2%"
                trend="Year over year"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'structure', name: 'Organization Structure', icon: Building2 },
                { id: 'locations', name: 'Locations', icon: MapPin },
                { id: 'analytics', name: 'Analytics', icon: PieChart }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'structure' && (
          <div>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search departments or managers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>

            {/* Departments List */}
            <div className="space-y-4">
              {filteredDepartments.map((department) => (
                <DepartmentCard key={department.id} department={department} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="grid gap-6">
            {organizationData.locations.map((location, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{location.city}</h3>
                    <p className="text-gray-600">{location.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Established {location.established}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{location.employees} employees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit3 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
              <div className="space-y-4">
                {organizationData.departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{dept.name}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(dept.employees / 245) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{dept.employees}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">New Hires (This Quarter)</p>
                    <p className="text-sm text-gray-600">Q1 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">+87</p>
                    <p className="text-sm text-gray-600">employees</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Turnover Rate</p>
                    <p className="text-sm text-gray-600">Annual</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">8.2%</p>
                    <p className="text-sm text-gray-600">industry avg: 12%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </DashLayout> 
  );
};

export default OrganizationPage;