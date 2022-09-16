const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_ENDPOINT,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
});

// const pool = new Pool({
//   user: "hwseyuwwbcuiqj",
//   host: "ec2-18-208-55-135.compute-1.amazonaws.com",
//   database: "d9ucbkq5jjugu6",
//   password: "28dd7b3dbf549978db39afc47b23c95482235b10d2291bde91c099f911524f13",
//   port: 5432,
// });

module.exports = pool;
