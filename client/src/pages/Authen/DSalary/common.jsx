import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";


export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
};

export const calculateFinalSalary = (salary) => {
    return salary.baseSalary + salary.allowances - salary.deductions + salary.bonuses;
};

export const SalaryPayModal = ({user, SetModalOn}) => {
 let {name, email, salary, _id, campanyId} = user;
 const [payUser, setPayUser] = useState({
  userId : _id,
  companyId : campanyId,
  date : '',
  baseSalary : parseInt(salary),
 })

 
 

 
//  handle submit 
const handleSubmit = async (e) => {
  e.preventDefault()
  SetModalOn(false)

  try {
    let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/salaryPay`, {
      method : 'POST',
      headers : {
        "Content-Type" : 'application/json'
      },
      body: JSON.stringify(payUser),
      credentials : 'include'
    })
    let resData = await res.json()

    if(res.status !== 201) throw new Error(resData.message);

    alert(resData.message)
    
  } catch (error) {
    alert(error)
  }
  

}

  return(
     <Dialog open={true} onOpenChange={() => SetModalOn(false)}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Pay Salary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay Salary</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div>
              <Label className="mb-2">Email of Employee</Label>
              <Input
                type="email"
                placeholder={`user Email`}
                value={email}
                readOnly
              />
            </div>
          {/* )} */}

          <div>
            <Label>Base Salary</Label>
            <Input
                type="text"
                placeholder={`User Base Salary`}
                value={parseInt(salary)}
                readOnly
              />
           
          </div>

          <div>
            <Label>Date &  Month</Label>
            <Input type="date" 
            value={payUser.date}
            onChange={(e) => setPayUser({...payUser, date: e.target.value })}  
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
           Pay Salary
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}