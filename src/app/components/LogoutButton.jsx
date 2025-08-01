'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


const LogOutButton = () => {

     const router = useRouter();
     const bc = new BroadcastChannel("logout");

     const handleLogout = async () => {
          try {
               const response = await axios.post("/api/user/logout");
               bc.postMessage({
                    message: "out"
               });
               router.push("/user/login")
          } catch (error) {
               console.error("Failed to logout", error);
          } finally {
               bc.close();
          }
     };
     
     return (
          <button
               onClick={handleLogout}
               className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-200"
          >
               Logout
          </button>
     );
}


export default LogOutButton;