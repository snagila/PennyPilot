import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface Transaction {
  _id?: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  userEmail?: string;
}

type DataItem = {
  name: string;
  expense: number;
  income: number;
};

interface LineChartsProps {
  allTransactions: Transaction[];
}

const LineCharts: FC<LineChartsProps> = ({ allTransactions }) => {
  const data: DataItem[] = allTransactions.reduce((acc: any, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString(); // Format the date if necessary
    const existingData = acc.find((item: any) => item.name === date);

    if (existingData) {
      if (transaction.type === "expense") {
        existingData.expense += transaction.amount;
      } else if (transaction.type === "income") {
        existingData.income += transaction.amount;
      }
    } else {
      acc.push({
        name: date,
        expense: transaction.type === "expense" ? transaction.amount : 0,
        income: transaction.type === "income" ? transaction.amount : 0,
      });
    }

    return acc;
  }, []);

  const sortedbydateData = data.sort((a: any, b: any) => {
    const dateA = new Date(a.name.split("/").reverse().join("-"));
    const dateB = new Date(b.name.split("/").reverse().join("-"));

    return dateB.getTime() - dateA.getTime();
  });

  const [opacity, setOpacity] = React.useState({
    expense: 1,
    income: 1,
  });

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  return (
    <>
      {sortedbydateData.length > 0 && (
        <ResponsiveContainer width="100%" height={300} style={{ color: "red" }}>
          <LineChart
            width={500}
            height={300}
            data={sortedbydateData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="income"
              strokeOpacity={opacity.income}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              strokeOpacity={opacity.expense}
              stroke="#FFC532"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default LineCharts;
