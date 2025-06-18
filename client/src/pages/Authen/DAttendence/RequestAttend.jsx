// src/pages/Dashboard/RequestAttendance.jsx

import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  Approved: "text-green-700",
  Pending: "text-yellow-700",
  Declined: "text-red-700",
};

const RequestAttendance = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      date: "2025-06-15",
      status: "Present",
      approvalStatus: "Pending",
    },
    {
      id: 2,
      name: "Sara Ali",
      date: "2025-06-14",
      status: "Absent",
      approvalStatus: "Approved",
    },
    {
      id: 3,
      name: "Zainab Mirza",
      date: "2025-06-13",
      status: "Leave",
      approvalStatus: "Declined",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, approvalStatus: newStatus } : item
    );
    setData(updatedData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approval</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((att) => (
            <TableRow key={att.id}>
              <TableCell>{att.name}</TableCell>
              <TableCell>{att.date}</TableCell>
              <TableCell>
                <Badge
                  className={
                    att.status === "Present"
                      ? "bg-green-200 text-green-800"
                      : att.status === "Leave"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {att.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={att.approvalStatus}
                  onValueChange={(value) => handleStatusChange(att.id, value)}
                >
                  <SelectTrigger className={`w-[120px] bg-gray-50 ${statusColors[att.approvalStatus]}`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestAttendance;
