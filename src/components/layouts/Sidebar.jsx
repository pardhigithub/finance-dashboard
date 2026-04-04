import { useState } from "react";

const Sidebar = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex justify-between items-center bg-white p-4 shadow">
        <h1 className="text-xl font-bold">⚖️ Finance</h1>

        <button onClick={() => setOpen(true)} className="cursor-pointer">
          🍔
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen md:h-auto w-60 bg-white shadow p-5 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-5 md:hidden">
          <h1 className="text-xl font-bold">⚖️ Finance</h1>
          <button onClick={() => setOpen(false)}>X</button>
        </div>

        <h1 className="text-xl font-bold mb-5 hidden md:block">
          ⚖️ Finance
        </h1>

        <ul className="space-y-4">
          <li
            onClick={() => {
              setActivePage("dashboard");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-blue-500"
          >
            Dashboard
          </li>

          <li
            onClick={() => {
              setActivePage("transactions");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-blue-500"
          >
            Transactions
          </li>

          <li
            onClick={() => {
              setActivePage("insights");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-blue-500"
          >
            Insights
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;