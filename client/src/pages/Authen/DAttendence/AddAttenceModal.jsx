import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";


function AddAttendanceModal({ role, email = ''}) {
    let [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const currentDate = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
   try {
     let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/attendenceAdd`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'Application/json'
        },
        body : JSON.stringify(data),
        credentials : 'include'
     })
     let resData = await res.json()
     
     if(role != 'employee') {
      setValue('email', '')
     }
      setValue('status', '')
     if(res.status !== 200) throw new Error(resData.message);    

   } 
   catch (error) {
    alert(error)
  }
   finally{
    setOpen(false)
   }
   }
   
    

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Add Attendance</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Attendance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* {(role === "admin" || role === "hr") && ( */}
            <div>
              <Label className="mb-2">Email of Employee {role != 'employee' && '/ Hr'}</Label>
              <Input
                type="email"
                placeholder={`Enter employee ${role != 'employee' ? '/ Hr Email' : 'Email'}`}
                defaultValue={email}
                disabled={role === 'employee'}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          {/* )} */}

          <div>
            <Label>Status</Label>
            <Select onValueChange={(value) => setValue("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Leave">Leave</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <div>
            <Label>Date</Label>
            <Input type="date" value={currentDate} readOnly {...register("date")} />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Submit Attendance
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAttendanceModal