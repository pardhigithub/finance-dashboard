const Summary = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

      <div className="bg-green-100 p-4 rounded shadow">
        Total Balance: ₹{balance}
      </div>

      <div className="bg-blue-100 p-4 rounded shadow">
        Income: ₹{income}
      </div>

      <div className="bg-red-100 p-4 rounded shadow">
        Expense: ₹{expense}
      </div>

    </div>
  );
};

export default Summary;
