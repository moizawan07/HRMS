import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
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


export default function HeroSectionRight() {
  const form = useForm({
    defaultValues: {
      companyName: "",
      companyLogoFile: null,
      companySize: undefined,
      headquarters: "Pakistan",
      adminEmail: "",
      adminPassword: "",
      adminName: "",
      phoneNumber: "+92",
    },
    mode: "onBlur", // Errors will only show after field loses focus
    reValidateMode: "onBlur", // Re-validate on blur after initial submission
  });

  const { watch, formState: { errors } } = form; // 'trigger' is removed from destructuring here as we won't call it on mount

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
    const isCompanyLogoFilled = companyLogoFile && companyLogoFile.length > 0;
    const isCompanySizeSelected = companySize !== undefined && companySize !== ""; // Ensure a value is selected
    const isHeadquartersSelected = headquarters && headquarters.length > 0;

    const allFirstStepFilled = isCompanyNameFilled && isCompanyLogoFilled && isCompanySizeSelected && isHeadquartersSelected;
    
    setShowSecondStep(allFirstStepFilled);
  }, [companyName, companyLogoFile, companySize, headquarters]); // Depend only on watch values for this effect


  const onSubmit = (data) => {
    console.log("Full form data submitted:", data);
    if (data.companyLogoFile && data.companyLogoFile[0]) {
      console.log("Company Logo File:", data.companyLogoFile[0].name, data.companyLogoFile[0].size);
    }
    alert("HRMS Account registration successful! Check console for data.");
  };

  const companySizes = ["1-20", "21-150", "151-300", "301-900+"];
  const countries = [
    "Pakistan", "United States", "Canada", "United Kingdom", "Germany",
    "France", "Australia", "India", "Brazil", "Mexico",
    "Japan", "China", "South Africa", "Nigeria", "Argentina",
    "New Zealand", "Singapore", "Sweden", "Netherlands", "Spain"
  ];

  return (
    <div className="flex-1 max-w-[600px] w-full p-4 md:p-8">
      <Card className="w-full shadow-2xl border-t-8 border-b-0 border-r-0 border-l-0   border-[#535a67]  rounded-xl overflow-hidden">
        <CardHeader className="text-center p-8 bg-white">
          <CardTitle className="text-4xl font-bold text-gray-900">Get Started</CardTitle>
        </CardHeader>

        <CardContent className="pt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* --- First Step Fields (Always Visible) --- */}
              {/* Company Name & Company Logo File - On one row (md and up) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <FormField
                  control={form.control}
                  name="companyName"
                  rules={{ required: "Company Name is required.", minLength: { value: 2, message: "Company Name must be at least 2 characters." } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corporation" {...field} className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary" />
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
                          onChange={(event) => onChange(event.target.files)}
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-125 w-full text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary">
                          <SelectValue placeholder="Select company size"  />
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
              <FormField
                control={form.control}
                name="headquarters"
                rules={{ required: "Please select your headquarters country." }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headquarters</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary">
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

              {/* --- Second Step Fields (Conditional Admin Details) --- */}
              {showSecondStep && (
                <div className="space-y-3 mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-3">Admin Details</h3>

                  {/* Admin Email & Admin Password - On one row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    <FormField
                      control={form.control}
                      name="adminEmail"
                      rules={{ required: "Admin Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid admin email address." } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Email</FormLabel>
                          <FormControl>
                            <Input placeholder="admin@acme.com" {...field} className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminPassword"
                      rules={{ required: "Admin Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters." } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Admin Name & Phone Number - On one row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    <FormField
                      control={form.control}
                      name="adminName"
                      rules={{ required: "Admin Name is required.", minLength: { value: 2, message: "Admin Name must be at least 2 characters." } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      rules={{ required: "Phone number is required.", pattern: { value: /^\+?[0-9]{7,15}$/, message: "Please enter a valid phone number (e.g., +923xxxxxxxxx)." } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+923xxxxxxxxx" {...field} className="h-12 text-base border-gray-300 focus:border-hrms-primary focus:ring-hrms-primary" />
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
                We respect your data. By submitting this form, you agree that we will contact you
                in relation to our products and services, in accordance with our{" "}
                <a href="#" className="text-hrms-primary-dark hover:underline font-semibold">
                  privacy policy
                </a>.
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
  );
}