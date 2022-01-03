import fs from "fs";
import fetch from "node-fetch";
import cheerio from "cheerio";

// URL for data
const URL = "https://www.chessgames.com/chessecohelp.html";
const FILE_NAME = "src/data.json";

/*------------- CREATE DIRECTORYS --------------*/
try {
  if (fs.existsSync("build")) {
    fs.rmSync("build", { recursive: true });
  }
  fs.mkdirSync("build", { recursive: true });
} catch (err) {
  console.error(err);
  throw new Error("Failed Creating Folder");
}

/*------------- HELPER FUNCTIONS --------------*/
// function to get the raw data
const getRawData = (url) => {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// function to save the data
async function saveFile(data, path) {
  await fs.writeFile(path, data, function (err) {
    if (err) throw err;
    console.log(`Created ${path} file`);
  });
}

/*------------- SCRAPE DATA --------------*/
(async () => {
  console.log("Starting Scrape...");

  // Fetch the raw data
  const rawData = await getRawData(URL);

  // Parsing the data
  const parsedData = cheerio.load(rawData);

  // Extracting rows
  const rows = parsedData("tr");

  const res = {};
  for (let i = 0; i < rows.length; i++) {
    // Extracting the data
    const id = rows[i].children[0].children[0].children[0].data;
    const name = rows[i].children[1].children[0].children[0].children[0].data;
    const value = rows[i].children[1].children[0].children[3].children[0].data;
    res[id] = { name, value };
  }

  // Save the data
  await saveFile(JSON.stringify(res), FILE_NAME);
})();
