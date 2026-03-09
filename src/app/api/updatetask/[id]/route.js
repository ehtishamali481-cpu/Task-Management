import dbConnection from "@/lib/dbconnect";
import { taskModel } from "@/schema/todoSchema";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function PUT(req, { params }) {

    try {

        await dbConnection();

        const { id } = await params;

        const body = await req.json();

        const token = req.cookies.get("token")?.value;

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const { payload } = await jwtVerify(token, secret);

        const userName = payload.userName;

        const updatedTask = await taskModel.findByIdAndUpdate(

            id,

            {
                $set: {
                    ...body,
                    status: "completed",
                    completedBy: userName,
                    completedAt: new Date()
                }
            },

            { new: true }

        );

        return NextResponse.json({
            message: "Task completed",
            data: updatedTask
        });

    } catch (error) {

        return NextResponse.json({
            message: "Error updating task"
        }, { status: 500 })

    }

}