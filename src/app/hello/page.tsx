'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import LogOutButton from '@/app/components/LogoutButton';
import { useRouter } from 'next/navigation';

const Hello = () => {

     const [message, setMessage] = useState('');
     const [loading, setLoading] = useState(true);
     const router = useRouter();

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get('/api/helloworld', {
                         withCredentials: true
                    });
                    const data = response.data;
                    setMessage(data.response);
                    setLoading(false);
               } catch (error) {
                    console.error('Error fetching data:', error);
                    setMessage('Failed to fetch data');
                    setLoading(false);
               }
          };
          fetchData();
     }, []);

     useEffect(() => {
          const bc = new BroadcastChannel("logout");
          bc.onmessage = (event) => {
               if (event.data.message === "out") {
                    router.push("/user/login"); 
               }
          };
          return () => bc.close();
     }, []);

     return (

          <div>
             {loading && <p>Loading...</p>}
             {!loading && <h1 className="text-red-500 font-bold text-center text-3xl">Hi This is akshat c: {message}</h1>
               && <LogOutButton />
             }
          </div>
     );
};
export default Hello;