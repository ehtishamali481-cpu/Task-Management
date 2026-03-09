import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { userModel } from "@/schema/userSchema";
import bcrypt from "bcryptjs";
import dbConnection from "@/lib/dbconnect";



export async function POST(req) {
    try {
        await dbConnection();
        const { email, password } = await req.json();
        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({
                message: "User not registered"
            }, {
                status: 404
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                message: "password is wrong"
            }, {
                status: 400
            })
        }
        const token = jwt.sign(
            { id: user?._id, role: user?.role, userName: user?.userName },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        const response = NextResponse.json({
            message: "user loggin successfully",
            role: user.role
        }, {
            status: 200
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/"
        });
        return response
    } catch (error) {
        console.log("login error", error)
    }
}