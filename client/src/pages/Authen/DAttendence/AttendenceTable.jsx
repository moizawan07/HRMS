import React, { useEffect } from "react";
import { useState } from "react";
import { Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const statusColors = {
  Present: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Leave: "bg-amber-100 text-amber-800 border-amber-200", 
  Absent: "bg-rose-100 text-rose-800 border-rose-200",
};

const statusIcons = {
  Present: <CheckCircle className="w-3 h-3" />,
  Leave: <AlertCircle className="w-3 h-3" />,
  Absent: <XCircle className="w-3 h-3" />,
};

const Badge = ({ children, className }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center space-x-2 ${className}`}>
    {children}
  </span>
);

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const getStatusCount = (status) => {
    return attendanceData.filter(entry => entry.status === status).length;
  };

  useEffect(() => {
    // Your original fetch logic
    fetch(`${import.meta.env.VITE_SERVER_URL}/attendenceGet`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
      .then(data => setAttendanceData(data.data))
      .catch(err => console.log(err))
  }, []);

  return (
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
                  Attendance Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Track and manage employee attendance records</p>
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
                  <p className="text-purple-100 text-sm">Total Records</p>
                  <p className="text-3xl font-bold">{attendanceData.length}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Present</p>
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
                  <p className="text-amber-100 text-sm">On Leave</p>
                  <p className="text-3xl font-bold">{getStatusCount('Leave')}</p>
                </div>
                <div className=" bg-opacity-20 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-100 text-sm">Absent</p>
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
                <Clock className="w-6 h-6" />
                <span>Attendance Records</span>
              </h2>
              <div className=" bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-white font-medium">{attendanceData.length} Records</span>
              </div>
            </div>
          </div>

          {attendanceData.length <= 0 ? (
            <div className="p-16 text-center">
              <div className="bg-purple-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Records Found</h3>
              <p className="text-gray-500">Attendance records will appear here once data is available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-purple-100">
                    <th className="text-purple-700 font-semibold text-left py-4 px-6">User</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Status</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Date</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Created By</th>
                    <th className="text-purple-700 font-semibold text-center py-4 px-6">Approved By</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((entry, index) => (
                    <tr key={entry._id} className="border-b border-purple-50 hover:bg-purple-25 transition-all duration-300 hover:shadow-sm">
                      <td className="py-6 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-lg">
                              {entry.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">{entry.email}</p>
                            <p className="text-sm text-gray-500">Employee #{String(index + 1).padStart(3, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <Badge className={`${statusColors[entry.status]} shadow-sm`}>
                          {statusIcons[entry.status]}
                          <span className="font-semibold">{entry.status}</span>
                        </Badge>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-gray-900 text-lg">
                            {new Date(entry.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full mt-1">
                            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-gray-900">{entry.createdBy}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1">Creator</span>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-gray-900">{entry.approvedBy}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1">Approver</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 text-purple-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Last updated:</span>
            </div>
            <span className="text-gray-700 font-semibold">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;