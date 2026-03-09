import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duedate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    completedBy: {
        type: String
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});

export const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);

