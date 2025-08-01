import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
     const BASE_URL = "http://localhost:8080/api";
     try {
          const body = await req.json();
          const response = await axios.post(`${BASE_URL}/user/login`, body);
          
          const { token } = response.data;
          const res = NextResponse.json({ success: true, user: response.data.user })

          res.cookies.set({
               name: 'token',
               value: token,
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               path: '/',
               maxAge: 60 * 10,
               sameSite: 'lax',
          })

          return res
     } catch (error: any) {
          if(axios.isAxiosError(error)) {
               const status = error.response?.status;
               if(status === 401) {
                    return new Response("Bad Credentials" , {status: 401});
               }
               const message = error.response?.data?.message || 'An error occurred';
               return new Response(message, { status });
          }
          return new Response('Invalid username or password', { status: 500 });
     }
}