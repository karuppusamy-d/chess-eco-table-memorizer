import express from "express";
import data from "./data.json";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  // Cache Control: 3 minutes
  res.set("Cache-Control", "public, max-age=180");
  res.json(data);
});

app.get("/:id", (req, res) => {
  // Cache Control: 3 minutes
  res.set("Cache-Control", "public, max-age=180");

  const filteredData = data[req.params.id];
  if (filteredData) {
    res.json(filteredData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
