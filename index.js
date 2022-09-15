const express = require("express");
const app = express();
const pool = require("./db/connect");
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

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// routes
app.use("/api/v1/todo", todoRouter);

app.use(notFoundMiddleware);

const PORT = 3000;

console.log(`Port: ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
