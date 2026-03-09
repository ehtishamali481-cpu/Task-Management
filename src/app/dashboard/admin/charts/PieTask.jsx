"use client"
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const PieTaskChart = ({ pending, complete }) => {

    const data = [
        { name: "Pending", value: pending },
        { name: "Completed", value: complete }
    ]

    const COLORS = ["#FF8042", "#00C49F"]

    return (
        <div style={{ width: 400, height: 300 }}>
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>

                <Tooltip />

            </PieChart>
        </div>
    )
}

export default PieTaskChart