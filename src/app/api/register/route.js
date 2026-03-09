import { NextResponse } from "next/server";
import { userModel } from "@/schema/userSchema";
import bcrypt from "bcryptjs";
import dbConnection from "@/lib/dbconnect";



export async function POST(req) {
    try {
        await dbConnection();
        const { userName, email, password, role } = await req.json();
        const hashPassword = await bcrypt.hash(password, 10);
        if (!userName || !email || !password || !role) {
            return NextResponse.json({
                message: "Fill all input filed"
            }, {
                status: 400
            })
        };
        const postUser = await userModel.create({
            userName,
            email,
            password: hashPassword,
            role
        });
        return NextResponse.json({
            message: "user Create successfully",
            data: postUser
        }, {
            status: 200
        })

    } catch (error) {
        console.log("user create error", error);
        return NextResponse.json({
            message: "user create not"
        }, {
            status: 500
        })
    }
}