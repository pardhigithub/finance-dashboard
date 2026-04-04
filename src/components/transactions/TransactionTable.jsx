import { useState } from "react";

const TransactionTable = ({
  transactions,
  role,
  search,
  typeFilter,
  addTransaction,
}) => {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const filtered = transactions.filter((t) => {
    const matchSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      typeFilter === "all" || t.type === typeFilter;

    return matchSearch && matchType;
  });

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">

      {role === "admin" && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-3 py-1 mb-3 rounded cursor-pointer"
        >
          + Add Transaction
        </button>
      )}

      <div
        className={` fixed inset-0 flex justify-center items-center z-50 transition-all duration-300 ${
          showForm
            ? "bg-black bg-opacity-40 opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white p-6 rounded shadow-2xl shadow-gray-300 w-[90%]  max-w-md relative transform transition-all duration-300 ${
            showForm
              ? "scale-100 opacity-100"
              : "scale-90 opacity-0"
          }`}
        >
          
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-2 right-2 text-red-600 font-bold cursor-pointer"
          >
            x
          </button>

          <h2 className="text-xl font-bold mb-4">
            Add Transaction
          </h2>
          <div className="flex flex-col gap-3">

            <input
              type="date"
              className="p-2 bg-blue-100 rounded outline-none"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Amount"
              className="p-2 bg-blue-100 rounded-2xl outline-none"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: Number(e.target.value),
                })
              }
            />

            <input
              type="text"
              placeholder="Category"
              className="p-2 bg-blue-100 rounded-2xl outline-none"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            />

            <select
              className="p-2 bg-blue-100 rounded outline-none"
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
            >
              <option value="expense" className="bg-amber-50">Expense</option>
              <option value="income" className="bg-amber-50">Income</option>
            </select>

            <button
              onClick={() => {
                if (!form.date || !form.amount || !form.category) {
                  alert("Please fill all fields");
                  return;
                }

                addTransaction(form);
                setShowForm(false);

                setForm({
                  date: "",
                  amount: "",
                  category: "",
                  type: "expense",
                });
              }}
              className="bg-green-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;