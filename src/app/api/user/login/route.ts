import axios from 'axios';


export async function POST(req: Request) {
     const BASE_URL = "http://localhost:8080/api";
     const body = await req.json();

     try {
          const response = await axios.post(`${BASE_URL}/user/login`, body);
          console.log("Loging successfull: ", response);
          return Response.json(response.data, {
               status: response.status
          });
     } catch (error: any) {
          console.error("Error fetching login details");
     }
}