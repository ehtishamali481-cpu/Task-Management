import dbConnection from "@/lib/dbconnect";
import { taskModel } from "@/schema/todoSchema";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";




export async function DELETE(req, { params }) {
    try {
        const token = req.cookies.get("token")?.value;
        if (token) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            if (payload.role === "viewer") {
                return NextResponse.json({ message: "Forbidden" }, { status: 403 });
            }
        }
        await dbConnection();
        const { id } = await params;
        const taskDel = await taskModel.findByIdAndDelete(id);
        if (!taskDel) {
            return NextResponse.json({ message: "Task Not found" }, { status: 400 });
        }
        return NextResponse.json({ message: "Task Delete successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Not delete task" }, { status: 500 });
    }
};









