import app from "./src/server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`This is Webinho's server and it is running on port ${port}`)
);
