import { useState } from "react";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import RoleSwitcher from "./components/RoleSwitcher";
import Summary from "./components/dashboard/Summary";
import Charts from "./components/dashboard/Charts";
import Filters from "./components/transactions/Filters";
import TransactionTable from "./components/transactions/TransactionTable";
import Insights from "./components/insights/Insights";
import { transactions as initialData } from "./data/data";

function App() {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState(initialData);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activePage, setActivePage] = useState("dashboard");

  const addTransaction = (newTransaction) => {
  setTransactions((prev) => [
    ...prev,
    { ...newTransaction, id: Date.now() }
  ]);
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
              addTransaction={addTransaction}/>
         
          
          {activePage === "insights" && (
          <Insights transactions={transactions} />
        )}
      </div>
    </div>
  );
}

export default App;