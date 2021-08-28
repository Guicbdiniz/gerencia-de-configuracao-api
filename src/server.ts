import express from "express";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";

const app = express();

app.use(cors(), express.json(), routes, errors);

export default app;
