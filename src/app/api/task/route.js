import dbConnection from "@/lib/dbconnect";
import { taskModel } from "@/schema/todoSchema";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function POST(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (token) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            if (payload.role === "viewer") {
                return NextResponse.json({ message: "Forbidden" }, { status: 403 });
            }
        }
        dbConnection();
        const body = await req.json();
        const postData = await taskModel.create(body);
        return NextResponse.json({
            message: "task addes successfuuly",
            data: postData

        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: "task not added"
        }, {
            status: 500
        })
    }

}