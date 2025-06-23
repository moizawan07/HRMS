import DashLayout from "@/layouts/DashLayout";
import React, { useState, useEffect, useContext } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  User,
  Phone,
  Briefcase,
  Camera,
  CheckCircle,
  PlusCircle,
  ArrowDown,
  UserPlus,
  Users,
  TrendingUp,
  Settings,
  Clock,
  Award,
  DollarSign  
} from "lucide-react"; // Icons
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

function DInvite() {
  let { userConData, setUserConData } = useContext(UserContext); // use Context se role nike ga agr owner hua to ownerInviteCom wrna adminOrHrCom
 

  return userConData.user.role === "owner" ? <OwnerInviteCom /> : <AdminOrHr />;
  // <AdminOrHr />
}

// Owner Invite Form
function OwnerInviteCom() {
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
  } = form;

  // Watch for changes in the first step fields
  const companyName = watch("companyName");
  const companyLogoFile = watch("companyLogoFile");
  const companySize = watch("companySize");
  const headquarters = watch("headquarters");
  let navigate = useNavigate(false)

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
    "Other",
  ];

  // Handle submit function
  const onSubmit = async (data) => {
    console.log("data==>", data);
    let formData = new FormData();
    formData.append("firstName", data.adminFisrtName);
    formData.append("lastName", data.adminLastName);
    formData.append("email", data.adminEmail);
    formData.append("role", "admin");
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("companyName", data.companyName);
    formData.append("companyLogo", data.companyLogoFile);
    formData.append("companySize", data.companySize);
    formData.append("headquarters", data.headquarters);
    formData.append("companyField", data.companyField);

    // API CALL - untouched as per your instruction
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/companyCreateInvite`,
        {
          method: "POST",
          body: formData,
          credentials : 'include'
        }
      );
      console.log("response ==>", response);
      let resData = await response.json();
      if (response.status != 200) throw new Error(resData.message);

      alert(resData.message);
      navigate('/dashboard')
    } catch (error) {
      alert(error);
    }
  };

  return (
    <DashLayout>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-5 pt-3">
        {/* Top Purple Cover Section with Enhanced Gradient */}
        <div className="relative w-full h-[200px] bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 flex justify-end items-end p-6 z-0 rounded-t-2xl shadow-lg">
          {/* Decorative Elements */}
          <div className="absolute top-4 left-6 flex space-x-2">
            <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white/20 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-white/10 rounded-full animate-pulse delay-150"></div>
          </div>
          
          {/* Floating Shapes */}
          <div className="absolute top-8 right-20 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
          <div className="absolute top-16 right-32 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
          
          <Button
            variant="outline"
            className="bg-white/95 text-purple-700 hover:bg-white hover:shadow-lg border-white/50 backdrop-blur-sm transition-all duration-300 font-semibold"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        {/* Main Content Area with Enhanced Styling */}
        <div className="relative -mt-24 mx-auto w-full max-w-6xl p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl z-10 mb-8 border border-purple-100">
          {/* Profile Image with Enhanced Styling */}
          <div className="absolute -top-16 left-8">
            <div className="relative">
              <img
                src="/avatars/default-company-logo.jpg"
                alt="Company Logo"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Company Details and Tabs with Enhanced Styling */}
          <div className="ml-40 mt-8">
            {/* Enhanced Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Company Registration
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                Provide your company details and create an admin account to get started.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-3"></div>
            </div>

            <Tabs defaultValue="company-details" className="w-full mt-8">
              <TabsList className="bg-[#E6E2FC] rounded-xl p-1.5 shadow-inner">
                <TabsTrigger
                  value="company-details"
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-700 text-purple-600 transition-all duration-300 rounded-lg"
                >
                  Company Details
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-700 text-purple-600 transition-all duration-300 rounded-lg"
                >
                  Billing Info
                </TabsTrigger>
                <TabsTrigger
                  value="request"
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-700 text-purple-600 transition-all duration-300 rounded-lg"
                >
                  Requests
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-700 text-purple-600 transition-all duration-300 rounded-lg"
                >
                  Terms & Conditions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="company-details" className="mt-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                  >
                    {/* --- First Step Fields (Always Visible) --- */}
                    {/* Company Name */}
                    <FormField
                      control={form.control}
                      name="companyName"
                      rules={{
                        required: "Company Name is required.",
                        minLength: {
                          value: 2,
                          message:
                            "Company Name must be at least 2 characters.",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-700 text-base">
                            Company Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Acme Corporation"
                              {...field}
                              className="h-12 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Company Logo File */}
                    <FormField
                      control={form.control}
                      name="companyLogoFile"
                      rules={{ required: "Company Logo is required." }}
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-700 text-base">
                            Company Logo
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              {...fieldProps}
                              onChange={(event) =>
                                onChange(event.target.files[0])
                              }
                              className="h-12 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30 file:text-purple-700 file:bg-[#E6E2FC] file:border-0 file:rounded-lg file:py-2 file:px-4 file:mr-4 file:hover:bg-purple-200 file:transition-all file:duration-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Company Size */}
                    <FormField
                      control={form.control}
                      name="companySize"
                      rules={{ required: "Please select your company size." }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-700 text-base">
                            Company Size
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30">
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-purple-200 rounded-xl shadow-lg">
                              {companySizes.map((size) => (
                                <SelectItem key={size} value={size} className="hover:bg-[#E6E2FC] focus:bg-[#E6E2FC] rounded-lg">
                                  {size} people
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Headquarters */}
                    <FormField
                      control={form.control}
                      name="headquarters"
                      rules={{
                        required: "Please select your headquarters country.",
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-700 text-base">
                            Headquarters
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-purple-200 rounded-xl shadow-lg">
                              {countries.map((country) => (
                                <SelectItem key={country} value={country} className="hover:bg-[#E6E2FC] focus:bg-[#E6E2FC] rounded-lg">
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Company Field */}
                    <FormField
                      control={form.control}
                      name="companyField"
                      rules={{
                        required: "Please select your company Field.",
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-700 text-base">
                            Company Field
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30">
                                <SelectValue placeholder="Select Field" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-purple-200 rounded-xl shadow-lg">
                              {companyFields.map((field) => (
                                <SelectItem key={field} value={field} className="hover:bg-[#E6E2FC] focus:bg-[#E6E2FC] rounded-lg">
                                  {field}
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
                      <div className="col-span-1 md:col-span-2 space-y-6 mt-8 p-8 bg-gradient-to-br from-[#E6E2FC] to-purple-100 rounded-2xl border-2 border-purple-200 shadow-inner animate-fade-in">
                        <div className="flex items-center space-x-3 border-b border-purple-300 pb-4 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">2</span>
                          </div>
                          <h3 className="text-2xl font-bold text-purple-800">
                            Admin Details
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          {/* Admin First Name */}
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
                                <FormLabel className="font-semibold text-purple-800 text-base">
                                  Admin First Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="John"
                                    {...field}
                                    className="h-12 border-2 border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 rounded-xl transition-all duration-300 bg-white/80"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* Admin Last Name */}
                          <FormField
                            control={form.control}
                            name="adminLastName"
                            rules={{
                              required: "Admin Last Name is required.",
                              minLength: {
                                value: 2,
                                message:
                                  "Admin Last Name must be at least 2 characters.",
                              },
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold text-purple-800 text-base">
                                  Admin Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Doe"
                                    {...field}
                                    className="h-12 border-2 border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 rounded-xl transition-all duration-300 bg-white/80"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Admin Email */}
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
                                <FormLabel className="font-semibold text-purple-800 text-base">
                                  Admin Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="admin@acme.com"
                                    {...field}
                                    className="h-12 border-2 border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 rounded-xl transition-all duration-300 bg-white/80"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* Phone Number */}
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
                                <FormLabel className="font-semibold text-purple-800 text-base">
                                  Phone Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+923xxxxxxxxx"
                                    {...field}
                                    className="h-12 border-2 border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 rounded-xl transition-all duration-300 bg-white/80"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Privacy Policy Text with Enhanced Styling */}
                    <div className="col-span-1 md:col-span-2">
                      <FormDescription className="text-base text-gray-600 mt-8 pt-6 border-t-2 border-purple-200 bg-gradient-to-r from-purple-50/50 to-transparent p-4 rounded-xl">
                        🔒 We respect your data privacy. By submitting this form, you agree
                        that we will contact you in relation to our products and
                        services, in accordance with our{" "}
                        <a
                          href="#"
                          className="text-purple-700 hover:text-purple-800 hover:underline font-semibold transition-colors duration-300"
                        >
                          privacy policy
                        </a>
                        .
                      </FormDescription>
                    </div>

                    {/* Submit Button with Enhanced Styling */}
                    <div className="col-span-1 md:col-span-2 flex justify-start">
                      <Button
                        type="submit"
                        className="w-full text-lg font-bold h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 mt-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        🚀 Register Your HRMS Account
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              {/* Enhanced Placeholder content for other tabs */}
              <TabsContent value="billing">
                <div className="p-8 bg-gradient-to-br from-[#E6E2FC] to-purple-100 rounded-2xl border-2 border-purple-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">💳</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Billing Information</h3>
                    <p className="text-purple-600">Billing information setup will go here.</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="request">
                <div className="p-8 bg-gradient-to-br from-[#E6E2FC] to-purple-100 rounded-2xl border-2 border-purple-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">📨</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Company Invites</h3>
                    <p className="text-purple-600">10+ Company Register Invites Request</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="terms">
                <div className="p-8 bg-gradient-to-br from-[#E6E2FC] to-purple-100 rounded-2xl border-2 border-purple-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">📋</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Terms & Conditions</h3>
                    <p className="text-purple-600">Terms and Conditions content will be displayed here.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}

// Admin Or Hr
function AdminOrHr() {
  // State to simulate the current logged-in user's role (admin or hr)
  let { userConData, setUserConData } = useContext(UserContext);
  const [currentUserRole, setCurrentUserRole] = useState(userConData.user.role); // Default to 'admin' userConData.user.role

  const [inviteSentSuccess, setInviteSentSuccess] = useState(false); // State for success message
  let navigate = useNavigate(false)

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "", // Default empty
      phoneNumber: "",
      salary: "",
    },
    mode: "onBlur",
  });

  // Handle form submission
  async function onSubmit(values) {
    console.log("Invite User form submitted:", values);
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/HrOrEmployeeInvite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );
      let resData = await response.json();
      if (response.status != 200) throw new Error(resData.message);
      navigate('/dashboard')
      alert(resData.message);
    } catch (error) {
      alert(error);
    }
  }

  // Define available roles based on currentUserRole
  const availableRoles =
    currentUserRole === "admin"
      ? [
          { value: "employee", label: "Employee" },
          { value: "hr", label: "HR" },
        ]
      : [{ value: "employee", label: "Employee" }]; // If HR, only 'Employee' is an option

  return (
    <DashLayout>
      <div className="flex flex-col px-10 py-5 min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* Top Purple Gradient Cover Section */}
        <div className="relative w-full h-[200px] bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-xl flex justify-end items-end p-6 z-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 rounded-xl"></div>
          <div className="absolute top-4 left-6 text-white">
            <h1 className="text-2xl font-bold">Team Management</h1>
            <p className="text-purple-100">Invite and manage your team members</p>
          </div>
          <Button
            variant="outline"
            className="relative z-10 bg-white/90 backdrop-blur-sm text-purple-700 hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg border-purple-200"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        {/* Main Content Area with Enhanced Styling */}
        <div className="relative -mt-24 mx-auto w-full max-w-6xl p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl z-10 mb-8 border border-purple-100">
          {/* Enhanced Profile Section */}
          <div className="absolute -top-16 left-8">
            <div className="relative">
              <img
                src="https://img.freepik.com/free-vector/flat-customer-service-week-illustration_23-2149644201.jpg?ga=GA1.1.244699205.1742808432&semt=ais_hybrid&w=740"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-2xl ring-4 ring-purple-200"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full p-2 shadow-lg">
                <UserPlus className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="ml-40 mt-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Your {currentUserRole} Portal
              </h2>
              <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full">
                <span className="text-sm font-medium text-purple-700 capitalize">{currentUserRole}</span>
              </div>
            </div>
            <p className="text-purple-600 mb-6">Manage team invitations and user access</p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600">Total Users</p>
                    <p className="text-xl font-bold text-purple-800">247</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-4 rounded-xl border border-indigo-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600">Pending Invites</p>
                    <p className="text-xl font-bold text-indigo-800">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">This Month</p>
                    <p className="text-xl font-bold text-blue-800">+18</p>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="invite" className="w-full">
              <TabsList className="bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 rounded-xl p-1 shadow-inner border border-purple-200">
                <TabsTrigger
                  value="invite"
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 rounded-lg transition-all duration-200 hover:bg-white/50"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite New User
                </TabsTrigger>
                <TabsTrigger
                  value="manage"
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 rounded-lg transition-all duration-200 hover:bg-white/50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Invitations
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="px-6 py-3 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-200 rounded-lg transition-all duration-200 hover:bg-white/50"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Invitation History
                </TabsTrigger>
                <Button
                  variant="ghost"
                  className="ml-6 text-xs text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg px-3 py-2 transition-all"
                  title="Click to toggle current user role for testing"
                >
                  (Current Role: {currentUserRole})
                </Button>
              </TabsList>

              {/* Enhanced Invite Form */}
              <TabsContent value="invite" className="mt-8">
                {!inviteSentSuccess ? (
                  <div className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-2xl border border-purple-100 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                        <UserPlus className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-purple-800">Invite New Team Member</h3>
                    </div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                      >
                        {/* Enhanced Form Fields */}
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-purple-800 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John"
                                  {...field}
                                  className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 bg-white/70 backdrop-blur-sm rounded-xl transition-all hover:bg-white/90"
                                  {...form.register("firstName", {
                                    required: "First name is required.",
                                  })}
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.firstName?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-purple-800 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Doe"
                                  {...field}
                                  className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 bg-white/70 backdrop-blur-sm rounded-xl transition-all hover:bg-white/90"
                                  {...form.register("lastName", {
                                    required: "Last name is required.",
                                  })}
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.lastName?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-purple-800 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="user@example.com"
                                  {...field}
                                  className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 bg-white/70 backdrop-blur-sm rounded-xl transition-all hover:bg-white/90"
                                  type="email"
                                  {...form.register("email", {
                                    required: "Email is required.",
                                    pattern: {
                                      value:
                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Invalid email address.",
                                    },
                                  })}
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.email?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="role"
                          rules={{ required: "Please select a role." }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-purple-800 flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Role
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 border-purple-200 focus:border-purple-400 bg-white/70 backdrop-blur-sm rounded-xl transition-all hover:bg-white/90">
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white/95 backdrop-blur-lg border-purple-200 rounded-xl shadow-2xl">
                                  {availableRoles.map((role) => (
                                    <SelectItem
                                      key={role.value}
                                      value={role.value}
                                      className="hover:bg-purple-50 rounded-lg mx-1 my-1"
                                    >
                                      {role.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage>
                                {form.formState.errors.role?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-purple-800 flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 234 567 8900"
                                  {...field}
                                  className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400 bg-white/70 backdrop-blur-sm rounded-xl transition-all hover:bg-white/90"
                                  type="tel"
                                  {...form.register("phoneNumber", {
                                    required: "Phone number is required.",
                                    minLength: {
                                      value: 10,
                                      message:
                                        "Phone number must be at least 10 digits.",
                                    },
                                    pattern: {
                                      value: /^[+0-9\s-()]*$/,
                                      message: "Invalid phone number format.",
                                    },
                                  })}
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.phoneNumber?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="salary"
                          rules={{ required: "Please select a salary range." }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-purple-800 flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                Salary Range
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 border-purple-200 focus:border-purple-400 bg-white/70 backdrop-blur-sm rounded-xl transition-all hover:bg-white/90">
                                    <SelectValue placeholder="Select salary range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white/95 backdrop-blur-lg border-purple-200 rounded-xl shadow-2xl">
                                  <SelectItem value="20000-30000" className="hover:bg-purple-50 rounded-lg mx-1 my-1">
                                    20k - 30k
                                  </SelectItem>
                                  <SelectItem value="31000-50000" className="hover:bg-purple-50 rounded-lg mx-1 my-1">
                                    31k - 50k
                                  </SelectItem>
                                  <SelectItem value="51000-100000" className="hover:bg-purple-50 rounded-lg mx-1 my-1">
                                    51k - 100k
                                  </SelectItem>
                                  <SelectItem value="101000-200000" className="hover:bg-purple-50 rounded-lg mx-1 my-1">
                                    101k - 200k
                                  </SelectItem>
                                  <SelectItem value="201000-500000" className="hover:bg-purple-50 rounded-lg mx-1 my-1">
                                    201k - 500k
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage>
                                {form.formState.errors.salary?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />

                        {/* Enhanced Submit Button */}
                        <div className="col-span-1 md:col-span-2 flex justify-start mt-6">
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                          >
                            <UserPlus className="h-5 w-5 mr-2" />
                            Send Invitation
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full pt-12 text-center bg-gradient-to-br from-white to-purple-50/30 p-12 rounded-2xl border border-purple-100 shadow-lg">
                    <div className="relative mb-8">
                      <CheckCircle className="h-24 w-24 text-green-500 animate-bounce" />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full p-2 animate-pulse">
                        <Mail className="h-4 w-4" />
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                      Invitation Sent Successfully! 🎉
                    </h2>
                    <p className="text-lg text-purple-600 mb-8 max-w-md">
                      The user has been successfully invited to join your team. They will receive an email with setup instructions.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setInviteSentSuccess(false)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite Another User
                      </Button>
                      <Button
                        onClick={() => console.log("Go to user list")}
                        variant="outline"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        View Team
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Enhanced Placeholder Content */}
              <TabsContent value="manage">
                <div className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-2xl border border-purple-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-800">Manage Invitations</h3>
                  </div>
                  <p className="text-purple-600">Content for managing invitations will go here. Track pending invites, resend emails, and manage user permissions.</p>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-2xl border border-purple-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-800">Invitation History</h3>
                  </div>
                  <p className="text-purple-600">Invitation history and analytics will be displayed here. View past invitations, success rates, and team growth metrics.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}

export default DInvite;
