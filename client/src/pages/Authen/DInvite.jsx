import DashLayout from "@/components/Dashboard/DashLayout";
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
} from "lucide-react"; // Icons
import { UserContext } from "@/context/userContext";

function DInvite() {
  let { userConData, setUserConData } = useContext(UserContext); // use Context se role nike ga agr owner hua to ownerInviteCom wrna adminOrHrCom
  console.log("moiz", userConData);

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
    "Other",
  ];

  // Handle submit function
  const onSubmit = async (data) => {
    alert("submitted");
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

    //  API CALL
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/companyCreateInvite`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("response ==>", response);
      let resData = await response.json();
      if (response.status != 200) throw new Error(resData);

      alert(resData.message);
    } catch (error) {
      alert(error.message);
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
                            onChange={(event) =>
                              onChange(event.target.files[0])
                            }
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

function AdminOrHr() {
  // State to simulate the current logged-in user's role (admin or hr)
  let { userConData, setUserConData } = useContext(UserContext);
  const [currentUserRole, setCurrentUserRole] = useState(userConData.user.role); // Default to 'admin' userConData.user.role

  const [inviteSentSuccess, setInviteSentSuccess] = useState(false); // State for success message

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
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify(values),
          credentials: "include"
        }
      );
      let resData = await response.json();
      console.log('resdaa==>', resData);
      if (response.status != 200) throw new Error(resData.message);
      

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
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Top Blue Cover Section - From image_f45525.png layout */}
        <div className="relative w-full h-[180px] bg-blue-700 flex justify-end items-end p-4 z-0">
          <Button
            variant="outline"
            className="bg-white text-blue-700 hover:bg-blue-50"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        {/* Main Content Area (NOT a Shadcn Card) - From image_f45525.png layout */}
        <div className="relative -mt-20 mx-auto w-full max-w-6xl p-6 bg-white rounded-xl shadow-lg z-10 mb-8">
          {/* Profile Image (fixed position relative to this container) - From image_f45525.png layout */}
          <div className="absolute -top-12 left-6">
            <img
              src="/avatars/default-profile.jpg" // Placeholder profile image
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>

          {/* User Details and Tabs - From image_f45525.png layout */}
          <div className="ml-32 mt-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Your {currentUserRole} Portal
            </h2>{" "}
            {/* Generic title for this page */}
            <p className="text-sm text-gray-600">
              Manage team invitations here.
            </p>
            <Tabs defaultValue="invite" className="w-full mt-6">
              {" "}
              {/* Using 'invite' as the default value for clarity */}
              <TabsList className="bg-gray-100 rounded-lg p-1">
                <TabsTrigger
                  value="invite"
                  className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700"
                >
                  Invite New User
                </TabsTrigger>
                {/* Other tabs present for layout consistency, but their content is placeholders */}
                <TabsTrigger
                  value="manage"
                  className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700"
                >
                  Manage Invitations
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700"
                >
                  Invitation History
                </TabsTrigger>
                {/* Simulating changing the current user's role for testing the dropdown behavior */}
                <Button
                  variant="ghost"
                  className="ml-4 text-xs text-gray-500 hover:text-blue-700"
                  title="Click to toggle current user role for testing"
                >
                  (Current Role: {currentUserRole})
                </Button>
              </TabsList>
              {/* Content for the "Invite New User" tab */}
              <TabsContent value="invite" className="mt-6">
                {!inviteSentSuccess ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5"
                    >
                      {/* First Name Field */}
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John"
                                {...field}
                                className="h-10 border focus:border-blue-500"
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

                      {/* Last Name Field */}
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Doe"
                                {...field}
                                className="h-10 border focus:border-blue-500"
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

                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="user@example.com"
                                {...field}
                                className="h-10 border focus:border-blue-500"
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

                      {/* Role Select Field with conditional options */}
                      <FormField
                        control={form.control}
                        name="role"
                        // Add 'rules' prop for validation
                        rules={{ required: "Please select a role." }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                              Role
                            </FormLabel>
                            {/* onValueChange and defaultValue are correct */}
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10 border focus:border-blue-500">
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availableRoles.map((role) => (
                                  <SelectItem
                                    key={role.value}
                                    value={role.value}
                                  >
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {/* FormMessage will now display "Please select a role." if left empty */}
                            <FormMessage>
                              {form.formState.errors.role?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      {/* Phone Number Field */}
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 234 567 8900"
                                {...field}
                                className="h-10 border focus:border-blue-500"
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

                      {/* Salary Field */}
                      <FormField
                        control={form.control}
                        name="salary"
                        rules={{ required: "Please select a salary range." }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                              Salary Range
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10 border focus:border-blue-500">
                                  <SelectValue placeholder="Select salary range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="20000-30000">20k - 30k</SelectItem>
                                <SelectItem value="31000-50000">31k - 50k</SelectItem>
                                <SelectItem value="51000-100000">51k - 100k</SelectItem>
                                <SelectItem value="101000-200000">101k - 200k</SelectItem>
                                <SelectItem value="201000-500000">201k - 500k</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage>
                              {form.formState.errors.salary?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      {/* Invite Button */}
                      <div className="col-span-1 md:col-span-2 flex justify-start mt-4">
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
                        >
                          Invite User
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full pt-10 text-center">
                    <CheckCircle className="h-20 w-20 text-green-500 mb-6 animate-bounce" />
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                      Invitation Sent!
                    </h2>
                    <p className="text-md text-gray-700 mb-8">
                      The user has been successfully invited. They will receive
                      an email with instructions.
                    </p>
                    <Button
                      onClick={() => setInviteSentSuccess(false)}
                      className="h-10 border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Invite Another User
                    </Button>
                    <Button
                      onClick={() => console.log("Go to user list")}
                      variant="link"
                      className="mt-2 text-blue-600 hover:underline"
                    >
                      Go to User List
                    </Button>
                  </div>
                )}
              </TabsContent>
              {/* Placeholder content for other tabs for layout consistency */}
              <TabsContent value="manage">
                <div className="p-4 text-gray-500">
                  Content for managing invitations will go here.
                </div>
              </TabsContent>
              <TabsContent value="history">
                <div className="p-4 text-gray-500">
                  Invitation history will be displayed here.
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
