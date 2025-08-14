'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const Login = () => {

     const [email, setEmailLocal] = useState("");
     const [password, setPassword] = useState("");
     const [errorMessage, setErrorMessage] = useState("");
     const [successMessage, setSuccessMessage] = useState("");

     const setEmail = useAuthStore((state) => state.setEmail);
     const router = useRouter();

     const validateInputs = () => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!email.trim()) {
               setErrorMessage("Email is required.");
               return false;
          }
          if (!emailRegex.test(email)) {
               setErrorMessage("Please enter a valid email address.");
               return false;
          }

          if (!password.trim()) {
               setErrorMessage("Password is required.");
               return false;
          }
          if (password.length < 6) {
               setErrorMessage("Password must be at least 6 characters long.");
               return false;
          }

          setErrorMessage(""); 
          return true;
     };

     const handleLogin = async () => {
          if (!validateInputs()){
               return;
          }
          try {
               const response = await axios.post('/api/user/login', { email, password })
               console.log(response.status);
               if (response.status == 202) {
                    setEmail(email);

                    setErrorMessage("");
                    setSuccessMessage("Please provide OTP on next step");
                    router.push("/user/verify-otp")
               }
          } catch (error: any) {
               setSuccessMessage("");
               if (axios.isAxiosError(error) && error.response) {
                    const errorMessage = error.response.data.message;
                    setErrorMessage(errorMessage);
               } else {
                    setErrorMessage("Logging error. Please check your network connection.");
               }
          }
     }

     return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
               <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
                    <form className="space-y-5">
                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input
                                   type="text"
                                   className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                   placeholder="Enter your username"
                                   onChange={(e) => setEmailLocal(e.target.value)}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                              <input
                                   type="password"
                                   className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                   placeholder="Enter your password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                              />
                         </div>

                         <button
                              onClick={(e) => {
                                   e.preventDefault();
                                   handleLogin();
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md"
                         >
                              Login
                         </button>
                    </form>

                    {errorMessage && !successMessage && (
                         <div className="text-red-700 bg-red-100 p-3 rounded mt-4 text-sm text-center">{errorMessage}</div>
                    )}
                    {successMessage && !errorMessage && (
                         <div className="text-green-700 bg-green-100 p-3 rounded mt-4 text-sm text-center">{successMessage}</div>
                    )}
               </div>
          </div>
     );

}

export default Login;