import AuthLayout from "@/components/auth/AuthLayout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, CheckCircle, Import } from "lucide-react"; // Icons for password toggle and success

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Link } from "react-router-dom";

function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false); // State for success message

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  // Get the value of the 'newPassword' field for validation comparison
  const newPasswordValue = form.watch("newPassword");

  // Handle form submission
  function onSubmit(values) {
    console.log("Reset Password form submitted:", values);
    // In a real app, you'd send these values (e.g., token, newPassword) to your backend API
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setPasswordResetSuccess(true); // Set success state to true
        console.log("Password reset successfully!");
        resolve();
      }, 1500); // Simulate network delay
    });
  }

  return (
    <AuthLayout>
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4"> */}
        {/* Main card container, now fully dedicated to the form content */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          {/* Form / Success Content */}
          <div className="max-w-md mx-auto w-full text-center">
            {" "}
            {/* Centering form content */}
            {!passwordResetSuccess ? ( // Show form if password hasn't been reset successfully
              <>
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                  Reset Your Password
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                  Enter your new password below.
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* New Password Field */}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Enter new password"
                                {...field}
                                type={showNewPassword ? "text" : "password"}
                                className="pl-10 h-10 border focus:border-blue-500 pr-10"
                                {...form.register("newPassword", {
                                  required: "New password is required.",
                                  minLength: {
                                    value: 6,
                                    message:
                                      "Password must be at least 6 characters.",
                                  },
                                })}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label={
                                  showNewPassword
                                    ? "Hide new password"
                                    : "Show new password"
                                }
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.newPassword?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel className="font-semibold text-gray-700">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Confirm new password"
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                className="pl-10 h-10 border focus:border-blue-500 pr-10"
                                {...form.register("confirmPassword", {
                                  required: "Please confirm your password.",
                                  validate: (value) =>
                                    value === newPasswordValue ||
                                    "Passwords do not match.", // Match validation
                                })}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label={
                                  showConfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.confirmPassword?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    {/* Reset Password Button */}
                    <Button
                      type="submit"
                      className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-2 rounded-md"
                    >
                      Reset Password
                    </Button>
                  </form>
                </Form>

                {/* Back to Login Link */}
                <p className="text-center text-sm mt-6 text-gray-600">
                  <a
                    href="/login"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Back to Login
                  </a>
                </p>
              </>
            ) : (
              // Show success message after password reset
              <div className="flex flex-col items-center justify-center h-full pt-10">
                <CheckCircle className="h-20 w-20 text-green-500 mb-6 animate-bounce" />
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Password Reset!
                </h2>
                <p className="text-md text-gray-700 mb-8">
                  Your password has been successfully reset. You can now log in
                  with your new password.
                </p>
                <Button
                  onClick={() => setPasswordResetSuccess(false)}
                  variant="outline"
                  className="h-10 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Reset Another (For Demo)
                </Button>{" "}
                {/* Added for demonstration, can be removed in real app */}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline font-semibold mt-4"
                >
                  Proceed to Login
                </a>
              </div>
            )}
          </div>
        </div>
      
      {/* </div> */}
    </AuthLayout>
  );
}

export default ResetPassword;
