import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req) {

    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
        user: payload
    });
}