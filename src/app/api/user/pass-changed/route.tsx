import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
     const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
     try {
          const body = await req.json();
          const response = await axios.post(`${BASE_URL}/user/confirm-reset-password`, body);
          if (response.status == 200) {
               return NextResponse.json(response.data, {
                    status: response.status
               });
          }
     } catch (error) {
          if (axios.isAxiosError(error)) {
               if (error.response) {
                    const status = error.response.status;
                    const message = error.response.data.pass_change_response;
                    return NextResponse.json({ message }, { status });
               }
          }
          return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
     }
}