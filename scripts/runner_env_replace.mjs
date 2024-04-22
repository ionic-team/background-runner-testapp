import { readFile, writeFile } from "node:fs/promises";
import "dotenv/config";

const buffer = await readFile("dist/assets/background.js");
let file = buffer.toString();

file = file.replace(
  "{OPENWEATHERMAP_API_KEY}",
  process.env.OPENWEATHERMAP_API_KEY
);

await writeFile("dist/assets/background.js", file);
