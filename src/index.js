require("dotenv").config();
require("./database");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { router } = require("./routes");

const app = express();
const PORT = process.env.PORT | 3333;

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(router);

app.get("/", (request, response) => {
    return response.json({ message: "hello world!" });
});

app.listen(PORT, () => console.log("Backend running at port:", PORT));
