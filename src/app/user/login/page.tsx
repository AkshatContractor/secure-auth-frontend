'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {

     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [errorMessage, setErrorMessage] = useState("");
     const [successMessage, setSuccessMessage] = useState("");

     const router = useRouter();

     const handleLogin = async () => {
          try {
               const response = await axios.post('/api/user/login', {username, password})
               console.log(response.status);
               if(response.status == 200) {
                    setErrorMessage("");
                    setSuccessMessage("Login Successfull");
                    router.push("/hello")
               }
          } catch (error: any) {
               setSuccessMessage("");
               if (error.response) {
                    if(error.response.status === 401) {
                         setErrorMessage("Invalid username or password. please try again");
                         return;
                    }
               }
               setErrorMessage("Logging error");
          }
     }

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
                                   handleLogin();
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
                         >
                              Login
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
}

export default Login;