import { FC } from "react";
import { Pie, ResponsiveContainer, PieChart, Cell } from "recharts";

interface PieChartDataProps {
  incomeData: number;
  expenseData: number;
}

const PieChartData: FC<PieChartDataProps> = ({ incomeData, expenseData }) => {
  const data = [
    { name: "Income", value: incomeData },
    { name: "Expense", value: expenseData },
  ];
  const COLORS = ["#936ee3", "#ffc532"];
  return (
    <>
      {" "}
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth="100%"
        minHeight="20vh"
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PieChartData;
