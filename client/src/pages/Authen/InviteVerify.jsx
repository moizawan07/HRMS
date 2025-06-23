import AuthLayout from "@/layouts/AuthLayout";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { data, useNavigate, useParams } from "react-router-dom";


function InviteVerify() {
  const {id} = useParams()
 let navigate = useNavigate(false)
  
  const [inviteData, setInviteData] = useState({
    // companyName: "", companyLogo: "", firstName: "", lastName:"", email: "",
    password: "", confirmPassword: "", dateOfBirth: "", address: "", gender : '',
  });
  const [loading, setLoading] = useState(true);
  const [inviteExpired, setInviteExpire] = useState(false);

  const {
    register, handleSubmit, watch, formState: { errors }
  } = useForm({
    defaultValues: inviteData // important to update initial fields
  });

  useEffect(() => {
     async function getUser  () {
         try {
          let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/invite/verify/${id}`)
          let resData = await res.json()

             if(res.status != 200) throw new Error(resData);

             setLoading(false)
            setInviteData({...inviteData, ...resData});
             
         } catch (error) {
             setLoading(false)
             setInviteExpire(error.message)
         }
      }
      getUser()
  }, []);

  // Invite Accept 
  const onSubmit = async (data) => {
    console.log("invitedata", inviteData);
    const finalData = {...inviteData, ...data };
    console.log("Final Submit", finalData);
   try {
     let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/invite/accept`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'Application/json'
      },
      body : JSON.stringify(finalData),
      credentials : 'include'
     })
    let resData = await res.json()

    if(res.status !== 200) throw new Error(resData.message);
    alert('Congrats You add Sucessfully Now Login whenever you want')
    navigate('/login')
    
   } catch (error) {
    alert(error)
   }
  };

  return (
    <AuthLayout>
      {/* Right side */}
      {!loading ? inviteExpired ? <div>Token has Expire</div> : (
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen">
          <Card className="w-full h-full py-0">
            <CardContent className="space-y-2">
              <div className="flex py-5 gap-10 items-center">
                <img
                  src={inviteData.companyLogo}
                  alt="Company Logo"
                  className="h-16  mb-2 rounded-full"
                />
                <div>

                <h2 className="text-xl font-semibold">
                 <span className="text-[18px] font-bold text-blue-500">Company:</span> 
                 <span className="uppercase"> {inviteData.companyName} </span>
                </h2>
                <p className="text-xs mt-3 text-gray-600">Your Role In The Company <span className="uppercase font-semibold text-blue-500">{inviteData.role}</span> </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input className="capitalize" value={inviteData.firstName + " " + inviteData.lastName} disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={inviteData.email} disabled />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    {...register("dateOfBirth", {
                      required: "Date of Birth is required",
                    })}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Gender</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    {...register("gender", { required: "Gender is required" })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Address</Label>
                  <Input
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        ) : <div>Loading...</div>}
     
    </AuthLayout>
  );
}

export default InviteVerify;
