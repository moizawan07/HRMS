import AuthLayout from "@/layouts/AuthLayout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, CheckCircle } from "lucide-react"; // Icons for email and success

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false); // State to show success message

  const form = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onBlur", // Validate on blur
  });

  // Handle form submission
 async function onSubmit(values) {
   
  try {
    let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/forget-password`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({email : values.email})
    })
    let resData = await response.json()

    if(response.status !== 200) throw new Error(resData.message);
        setEmailSent(true); 

  } 
  catch (error) {
    alert(error)
    setEmailSent(false)
  }
    
  }

  return (
    <AuthLayout>
      {/* Right Side: Forgot Password Form / Confirmation */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full text-center">
          {" "}
          {/* Centering content */}
          {!emailSent ? ( // Show form if email hasn't been sent
            <>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                Forgot Password?
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                Enter your email address below and we'll send you a link to
                reset your password.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        {" "}
                        {/* Align label left */}
                        <FormLabel className="font-semibold text-gray-700">
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="your@example.com"
                              {...field}
                              className="pl-10 h-10 border focus:border-blue-500"
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
                          </div>
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.email?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  {/* Send Reset Link Button */}
                  <Button
                    type="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-2 rounded-md"
                  >
                    Send Reset Link
                  </Button>
                </form>
              </Form>

              {/* Back to Login */}
              <p className="text-center text-sm mt-6 text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Back to Login
                </Link>
              </p>
            </>
          ) : (
            // Show success message after email sent
            <div className="flex flex-col items-center justify-center h-full pt-10">
              <CheckCircle className="h-20 w-20 text-green-500 mb-6 animate-bounce" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Email Sent!
              </h2>
              <p className="text-md text-gray-700 mb-8">
                We've sent a password reset link to your email address. Please
                check your inbox (and spam folder).
              </p>
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="h-10 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Resend Email
              </Button>
              <a
                href="/login"
                className="text-blue-600 hover:underline font-semibold mt-4"
              >
                Back to Login
              </a>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
