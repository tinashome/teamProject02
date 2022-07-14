import "dotenv/config";
import { app } from "./app.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/../.env" });
console.log(process.env.PORT);
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${port}`)
);
