import { transactions } from "../../data/data";

const Insights = ({ transactions }) => {

  const expenses = transactions.filter(t => t.type === "expense");

  if (expenses.length === 0) {
    return <p>No insights available</p>;
  }

  const total = expenses.reduce((a, b) => a + b.amount, 0);

  const highest = expenses.reduce((prev, curr) =>
    prev.amount > curr.amount ? prev : curr
  );


  return (
    <><div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-3">Insights</h2>

      <p>😜Highest: {highest.category}</p>
      <p>☹️Total Expense: ₹{total}</p>

      {total > 2000 && <p className="text-red-500">⚠️ High spending</p>}
    </div></>
  );
};

export default Insights;