import dbConnection from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import { userModel } from "@/schema/userSchema";

export async function GET(req) {
    try {
        await dbConnection();

        const res = await userModel.find({});
        return NextResponse.json({
            message: "user list get successfully",
            data: res
        }, {
            status: 200
        })
    } catch (error) {
        console.log("user list error", error);
        return NextResponse.json({
            message: "not get list"
        }, {
            status: 500
        })
    }
}