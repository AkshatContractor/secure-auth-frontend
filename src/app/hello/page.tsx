'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

const Hello = () => {

     const [message, setMessage] = useState('');
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await axios.get('/api/helloworld');
                    const data = response.data;
                    setMessage(data.title);
                    setLoading(false);
               } catch (error) {
                    console.error('Error fetching data:', error);
                    setMessage('Failed to fetch data');
                    setLoading(false);
               }
          };
          fetchData();
     }, []);

     return (

          <div>
             {loading && <p>Loading...</p>}
             {!loading && <h1 className="text-red-500 font-bold text-center text-3xl">Hi This is akshat c: {message}</h1>}
          </div>
     );
};
export default Hello;