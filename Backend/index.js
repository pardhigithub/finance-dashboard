const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "db.json");

const readData = () => {
  return JSON.parse(fs.readFileSync(filePath));
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get("/transactions", (req, res) => {
  const data = readData();
  res.json(data.transactions);
});

app.post("/transactions", (req, res) => {
  const data = readData();

  const newTransaction = {
    id: Date.now(),
    ...req.body
  };

  data.transactions.push(newTransaction);
  writeData(data);

  res.json(newTransaction);
});

app.put("/transactions/:id", (req, res) => {
  const data = readData();

  data.transactions = data.transactions.map(t =>
    t.id == req.params.id ? { ...t, ...req.body } : t
  );

  writeData(data);

  res.json({ message: "Updated" });
});

app.delete("/transactions/:id", (req, res) => {
  const data = readData();

  data.transactions = data.transactions.filter(
    t => t.id != req.params.id
  );

  writeData(data);

  res.json({ message: "Deleted" });
});


app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => console.log("Server running on port http://localhost:5000"));