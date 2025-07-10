import React, { useEffect, useState } from "react";
import { LeaveCard } from "./LeaveCard";


 // Mock data
  const dummyData = [
    { id: 1, type: 'Annual Leave', from: '2024-07-15', to: '2024-07-17', status: 'Approved', days: 3 },
    { id: 2, type: 'Sick Leave', from: '2024-07-10', to: '2024-07-11', status: 'Pending', days: 2 },
    { id: 3, type: 'Personal Leave', from: '2024-07-05', to: '2024-07-05', status: 'Rejected', days: 1 },
    { id: 4, type: 'Emergency Leave', from: '2024-06-28', to: '2024-06-30', status: 'Approved', days: 3 }
  ];

function UserLeaves() {
   const [userLeaves, setUserLeaves] = useState([])

 useEffect(() => {
   fetch(`${import.meta.env.VITE_SERVER_URL}/getUserLeave`, {
      method : 'GET',
      credentials : 'include'
   })
   .then(res => res.json())
   .then(data => setUserLeaves(data.data))
   .catch(error => alert(error.message));

 }, [])

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full mr-4"></div>
        <h3 className="text-xl font-semibold text-purple-700">
          Your Leave Applications: ({userLeaves.length})
        </h3>
      </div>
      {userLeaves.length > 0 && (
      <div className="space-y-4">
        {userLeaves.map((leave) => (
          <LeaveCard key={leave.id} leave={leave} />
        ))}
      </div>
      )}
    </div>
  );
}

export default UserLeaves;
