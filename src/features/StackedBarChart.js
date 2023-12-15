import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const StackedBarChart = ( {ballData, homeTeam, awayTeam} ) => {
    return (
        <BarChart
            width={450}
            height={250}
            data={ballData}
            margin={{
                top: 15,
                right: 20,
                left: 0,
                bottom: 10
            }}
        >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="inning" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={homeTeam} stackId="a" fill="#8884d8" />
            <Bar dataKey={awayTeam} stackId="a" fill="#82ca9d" />
        </BarChart>
    )
}
export default StackedBarChart