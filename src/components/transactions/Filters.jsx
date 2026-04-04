import React from 'react'

const Filters = ({ search, setSearch, typeFilter, setTypeFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded"
      />

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  )
}

export default Filters
