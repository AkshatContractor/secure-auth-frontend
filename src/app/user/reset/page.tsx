'use client';

import axios from "axios";
import BackToLoginLink from "@/app/components/BackToLoginLink";
import { useState } from "react";

const ResetPassword = () => {

     const [username, setUsername] = useState("");
     const [message, setMessage] = useState("");
     const [error, setError] = useState("");

     const handleResetLink = async (e: any) => {
          e.preventDefault();
          try {
               const res = await axios.post(`/api/user/forgot-password`, { username })
               if (res.status === 200) {
                    setError("");
                    setMessage("Email has sent")
               }
          } catch (error) {
               if (axios.isAxiosError(error) && error.response) {
                    setMessage("");
                    console.log(error.response.data.status);
                    setError(error.response.data.message || "Something went wrong while sending email")
               }
          }
     }

     return (
          <>
               <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Reset Password</h2>
                         <p className="text-gray-600 text-center mb-6 text-sm">
                              Enter your username address and we'll send you a link to reset your password.
                         </p>

                         <form className="space-y-5" onSubmit={handleResetLink}>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                   <input
                                        type="email"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        placeholder="Enter your username address"
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                   />
                              </div>

                              <button
                                   type="submit"
                                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md"
                              >
                                   Send Reset Link
                              </button>
                         </form>

                         {/* Success Message */}
                         {message && !error && (
                              <div className="text-green-700 bg-green-100 p-3 rounded mt-4 text-sm text-center">
                                   {message}
                              </div>
                         )}

                         {/* Error Message */}
                         {error && !message && (
                              <div className="text-red-700 bg-red-100 p-3 rounded mt-4 text-sm text-center">
                                   {error}
                              </div>
                         )}

                         <div className="text-center mt-6">
                              <BackToLoginLink />
                         </div>
                    </div>
               </div>
          </>
     );
}

export default ResetPassword;