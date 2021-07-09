import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();

import "./database";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routes";
import { handleErrors } from "./middlewares/handleErrors";

const app = express();
const PORT = process.env.PORT || 3333;

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(router);
app.use(handleErrors);

app.listen(PORT, () => console.log("Backend running at port:", PORT));
