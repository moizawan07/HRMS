import React, { useEffect, useState } from "react";
import DashLayout from "@/components/Dashboard/DashLayout";
import { Users, Mail, MapPin, UserPlus, DollarSign, Shield, Search, Filter, EllipsisVertical, Cog, BadgeMinus, Eye, Pencil } from "lucide-react";

const salaryRanges = {
  "20000-30000": "20k - 30k",
  "51000-100000": "51k - 100k", 
  "101000-200000": "101k - 200k",
  "201000-500000": "201k - 500k"
};

const roleColors = {
  admin: "bg-red-100 text-red-800 border-red-200",
  // Manager: "bg-blue-100 text-blue-800 border-blue-200",
  employee: "bg-green-100 text-green-800 border-green-200",
  hr: "bg-purple-100 text-purple-800 border-purple-200",
  // Developer: "bg-indigo-100 text-indigo-800 border-indigo-200"
};

const salaryColors = {
  "20000-30000": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "51000-100000": "bg-green-100 text-green-800 border-green-200",
  "101000-200000": "bg-blue-100 text-blue-800 border-blue-200", 
  "201000-500000": "bg-purple-100 text-purple-800 border-purple-200"
};

const Badge = ({ children, className }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium border inline-flex items-center space-x-1 ${className}`}>
    {children}
  </span>
);

const Select = ({ value, onValueChange, className, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${className}`}
      >
        <span className="flex items-center space-x-2">
          {/* <DollarSign className="w-4 h-4" /> */}
          <p>Rs:</p>
          <span>{value ? salaryRanges[value] : placeholder}</span>
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl">
          <div className="py-1">
            {Object.entries(salaryRanges).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  onValueChange(key);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors rounded-lg mx-1 my-1"
              >
                <DollarSign className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DManageStaff = () => {
  const [staffData, setStaffData] = useState([
    {
      _id: "1",
      firstName: "John Anderson",
      email: "john.anderson@company.com",
      role: "hr",
      address: "New York",
      invitedBy: "Sarah Wilson",
      salary: "101000-200000"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

   useEffect(() => {
    // Your original fetch logic
    fetch(`${import.meta.env.VITE_SERVER_URL}/fetchAllUsers`)
      .then(res => res.json())
      .then(data => setStaffData(data.data))
      .catch(err => console.log(err));
  }, []);

  const handleSalaryChange = async (userId, newSalary) => {
    
    let apiCall = false;
    const updatedData = staffData.map((user) =>{
        if(user._id === userId && user.salary !== newSalary){
          apiCall = true
          return {...user, salary : newSalary}
        }
        return user;
    });

    if(!apiCall) return; // If api Call False menas admin same price click agian so price no change so why api call
    setStaffData(updatedData);
    
    try {
      // Your API call here
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/updateSalary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, salary: newSalary }),
        credentials: 'include'
      });
      let resData = await res.json();
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

 
  const filteredStaffData = staffData.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });


  const getRoleCount = (role) => {
    return staffData.filter(user => user.role === role).length;
  };

  const getSalaryRangeCount = (range) => {
    return staffData.filter(user => user.salary === range).length;
  };

  return (
    <DashLayout>
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f3f0ff 0%, #e6e2fc 100%)' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 mb-8 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  Staff Management
                </h1>
                <p className="text-gray-600 mt-1">Manage your team members and their information</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <UserPlus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-7 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Staff</p>
                  <p className="text-3xl font-bold">{staffData.length}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Admins</p>
                  <p className="text-3xl font-bold">1</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">HR</p>
                  <p className="text-3xl font-bold">{getRoleCount('hr')}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Employees</p>
                  <p className="text-3xl font-bold">{getRoleCount('employee')}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search staff members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-80"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Showing {filteredStaffData.length} of {staffData.length} staff members</span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <Users className="w-6 h-6" />
                <span>Staff Directory</span>
              </h2>
              <div className=" bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-white font-medium">{filteredStaffData.length} Members</span>
              </div>
            </div>
          </div>

          {filteredStaffData.length <= 0 ? (
            <div className="p-16 text-center">
              <div className="bg-purple-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Staff Members Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or add new staff members.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-purple-100">
                    <th className="text-purple-700 font-semibold text-left py-4 px-6">Staff Member</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Role</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Address</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Invited By</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Salary Range</th>
                    <th className="text-purple-700 font-semibold text-center py-4 flex gap-2 justify-center items-center">
                    Edit <Cog  size={20}/>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaffData.map((user, index) => (
                    <tr key={user._id} className="border-b border-purple-50 hover:bg-purple-25 transition-all duration-300 hover:shadow-sm">
                      <td className="py-6 pl-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-2x1">
                              {user.firstName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-3x1">{user.firstName}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Mail className="w-3 h-3"  />
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-center">
                        <Badge className={`${roleColors[user.role]} shadow-sm`}>
                          <Shield className="w-3 h-3" />
                          <span className="font-semibold capitalize">{user.role}</span>
                        </Badge>
                      </td>
                      <td className="py-6 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2 max-w-xs">
                          <MapPin className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-[14px] text-gray-700 truncate">{user.address}</span>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-gray-900 text-sm">{user.invitedBy}</span>
                          <span className="text-xs text-yellow-500 bg-gray-100 px-2 py-1 rounded-full mt-1">Inviter</span>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-center">
                        <div className="flex justify-center">
                          <Select
                            value={user.salary}
                            onValueChange={(value) => handleSalaryChange(user._id, value)}
                            className={`w-32 ${salaryColors[user.salary]} shadow-sm`}
                            placeholder="Select range"
                          />
                        </div>
                      </td>
                      <td className=" py-6 pl-5 pr-3  flex justify-center gap-2 items-center ">
                       <div className="w-8 h-8 rounded-lg grid place-items-center text-red-800 bg-red-200"> 
                        <BadgeMinus size={17}/>
                        </div>

                         <div className="w-8 h-8 rounded-lg grid place-items-center text-yellow-800 bg-yellow-100"> 
                        <Eye size={17}/>
                        </div>

                         <div className="w-8 h-8 rounded-lg grid place-items-center text-green-900 bg-green-200"> 
                        <Pencil size={17}/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Salary Distribution Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">Salary Distribution</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(salaryRanges).map(([key, label]) => (
              <div key={key} className={`${salaryColors[key]} rounded-lg p-4 text-center`}>
                <div className="text-2xl font-bold mb-1">{getSalaryRangeCount(key)}</div>
                <div className="text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </DashLayout>
  );
};

export default DManageStaff;