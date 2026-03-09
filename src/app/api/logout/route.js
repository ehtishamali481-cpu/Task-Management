import { NextResponse } from "next/server";



export async function GET(req) {
    const loginUrl = new URL("/login", req.url);
    const response = NextResponse.redirect(loginUrl);

    // Delete token
    response.cookies.delete("token");
    return response;
}