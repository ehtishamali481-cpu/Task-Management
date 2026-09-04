"use client"
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";

const MonthlyChart = ({ tasks = [], pending = [], complete = [] }) => {
    const [chart, setChart] = useState(false);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const today = new Date();
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - today.getDay());

    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);

    const dailyData = days.map((day, index) => {
        const taskCount = tasks.filter(task => {
            const d = new Date(task.createdAt);
            return d >= firstDay && d <= lastDay && d.getDay() === index;
        }).length;

        const pendingCount = pending.filter(task => {
            const d = new Date(task.createdAt);
            return d >= firstDay && d <= lastDay && d.getDay() === index;
        }).length;

        const completeCount = complete.filter(task => {
            const d = new Date(task.createdAt);
            return d >= firstDay && d <= lastDay && d.getDay() === index;
        }).length;

        return {
            day,
            tasks: taskCount,
            pending: pendingCount,
            completed: completeCount
        };
    });

    const monthlyData = months.map((month, index) => {
        const taskCount = tasks.filter(task => {
            const d = new Date(task.createdAt);
            return d.getMonth() === index;
        }).length;

        const pendingCount = pending.filter(task => {
            const d = new Date(task.createdAt);
            return d.getMonth() === index;
        }).length;

        const completeCount = complete.filter(task => {
            const d = new Date(task.createdAt);
            return d.getMonth() === index;
        }).length;

        return {
            month,
            tasks: taskCount,
            pending: pendingCount,
            completed: completeCount
        };
    });

    return (
        <div className="w-full min-w-0 bg-white/70 backdrop-blur-md p-3 sm:p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center sm:justify-end gap-6 mb-4 text-xs sm:text-sm font-semibold text-gray-700">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                        type="radio"
                        name="check"
                        checked={!chart}
                        onChange={() => setChart(false)}
                        className="accent-indigo-600 cursor-pointer"
                    />
                    <span>Monthly</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                        type="radio"
                        name="check"
                        checked={chart}
                        onChange={() => setChart(true)}
                        className="accent-indigo-600 cursor-pointer"
                    />
                    <span>Weekly</span>
                </label>
            </div>
            <div className="w-full h-[260px] sm:h-[320px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chart ? dailyData : monthlyData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey={chart ? "day" : "month"}
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                borderRadius: "10px",
                                border: "1px solid #e5e7eb",
                                fontSize: "12px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                            }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            wrapperStyle={{ fontSize: "12px" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="tasks"
                            stroke="#6366f1"
                            strokeWidth={2.5}
                            dot={{ r: 2 }}
                            activeDot={{ r: 5 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="pending"
                            stroke="#ef4444"
                            strokeWidth={2.5}
                            dot={{ r: 2 }}
                            activeDot={{ r: 5 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="completed"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            dot={{ r: 2 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MonthlyChart;