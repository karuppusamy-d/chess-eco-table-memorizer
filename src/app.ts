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

app.get("/:id/*", (req, res) => {
  // Cache Control: 3 minutes
  res.set("Cache-Control", "public, max-age=180");

  // Parse the query string
  const query = req.params[0].endsWith("/")
    ? req.params[0]
    : `${req.params[0]}/`;

  // Filter the data
  const filteredData = data[req.params.id].moves
    .split(" ")
    .filter((move) => !move.match(/^[0-9]+/))
    .join("/");

  // Find the next move
  const nextMove = filteredData.startsWith(query)
    ? filteredData.slice(query.length).split("/")[0]
    : "";

  // Return the result
  if (nextMove) res.json({ next: nextMove });
  else res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
