// src/pages/Dashboard/RequestAttendance.jsx

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  Approved: "text-green-700",
  Pending: "text-yellow-700",
  Declined: "text-red-700",
};

const RequestAttendance = () => {
  const [data, setData] = useState([]);

  const handleStatusChange = async(id, newStatus) => {
    const updatedData = data.map((item) =>
      item._id === id ? { ...item, approvalStatus: newStatus } : item
    );
    setData(updatedData);
    try {
     let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/attendenceAppproval`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'Application/json'
        },
        body : JSON.stringify({attendenceId : id,approvalMsg : newStatus}),
        credentials : 'include'
     })
     let resData = await res.json()
   } 
   catch (error) {
    alert(error.message)
  }
  };

  useEffect(() =>{
    fetch(`${import.meta.env.VITE_SERVER_URL}/attendenceRequestGet`, {
      method : 'GET',
      credentials : 'include'
    }).then(res => res.json())
    .then(data => setData(data.data))
    .catch(err => console.log(err))


  }, [])

  
  return (
    <div className="p-4">
      {data.length > 0 ? (
        <>
      <h2 className="text-xl font-bold mb-4">Attendance Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((att) => (
             att.approvalStatus === 'Pending' &&(
            <TableRow key={att._id}>
              <TableCell>{att.email}</TableCell>
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
              <TableCell>{new Date(att.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Select
                  value={att.approvalStatus}
                  onValueChange={(value) => handleStatusChange(att._id, value)}
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
               <TableCell>{att.createdBy}</TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
       </>): <h1> No Attendence Request</h1>}
    </div>
  );
};

export default RequestAttendance;
