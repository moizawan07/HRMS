import React from "react";
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
  Absent: "bg-yellow-200 text-yellow-900",
  Leave: "bg-red-100 text-red-700",
};


const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      userId: "1",
      name: "Ahmed Ali",
      status: "Present",
      date: "2025-06-15",
      createdBy: "Admin",
      approvalStatus: "Approved",
      approvedBy: "HR",
    },
    {
      userId: "2",
      name: "Sara Khan",
      status: "Absent",
      date: "2025-06-15",
      createdBy: "HR",
      approvalStatus: "Pending",
      approvedBy: "-",
    },
    {
      userId: "3",
      name: "Usman Tariq",
      status: "Leave",
      date: "2025-06-15",
      createdBy: "HR",
      approvalStatus: "Approved",
      approvedBy: "Admin",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-200 text-green-60 0 font-semibold";
      case "Absent":
        return " bg-yellow-200 text-yellow-600 font-semibold";
      case "Leave":
        return "bg-red-200 text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Approval Status</TableHead>
            <TableHead>Approved By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((entry) => (
            <TableRow key={entry.userId}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>
                <Badge  className={statusColors[entry.status]}>
                {entry.status}
                </Badge>
              </TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.createdBy}</TableCell>
              <TableCell>{entry.approvalStatus}</TableCell>
              <TableCell>{entry.approvedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
