import { useEffect, useState } from "react";
import { LeaveCard } from "./LeaveCard";

const dummyData = [
  {
    id: 1,
    employee: "John Doe",
    type: "Annual Leave",
    from: "2024-07-20",
    to: "2024-07-22",
    status: "Pending",
    days: 3,
  },
  {
    id: 2,
    employee: "Jane Smith",
    type: "Sick Leave",
    from: "2024-07-18",
    to: "2024-07-19",
    status: "Approved",
    days: 2,
  },
  {
    id: 3,
    employee: "Mike Johnson",
    type: "Personal Leave",
    from: "2024-07-25",
    to: "2024-07-26",
    status: "Pending",
    days: 2,
  },
];

function LeaveRequest() {
  const [leaveRequests, setLeaveRequests] = useState(dummyData);

  //  useEffect(() => {
  //     fetch(`${import.meta.env.VITE_SERVER_URL}/leavesRequest`, {
  //        method : 'GET',
  //        credentials : 'include'
  //     })
  //     .then(res => res.json())
  //     .then(data => setLeaveRequests(data.data))
  //     .catch(error => alert(error.message));

  //   }, [])

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full mr-4"></div>
        <h3 className="text-xl font-semibold text-purple-700">
          Leave Requests : ({leaveRequests.length})
        </h3>
      </div>
      {leaveRequests.length > 0 && (
        <div className="space-y-4">
          {leaveRequests.map((leave) => (
            <LeaveCard key={leave.id} leave={leave} showEmployee={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaveRequest;
