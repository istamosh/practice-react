const fs = require("fs");
const path = require("path");

const scenariosDir = path.join(__dirname, "src", "app", "scenarios");
const outputFilePath = path.join(__dirname, "src", "scenariosList.json");

fs.readdir(scenariosDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error("Error reading scenarios directory:", err);
    return;
  }

  const scenarios = files
    .filter((file) => file.isDirectory())
    .map((dir) => dir.name);

  fs.writeFile(outputFilePath, JSON.stringify(scenarios, null, 2), (err) => {
    err
      ? console.error("Error writing scenarios list file:", err)
      : console.log("Scenarios list generated successfully.");
  });
});
