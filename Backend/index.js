const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let transactions = [];

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.post("/transactions", (req, res) => {
  const newTransaction = {
    id: Date.now(),
    ...req.body
  };

  transactions.push(newTransaction);
  res.json(newTransaction);
});

app.put("/transactions/:id", (req, res) => {
  transactions = transactions.map(t =>
    t.id == req.params.id ? { ...t, ...req.body } : t
  );

  res.json({ message: "Updated" });
});

app.delete("/transactions/:id", (req, res) => {
  transactions = transactions.filter(
    t => t.id != req.params.id
  );

  res.json({ message: "Deleted" });
});


app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => console.log("Server running on port http://localhost:5000"));