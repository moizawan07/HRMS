import DashLayout from "@/components/Dashboard/DashLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DInvite() {
  const form = useForm({
    defaultValues: {
      companyName: "",
      companyLogoFile: null,
      companySize: undefined,
      headquarters: "Pakistan",
      companyField: "Education",
      adminFisrtName: "",
      adminLastName: "",
      adminEmail: "",
      phoneNumber: "",
    },
    mode: "onBlur", // Errors will only show after field loses focus
    reValidateMode: "onBlur", // Re-validate on blur after initial submission
  });

  const {
    watch,
    formState: { errors },
  } = form; // 'trigger' is removed from destructuring here as we won't call it on mount

  // Watch for changes in the first step fields
  const companyName = watch("companyName");
  const companyLogoFile = watch("companyLogoFile");
  const companySize = watch("companySize");
  const headquarters = watch("headquarters");

  const [showSecondStep, setShowSecondStep] = useState(false);

  useEffect(() => {
    // Determine if initial fields are filled based *only* on their watch values, not errors.
    // This allows the conditional section to appear without triggering validation errors on load.
    const isCompanyNameFilled = companyName && companyName.length > 0;
    const isCompanyLogoFilled = companyLogoFile;
    const isCompanySizeSelected =
      companySize !== undefined && companySize !== ""; // Ensure a value is selected
    const isHeadquartersSelected = headquarters && headquarters.length > 0;

    const allFirstStepFilled =
      isCompanyNameFilled &&
      isCompanyLogoFilled &&
      isCompanySizeSelected &&
      isHeadquartersSelected;

    setShowSecondStep(allFirstStepFilled);
  }, [companyName, companyLogoFile, companySize, headquarters]); // Depend only on watch values for this effect

  const companySizes = ["1-20", "21-150", "151-300", "301-900+"];
  const countries = [
    "Pakistan",
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "India",
    "Brazil",
    "Mexico",
    "Japan",
    "China",
    "South Africa",
    "Nigeria",
    "Argentina",
    "New Zealand",
    "Singapore",
    "Sweden",
    "Netherlands",
    "Spain",
  ];
  const companyFields = [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Other"
  ]

  // Handle submit function
  const onSubmit = async (data) => {
   alert('submitted')
   console.log('data==>', data);
   let formData = new FormData()
       formData.append('firstName', data.adminFisrtName)
       formData.append('lastName', data.adminLastName)
       formData.append('email', data.adminEmail)
       formData.append('role', "admin")
       formData.append('phoneNumber', data.phoneNumber)
       formData.append('companyName', data.companyName)
       formData.append('companyLogo', data.companyLogoFile)
       formData.append('companySize', data.companySize)
       formData.append('headquarters', data.headquarters)
       formData.append('companyField', data.companyField)

      //  API CALL
      try {
        let response =  await fetch(`${import.meta.env.VITE_SERVER_URL}/companyCreateInvite`, {
         method : 'POST',
         body: formData
        })
        console.log('response ==>', response);
        let resData = await response.json()
        if(response.status != 200) throw new Error(resData)

          alert(resData.message)
        
      } 
      catch (error) {
        alert(error.message)
      } 


  };



  return (
    <DashLayout>
      <div className="flex-1  w-[70%] mx-auto p-4 md:p-3">
        <Card className="w-full shadow-2xl border-t-8 border-[#e2d3f5]  rounded-xl overflow-hidden">
          <CardHeader className="text-center p-8 bg-white">
            <CardTitle className="text-4xl font-bold">Invite Campany</CardTitle>
          </CardHeader>

          <CardContent className="pt-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                {/* --- First Step Fields (Always Visible) --- */}
                {/* Company Name & Company Logo File - On one row (md and up) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  <FormField
                    control={form.control}
                    name="companyName"
                    rules={{
                      required: "Company Name is required.",
                      minLength: {
                        value: 2,
                        message: "Company Name must be at least 2 characters.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Acme Corporation"
                            {...field}
                            className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyLogoFile"
                    rules={{ required: "Company Logo is required." }}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Company Logo</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            {...fieldProps}
                            onChange={(event) => onChange(event.target.files[0])}
                            className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary"
                          />
                        </FormControl>
                        {/* FormDescription removed as requested */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Company Size - Full width (as requested) */}
                <FormField
                  control={form.control}
                  name="companySize"
                  rules={{ required: "Please select your company size." }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-125 w-full text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size} people
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Headquarters - Full width (for better UX with many options) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <FormField
                  control={form.control}
                  name="headquarters"
                  rules={{
                    required: "Please select your headquarters country.",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headquarters</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 w-full text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* companyField */}
                <FormField
                  control={form.control}
                  name="companyField"
                  rules={{
                    required: "Please select your company Field.",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Field</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 w-full text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary">
                            <SelectValue placeholder="Select Field" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companyFields.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>

                {/* --- Second Step Fields (Conditional Admin Details) --- */}
                {showSecondStep && (
                  <div className="space-y-3 mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-3">
                      Admin Details
                    </h3>

                    {/* Admin Email & Admin Password - On one row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      <FormField
                        control={form.control}
                        name="adminFisrtName"
                        rules={{
                          required: "Admin First Name is required.",
                          minLength: {
                            value: 2,
                            message:
                              "Admin First Name must be at least 2 characters.",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Admin Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="adminLastName"
                        rules={{
                          required: "Admin Last  Name is required.",
                          minLength: {
                            value: 2,
                            message:
                              "Admin Last Name must be at least 2 characters.",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Admin Last Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Doe"
                                {...field}
                                className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Admin Email & Phone Number - On one row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      <FormField
                        control={form.control}
                        name="adminEmail"
                        rules={{
                          required: "Admin Email is required.",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message:
                              "Please enter a valid admin email address.",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Admin Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="admin@acme.com"
                                {...field}
                                className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        rules={{
                          required: "Phone number is required.",
                          pattern: {
                            value: /^\+?[0-9]{7,15}$/,
                            message:
                              "Please enter a valid phone number (e.g., +923xxxxxxxxx).",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+923xxxxxxxxx"
                                {...field}
                                className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Privacy Policy Text */}
                <FormDescription className="text-sm text-gray-500 mt-5 pt-3 border-t border-gray-100">
                  We respect your data. By submitting this form, you agree that
                  we will contact you in relation to our products and services,
                  in accordance with our{" "}
                  <a
                    href="#"
                    className="text-hrms-primary-dark hover:underline font-semibold"
                  >
                    privacy policy
                  </a>
                  .
                </FormDescription>

                <Button
                  type="submit"
                  className="w-full text-lg font-semibold h-14 bg-gray-900 hover:bg-gray-700 text-white transition-all duration-300 mt-5"
                >
                  Register Your HRMS Account
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashLayout>
  );
}

export default DInvite;
