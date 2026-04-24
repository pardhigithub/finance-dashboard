import {useEffect, useState } from "react";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import RoleSwitcher from "./components/RoleSwitcher";
import Summary from "./components/dashboard/Summary";
import Charts from "./components/dashboard/Charts";
import Filters from "./components/transactions/Filters";
import TransactionTable from "./components/transactions/TransactionTable";
import Insights from "./components/insights/Insights";
// import { transactions as initialData } from "./data/data";

function App() {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activePage, setActivePage] = useState("dashboard");

   useEffect(() => {
  fetch("/transactions")
    .then(res => res.json())
    .then(data => setTransactions(data || []))
    .catch(err => console.log("Error:", err));
}, []);


  const addTransaction = async (data) => {
  const res = await fetch("/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const newData = await res.json();
  setTransactions(prev => [...prev, newData]);
  console.log(newData);
};

const updateTransaction = async (id, updatedData) => {
  await fetch(`/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });

  setTransactions(prev =>
    prev.map(t => (t.id === id ? { ...t, ...updatedData } : t))
  );
};

const deleteTransaction = async (id) => {
  await fetch(`/transactions/${id}`, {
    method: "DELETE"
  });

  setTransactions(prev => prev.filter(t => t.id !== id));
};

 
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar setActivePage={setActivePage}/>

      <div className="flex-1 p-6">
          <Header/>
          <RoleSwitcher role={role} setRole={setRole}/>
          {activePage === "dashboard" && (
            <>
            <Summary transactions={transactions}/>
          <Charts transactions={transactions}/>
            </>
          )}
          
          
          <Filters search={search}
              setSearch={setSearch}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}/>
          <TransactionTable transactions={transactions}
              role={role}
              search={search}
              typeFilter={typeFilter}
              addTransaction={addTransaction}
              deleteTransaction={deleteTransaction}
              updateTransaction={updateTransaction}/>
         
          
          {activePage === "insights" && (
          <Insights transactions={transactions} />
        )}
      </div>
    </div>
  );
}

export default App;