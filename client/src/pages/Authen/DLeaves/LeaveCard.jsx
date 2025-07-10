import { Card, CardContent,  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, CheckCircle, Clock, User, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from "react";


export const LeaveCard = ({ leave, showEmployee = false }) => {
  const [leaves, setLeaves] = useState(leave)
  const handleStatusChanged = (id, statusValue) => {
     setLeaves({...leaves, status: statusValue})
     
  }

 const statusColors = (statusName) => {
    switch(statusName){
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'Approved':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-red-200 text-red-800';
    }
 }

  return (
    <Card className="mb-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-400 bg-gradient-to-r from-white to-purple-50">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-purple-700 mb-1">
              {leaves.LeaveType}
            </h4>
            {showEmployee && (
              <div className="text-sm text-gray-600 ">
               <h1 className="flex items-center text-[15px] capitalize"> <User className="w-4 h-4 mr-1" /> {leave.name} </h1> 
               <p className="text-[10px] text-purple-800 ml-5"> {leave.email} </p> 
              </div>
            )}
          </div>
        
        <div>
           <Select
             value={leaves.status}
             onValueChange={(value) => handleStatusChanged(leaves._id, value)}
             >
             <SelectTrigger className={`${statusColors(leaves.status)}`}>
               <SelectValue placeholder="Select leave type" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="Pending">Pending</SelectItem>
               <SelectItem value="Approved"> Approved</SelectItem>
               <SelectItem value="Declined">Declined</SelectItem>
             </SelectContent>
           </Select>
        </div>
         
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            <span>
              <strong>From:</strong> {new Date(leaves.fromDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            <span>
              <strong>To:</strong> {new Date(leaves.toDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-purple-500" />
            <span>
              <strong>Duration:</strong> {leaves.days} day
              {leaves.days !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export const StatusBadge = ({status}) => {
  switch (status) {
    case 'Approved':
      return (
        <Badge  className="bg-green-100 text-green-700 hover:bg-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    case 'Pending':
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    case 'Rejected':
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
    }
}