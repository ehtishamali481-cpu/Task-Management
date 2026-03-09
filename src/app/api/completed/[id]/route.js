import dbConnection from "@/lib/dbconnect";
import { taskModel } from "@/schema/todoSchema";
import { NextResponse } from "next/server";




export async function DELETE(req, { params }) {
    try {
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









