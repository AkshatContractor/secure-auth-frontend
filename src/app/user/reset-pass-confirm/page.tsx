'use client';

import axios from "axios";
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";


const ResetPassConfirm = () => {

     const [newPassword, setNewPassword] = useState("");
     const [confirmNewPassword, setConfirmNewPassword] = useState("");
     const [passwordsMatch, setPasswordsMatch] = useState(true);
     const [message, setMessage] = useState("");
     const [error, setError] = useState("");

     const searchParams = useSearchParams();
     const token = searchParams.get('token');

     const handleUpdatePassword = async (e: any) => {
          e.preventDefault();
          setMessage("");
          setError("");

          if (newPassword.length < 8) {
               setError("Password must be at least 8 characters long.");
               return;
          }

          if (!passwordsMatch) {
               setError("Passwords do not match.");
               return;
          }

          if (!token) {
               setError("Missing password reset link. Please use the link from your email.");
               return;
          }

          try {
               const res = await axios.post(`/api/user/pass-changed`, { new_password: confirmNewPassword, token })
               if (res.status === 200) {
                    setError("");
                    setMessage(res.data.pass_change_response);
               }
          } catch (error) {
               if (axios.isAxiosError(error) && error.response) {
                    setMessage("");
                    setError(error.response.data.message || "Something went wrong while updating password");
               }
          }
     };

     useEffect(() => {
          if (newPassword && confirmNewPassword) {
               setPasswordsMatch(newPassword === confirmNewPassword);
               setError("passwords does not match");
               setMessage("");
          } else {
               setError("");
               setMessage("");
               setPasswordsMatch(true);
          }
     }, [newPassword, confirmNewPassword]);

     useEffect(() => {
          if (!token) {
               setError("Missing password reset link. Please use the link from your email.");
          }
     }, [token]);

     return (
          <>
               <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Change Password</h2>
                         <p className="text-gray-600 text-center mb-6 text-sm">
                              Please Update your password
                         </p>

                         <form className="space-y-5" onSubmit={handleUpdatePassword}>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                   <input
                                        type="password"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        placeholder="Enter your new password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                   />
                                   <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Confirm Password</label>
                                   <input
                                        type="password"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                        placeholder="confirm new password"
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                   />
                              </div>

                              <button
                                   type="submit"
                                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md"
                              >
                                   Update
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
                    </div>
               </div>
          </>
     );
}


export default ResetPassConfirm;