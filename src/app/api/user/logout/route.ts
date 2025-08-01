import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST() {
     try {
          const res = NextResponse.json({ message: "Logout Successfull" });
          res.cookies.set({
               name: "token",
               value: "",
               path: "/",
               httpOnly: true,
               sameSite: "strict",
               secure: process.env.NODE_ENV === "production",
               expires: new Date(0),
          });
          return res;
     } catch (error) {
          console.error("Logout error:", error);

          return new Response("Failed to logout", { status: 500 });
     }
}