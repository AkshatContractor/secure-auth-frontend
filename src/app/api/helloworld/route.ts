import axios from 'axios';

export async function GET() {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = res.data;
    return Response.json(data);
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return new Response('Failed to fetch data', { status: 500 });
  }
}
