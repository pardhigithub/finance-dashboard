import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const Charts = ({ transactions }) => {

  // const expenseData = transactions.filter(t => t.type === "expense");

  if (!transactions || transactions.length === 0) {
  return <p className="text-gray-500 my-4">No data, No chart data</p>;
}

 const categoryData = Object.values(
  transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, value: 0 };
      }
      acc[t.category].value += Number(t.amount);
      return acc;
    }, {})
);

  return (
    <div className="flex gap-6 mb-6 ">
      
      <LineChart width={300} height={200} data={transactions}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>

      <PieChart width={300} height={200}>
        <Pie data={categoryData} dataKey="value" nameKey="name">
          {categoryData.map((entry, index) => (
            <Cell key={index} fill={["#8884d8", "#82ca9d"][index]} />
          ))}
        </Pie>
      </PieChart>

    </div>
  );
};

export default Charts;