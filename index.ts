import app from "./src/server";
import dotenv from "dotenv";
import "reflect-metadata";
import { setUpConnection } from "./src/db/config";

dotenv.config();

const port = process.env.PORT;

app.listen(port, async () => {
  await setUpConnection();
  console.log(`This is Webinho's server and it is running on port ${port}`);
});
