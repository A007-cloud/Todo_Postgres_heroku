const express = require("express");
const app = express();
const pool = require("./db/connect");
require("dotenv").config();
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todo");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("index page");
});

// routes
app.use("/api/v1/todo", todoRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening .....`);
});
