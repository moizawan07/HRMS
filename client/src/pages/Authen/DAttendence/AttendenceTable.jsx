import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


const statusColors = {
  Present: "bg-green-200 text-green-900",
  Leave: "bg-yellow-200 text-yellow-900",
  Absent: "bg-red-100 text-red-700",
};


const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() =>{
      fetch(`${import.meta.env.VITE_SERVER_URL}/attendenceGet`, {
        method : 'GET',
        credentials : 'include'
      }).then(res => res.json())
      .then(data => setAttendanceData(data.data))
      .catch(err => console.log(err))
  
    }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Records {attendanceData.length <= 0 && "Is Empty"}</h2>
      {attendanceData.length > 0 && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Approved By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry.email}</TableCell>
              <TableCell>
                <Badge  className={statusColors[entry.status]}>
                {entry.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              <TableCell>{entry.createdBy}</TableCell>
              <TableCell>{entry.approvedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       )}
    </div>
  );
};

export default AttendanceTable;
