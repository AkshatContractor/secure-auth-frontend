'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { STATUS_CODES } from "http";
import { CheckCircle, AlertCircle } from "lucide-react";

const Register = () => {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [email, setEmail] = useState("");
     const [errorMessage, setErrorMessage] = useState("");
     const [successMessage, setSuccessMessage] = useState("");
     const validateInputs = () => {
          
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!username.trim()) {
               setErrorMessage("Username is required.");
               return false;
          }
          if (username.length < 3) {
               setErrorMessage("Username must be at least 3 characters long.");
               return false;
          }

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

     const handleRegister = async () => {
          if (!validateInputs()) return;
          try {
               const response = await axios.post('/api/user/register', {
                    username,
                    password,
                    email,
               });
               if (response.status === 201) {
                    setErrorMessage("");
                    setSuccessMessage("Registration successful!");
                    console.log("Registration successful:", response.data);
               }
          } catch (error: any) {
               if (error.response) {
                    if (error.response.status === 409) {
                         setErrorMessage("Email or Username already exists");
                         setSuccessMessage("");
                    } else {
                         setErrorMessage("Registration failed");
                         setSuccessMessage("");
                    }
               } else {
                    setErrorMessage("Network or unexpected error occurred");
                    setSuccessMessage("");
               }
          }
     };

     useEffect(() => {
          if (successMessage || errorMessage) {
               const timer = setTimeout(() => {
                    setSuccessMessage("");
                    setErrorMessage("");
               }, 4000); // auto clear after 4 seconds

               // Clean up if component unmounts or messages change
               return () => clearTimeout(timer);
          }
     }, [successMessage, errorMessage]);


     return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 px-4">
               <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center tracking-tight">Create Account</h2>
                    <form className="space-y-5">
                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                              <input
                                   type="text"
                                   className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                                   placeholder="Enter your username"
                                   onChange={(e) => setUsername(e.target.value)}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input
                                   type="email"
                                   className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                                   placeholder="Enter your email"
                                   onChange={(e) => setEmail(e.target.value)}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                              <input
                                   type="password"
                                   className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                              />
                         </div>

                         <button
                              onClick={(e) => {
                                   e.preventDefault();
                                   handleRegister();
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-2.5 rounded-lg shadow-md transition-all"
                         >
                              Register
                         </button>
                    </form>

                    {errorMessage && !successMessage && (
                         <div className="flex items-center gap-2 text-red-700 bg-red-100 px-4 py-3 rounded-lg mt-5 animate-fade-in">
                              <AlertCircle className="w-5 h-5" />
                              <p className="text-sm font-medium">{errorMessage}</p>
                         </div>
                    )}

                    {successMessage && !errorMessage && (
                         <div className="flex items-center gap-2 text-green-700 bg-green-100 px-4 py-3 rounded-lg mt-5 animate-fade-in">
                              <CheckCircle className="w-5 h-5" />
                              <p className="text-sm font-medium">{successMessage}</p>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default Register;
