
import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
     const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
     const body = await req.json();
     try {
          const res = await axios.post(`${BASE_URL}/user/verify-otp`, body);
          if (res.status == 200) {
               console.log("Otp verified successfully");
               const { token } = res.data;
               const cookieStore = await cookies();
               cookieStore.set({
                    name: 'token',
                    value: token,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                    maxAge: 60 * 10,
                    sameSite: 'lax',
               })
               return NextResponse.json(res.data);
          }
     } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
               const status = error.response.status;
               const message = error.response.data?.message || 'An error occurred';

               return NextResponse.json({ message }, { status });
          }

          return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
     }
}