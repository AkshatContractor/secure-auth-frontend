'use client';

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const VerifyOtp = () => {
     const [otp, setOtp] = useState("");
     const [loading, setLoading] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
     const email = useAuthStore((state) => state.email);
     const router = useRouter();

     const handleOtpSubmit = async () => {
          if (!/^\d{6}$/.test(otp)) {
               setErrorMessage("OTP must be 6 digits.");
               return;
          }
          setLoading(true);
          setErrorMessage("");
          try {
               const res = await axios.post("/api/user/verify-otp", { email, otp });
               if (res.status === 200) {
                    console.log("Login successful");
                    router.push("/user/dashboard");
               }
          } catch (error) {
               if (axios.isAxiosError(error) && error.response) {
                    switch (error.response.status) {
                         case 401: // Unauthorized
                              setErrorMessage("Invalid OTP. Please try again.");
                              break;
                         case 404: // Not Found
                              setErrorMessage("User not found or OTP generation failed.");
                              break;
                         case 410: // Gone 
                              setErrorMessage("OTP has expired. Please request a new one.");
                              break;
                         case 500: // Internal Server Error
                              setErrorMessage("An internal server error occurred. Please try again later.");
                              break;
                         default:
                              setErrorMessage("An unexpected error occurred. Please try again.");
                              break;
                    }
               } else {
                    // Handle network errors or other issues
                    setErrorMessage("Network error. Please check your connection.");
               }
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
               <div className="p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 w-96">
                    <div className="flex justify-center mb-4">
                         <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                              <User size={24} />
                         </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                         Enter OTP
                    </h2>

                    {errorMessage && (
                         <div className="mb-4 text-red-600 dark:text-red-400 text-center text-sm font-medium">
                              {errorMessage}
                         </div>
                    )}

                    <input
                         type="text"
                         className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 mb-4 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                         placeholder="Enter OTP"
                         value={otp}
                         onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                         onClick={handleOtpSubmit}
                         disabled={loading}
                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
                    >
                         {loading ? "Verifying..." : "Submit OTP"}
                    </button>
               </div>
          </div>
     );
};

export default VerifyOtp;
