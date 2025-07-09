// components/LoginPage.jsx (or pages/auth/login.jsx)
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form"; // Only react-hook-form
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"; // Icons for password toggle, email, and lock

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { UserContext } from "@/context/userContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMsg, setLoginMsg] = useState(false);
  const [loading, setLoading] = useState(false)
  let {userConData , setUserConData} = useContext(UserContext)
  let navigate = useNavigate(false)

  // Initialize useForm without a resolver
  const form = useForm({
    defaultValues: {
      email: "", 
      password: "", 
      rememberMe: false,
    },
    // You can set validation mode here if needed, e.g., 'onBlur', 'onChange', 'onSubmit'
    mode: "onBlur", // Validate on blur for better user experience
  });

  // Handle form submission
  async function onSubmit(values) {
     setLoading(true)
    try {
       let res = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'Application/json'
        },
        body : JSON.stringify(values),
        credentials : 'include'
       })

       let resData = await res.json()
        
       setLoginMsg(resData.message)
       if(res.status != 200) throw new Error(resData)
        alert('sucessfullylogin')
        setUserConData(resData.data)

        navigate('/dashboard')
    } 
    catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  
  return (
    <AuthLayout>
      {/* Righ Side: Login Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
         {loginMsg && <h1 className={`max-w-md mx-auto w-full h-10 text-center pt-2 rounded absolute top-3
          ${loginMsg.includes('Sucessfully') ? 'bg-green-200' : 'bg-red-200'} text-gray-800 text-[15px]`}>
            {loginMsg}
            </h1>}
          <h1 className="text-3xl font-bold mb-2 text-gray-800 ">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your email and password to access your account.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="your@example.com"
                          {...field}
                          className="pl-10 h-10 border focus:border-blue-500"
                          type="email"
                          // React Hook Form validation rules directly on the Input
                          // pattern for basic email format validation (more robust is regex in custom validation)
                          // required message is displayed if the field is empty
                          {...form.register("email", {
                            required: "Email is required.",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address.",
                            },
                          })}
                        />
                      </div>
                    </FormControl>
                    {/* Displays validation error message */}
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="123456"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pl-10 h-10 border focus:border-blue-500 pr-10"
                          // React Hook Form validation rules directly on the Input
                          {...form.register("password", {
                            required: "Password is required.",
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters.",
                            },
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {/* Displays validation error message */}
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="remember-me"
                          className="h-4 w-4"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="remember-me"
                        className="!mt-0 cursor-pointer font-normal text-gray-700"
                      >
                        Remember Me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Forgot Your Password?
                </Link>
              </div>

              {/* Log In Button */}
              <Button
                type="submit"
                className={`w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-2 rounded-md
                  ${loading && "opacity-50 cursor-not-allowed"}`}
                disabled={loading}
              >
                 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"} 
              </Button>
            </form>
          </Form>

          {/* Or Log In With */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              Or Log In With
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Logins */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1 h-10 flex items-center justify-center  border-gray-300 hover:bg-gray-50"
            >
              {/* Make sure google-logo.svg is in your public folder */}
              <img
                src="/assets/logingoogleicon.png"
                alt="Google"
                className="h-6 w-6"
              />
              <span>Google</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-10 flex items-center justify-center  border-gray-300 hover:bg-gray-50"
            >
              {/* Make sure apple-logo.svg is in your public folder */}
              <img
                src="/assets/loginappleicon.png"
                alt="Apple"
                className="h-4 w-4"
              />
              <span>Apple</span>
            </Button>
          </div>

          {/* Don't Have An Account? */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Don't Have An Account?{" "}
            <span className="text-blue-700 font-semibold">Register Now</span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
