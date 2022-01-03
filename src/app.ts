import express from "express";
import data from "./data.json";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json(data);
});

app.get("/:id", (req, res) => {
  const filtered = data[req.params.id];
  if (filtered) {
    res.json(filtered);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
