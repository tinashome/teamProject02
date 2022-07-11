import "dotenv/config";
import { app } from "./app.js";
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${port}`)
);
