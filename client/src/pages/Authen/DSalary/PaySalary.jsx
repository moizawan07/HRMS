import { useContext, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit } from "lucide-react";
import { SalaryPayModal } from "./common";
import { UserContext } from "@/context/userContext";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Common utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const calculateFinalSalary = (user) => {
  const baseSalary = user.baseSalary || 0;
  const allowances = user.allowances || 0;
  const deductions = user.deductions || 0;
  const bonuses = user.bonuses || 0;
  return baseSalary + allowances - deductions + bonuses;
};

const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function PaySalary({ searchTerm }) {
  const [users, setUsers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [salaryModal, setSalaryModal] = useState(false);
  const [selectedUser, setSelectUser] = useState(false);
  let currentMonth = monthsName[new Date().getMonth()];
  const [salaryDate, setSalaryDate] = useState(currentMonth);
  let { userConData } = useContext(UserContext);

  console.log("salaries ==>", salaries);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // get Users
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/fetchAllUsers`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch((err) => alert(err.message));
  }, []);

  // get Salaries
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/getSalaries/${
        userConData.company._id
      }`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setSalaries(data.data))
      .catch((err) => alert(err.message));
  }, []);

  const checkSalaryPaid = (userId, month) => {
    const check = salaries.find((salaryUser) => {
      let idMatch = salaryUser.userId === userId;
      let monthMatch =
        monthsName[new Date(salaryUser.salaryDate).getMonth()] === month;

      console.log("MonthMatch ==>", monthMatch);

      if (idMatch && monthMatch) {
        return true;
      }
      return false;
    });

    console.log("check ==>", check);

    if (check) {
      return "Paid";
    }
    return "UnPaid";
  };

  // Handle Add To Pay
  const handleToPay = (user) => {
    setSalaryModal(true);
    setSelectUser(user);
  };

  console.log("salaryDate ==>", salaryDate);

  return (
    <div>
      {/* Salary Table using shadcn Table */}
      {salaryModal && (
        <SalaryPayModal user={selectedUser} SetModalOn={setSalaryModal} />
      )}

      <div className="flex justify-end mb-4 mr-">
        <Select value={salaryDate} onValueChange={(e) => setSalaryDate(e)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {monthsName.map((month) => (
              <SelectItem value={month}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-purple-100 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600">
              <TableHead className="text-white font-semibold">
                Employee
              </TableHead>
              <TableHead className="text-white font-semibold">Role</TableHead>
              <TableHead className="text-white font-semibold text-right">
                Base Salary
              </TableHead>
              <TableHead className="text-white font-semibold text-right">
                Address
              </TableHead>
              <TableHead className="text-white font-semibold text-right">
                Invited By
              </TableHead>
              <TableHead className="text-white font-semibold text-right">
                Gender
              </TableHead>
              <TableHead className="text-white font-semibold text-center">
                Status
              </TableHead>
              <TableHead className="text-white font-semibold text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow
                key={user._id}
                className={`hover:bg-purple-50 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.firstName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                   bg-purple-100 text-purple-800"
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right font-medium text-gray-900">
                  {formatCurrency(parseInt(user.salary))}
                </TableCell>
                <TableCell className="px-6 py-4 text-right font-medium text-gray-900">
                  {user.address}
                </TableCell>
                <TableCell className="px-6 py-4 text-right font-medium text-purple-500">
                  {user.invitedBy}
                </TableCell>
                <TableCell className="px-6 py-4 text-right font-medium text-gray-900">
                  {user.gender}
                </TableCell>

                <TableCell className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      checkSalaryPaid(user._id, salaryDate) === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {checkSalaryPaid(user._id, salaryDate)}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      onClick={() => handleToPay(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default PaySalary;
