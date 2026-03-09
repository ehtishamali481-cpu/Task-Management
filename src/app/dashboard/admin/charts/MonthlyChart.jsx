"use client"
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const MonthlyChart = ({ tasks = [], pending = [], complete = [] }) => {
    const [chart, setChart] = useState(false)

    const months =
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days =
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
            const d = new Date(task.createdAt)
            return d.getMonth() === index
        }).length;

        const pendingCount = pending.filter(task => {
            const d = new Date(task.createdAt)
            return d.getMonth() === index
        }).length;

        const completeCount = complete.filter(task => {
            const d = new Date(task.createdAt)
            return d.getMonth() === index
        }).length;

        return {
            month,
            tasks: taskCount,
            pending: pendingCount,
            completed: completeCount
        }

    })

    return (
        <div className="chart-container" style={{ width: "100%", height: 300 }}>
            <div className="chart-row">
                <div className="row">
                    <label htmlFor="">Montly</label>
                    <input type="radio"
                        name="check"
                        onChange={() => setChart(false)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="">Weekly</label>
                    <input type="radio"
                        name="check"
                        onChange={() => setChart(true)}
                    />
                </div>
            </div>


            <ResponsiveContainer>
                <LineChart data={chart ? dailyData : monthlyData}>
                    <XAxis dataKey={chart ? "day" : "month"} />
                    <YAxis />
                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="tasks"
                        stroke="#8884d8"
                        strokeWidth={3}
                    />
                    <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#ff0000"
                        strokeWidth={3}
                    />
                    <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#00C49F"
                        strokeWidth={3}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MonthlyChart