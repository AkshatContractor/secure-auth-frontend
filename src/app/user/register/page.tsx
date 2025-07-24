'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { STATUS_CODES } from "http";

const Register = () => {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [email, setEmail] = useState("");
     const [errorMessage, setErrorMessage] = useState("");
     const [successMessage, setSuccessMessage] = useState("");

     const handleRegister = async () => {
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
                         console.error("Username or email already exists.");
                    } else {
                         setErrorMessage("Registration failed");
                         setSuccessMessage("");
                         console.error("Registration failed:", error.response.data);
                    }
               } else {
                    setErrorMessage("Network or unexpected error occurred");
                    setSuccessMessage("");
                    console.error("Network or unexpected error:", error);
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
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
               <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>
                    <form className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-gray-700">Username</label>
                              <input
                                   type="text"
                                   className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                   placeholder="Enter your username"
                                   onChange={(e) => setUsername(e.target.value)}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700">Email</label>
                              <input
                                   type="email"
                                   className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                   placeholder="Enter your email"
                                   onChange={(e) => setEmail(e.target.value)}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700">Password</label>
                              <input
                                   type="password"
                                   className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                   placeholder="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                                   
                              />
                         </div>

                         <button
                              onClick={(e) => {
                                   e.preventDefault();
                                   handleRegister();
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
                         >
                              Register
                         </button>
                    </form>
                    {errorMessage && !successMessage && (
                         <div className="text-red-600 bg-red-100 p-4 rounded mt-4">{errorMessage}</div>
                    )}
                    {successMessage && !errorMessage && (
                         <div className="text-green-600 bg-green-100 p-4 rounded mt-4">{successMessage}</div>
                    )}
               </div>
          </div>
     );
};

export default Register;
