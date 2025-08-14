import axios from 'axios';

export async function POST(req: Request) {
     const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
     const body = await req.json();

     try {
          
          const response = await axios.post(`${BASE_URL}/user/register`, body);
          return Response.json(response.data, {
               status: response.status
          });

     } catch (error: any) {
          if (axios.isAxiosError(error)) {
               const status = error.response?.status || 500;

               if (status === 409) {
                    return new Response("Email or Username already exists", { status: 409 });
               }

               const message = error.response?.data?.message || 'An error occurred';
               return new Response(message, { status });
          }

          return new Response('Registration failed', { status: 500 });
     }
}
