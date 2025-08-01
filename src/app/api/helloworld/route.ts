import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const BASE_URL = "http://localhost:8080/api";

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const res = await axios.get(`${BASE_URL}/hello`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = res.data;
    return Response.json(data);
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return new Response('Failed to fetch data', { status: 500 });
  }
}
