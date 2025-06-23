import React, { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle, UserCheck, Calendar, Mail, User } from "lucide-react";

const statusColors = {
  Approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Declined: "bg-rose-100 text-rose-800 border-rose-200",
};

const attendanceStatusColors = {
  Present: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Leave: "bg-amber-100 text-amber-800 border-amber-200",
  Absent: "bg-rose-100 text-rose-800 border-rose-200",
};

const statusIcons = {
  Approved: <CheckCircle className="w-4 h-4" />,
  Pending: <AlertCircle className="w-4 h-4" />,
  Declined: <XCircle className="w-4 h-4" />,
};

const Badge = ({ children, className }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium border inline-flex items-center space-x-2 ${className}`}>
    {children}
  </span>
);

const Select = ({ value, onValueChange, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${className}`}
      >
        <span className="flex items-center space-x-2">
          {statusIcons[value]}  
          <span>{value}</span>
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1">
            {['Approved', 'Pending', 'Declined'].map((option) => (
              <button
                key={option}
                onClick={() => {
                  onValueChange(option);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                {statusIcons[option]}
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RequestAttendance = () => {
  const [data, setData] = useState([]);

  const handleStatusChange = async (id, newStatus) => {
    const updatedData = data.map((item) =>
      item._id === id ? { ...item, approvalStatus: newStatus } : item
    );
    setData(updatedData);
    
    try {
      let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/attendenceAppproval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({ attendenceId: id, approvalMsg: newStatus }),
        credentials: 'include'
      });
      let resData = await res.json();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/attendenceRequestGet`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => console.log(err));
  }, []);

  const pendingRequests = data.filter(att => att.approvalStatus === 'Pending');
  const getStatusCount = (status) => {
    return pendingRequests.filter(att => att.status === status).length;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f3f0ff 0%, #e6e2fc 100%)' }}>
      <div className=" max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 mb-8 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  Attendance Requests
                </h1>
                <p className="text-gray-600 mt-1">Review and approve employee attendance requests</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Requests</p>
                  <p className="text-3xl font-bold">{pendingRequests.length}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Present Requests</p>
                  <p className="text-3xl font-bold">{getStatusCount('Present')}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">Leave Requests</p>
                  <p className="text-3xl font-bold">{getStatusCount('Leave')}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-100 text-sm">Absent Requests</p>
                  <p className="text-3xl font-bold">{getStatusCount('Absent')}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <AlertCircle className="w-6 h-6" />
                <span>Pending Requests</span>
              </h2>
              <div className=" bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-white font-medium">{pendingRequests.length} Pending</span>
              </div>
            </div>
          </div>

          {pendingRequests.length <= 0 ? (
            <div className="p-16 text-center">
              <div className="bg-purple-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Attendance Requests</h3>
              <p className="text-gray-500">All attendance requests have been processed.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-purple-100">
                    <th className="text-purple-700 font-semibold text-left py-4 px-6">Employee</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Status</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Date</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Approval</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((att, index) => (
                    <tr key={att._id} className="border-b border-purple-50 hover:bg-purple-25 transition-all duration-300 hover:shadow-sm">
                      <td className="py-6 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">{att.email}</p>
                            <p className="text-sm text-gray-500">Request #{String(index + 1).padStart(3, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <Badge className={`${attendanceStatusColors[att.status]} shadow-sm`}>
                          <span className="font-semibold">{att.status}</span>
                        </Badge>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-gray-900 text-lg">
                            {new Date(att.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full mt-1">
                            {new Date(att.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <div className="flex justify-center">
                          <Select
                            value={att.approvalStatus}
                            onValueChange={(value) => handleStatusChange(att._id, value)}
                            className={`w-36 ${statusColors[att.approvalStatus]} shadow-sm`}
                          />
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-900">{att.createdBy}</span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1">Requester</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Action Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-600">Process requests efficiently with bulk actions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{pendingRequests.length}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{data.filter(att => att.approvalStatus === 'Approved').length}</div>
                <div className="text-xs text-gray-500">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">{data.filter(att => att.approvalStatus === 'Declined').length}</div>
                <div className="text-xs text-gray-500">Declined</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAttendance;