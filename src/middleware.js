import { NextResponse } from "next/server";
import { jwtVerify } from "jose";



export async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
            if (payload.role !== "admin") {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }
        if (req.nextUrl.pathname.startsWith("/dashboard/user")) {
            if (payload.role !== "user") {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }
        return NextResponse.next();
    } catch (error) {
        console.log("middeleware error", error);
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");
        return response;
    }
};
export const config = {
    matcher: ["/dashboard/:path*"],
};