const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Aditya77*",
  port: 5432,
});

module.exports = pool;
