import dbConnection from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import { taskModel } from "@/schema/todoSchema";



export async function GET() {
    try {
        await dbConnection();
        const getRes = await taskModel.find({})
        return NextResponse.json({
            message: "Get request successfully",
            data: getRes
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "get request failed"
        }, {
            status: 500
        })
    }
}