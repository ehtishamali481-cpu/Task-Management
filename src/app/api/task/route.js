import dbConnection from "@/lib/dbconnect";
import { taskModel } from "@/schema/todoSchema";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
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