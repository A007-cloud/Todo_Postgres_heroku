const Pool = require("pg").Pool;
require("dotenv").config();

// const devConfig = {
//   user: process.env.PG_USER,
//   host: process.env.PG_ENDPOINT,
//   database: process.env.PG_DB,
//   password: process.env.PG_PASS,
//   port: process.env.PG_PORT,
// };

// const pool = new Pool({
//   user: "hwseyuwwbcuiqj",
//   host: "ec2-18-208-55-135.compute-1.amazonaws.com",
//   database: "d9ucbkq5jjugu6",
//   password: "28dd7b3dbf549978db39afc47b23c95482235b10d2291bde91c099f911524f13",
//   port: 5432,
// });

// const proConfig = {
//   connectionString:
//     "postgres://bhzxlapvjjicch:5d01b0c420fe2d6bd228ae7ef79ec6050e62d3080c", //HEROKU-ADDONSs
// };

// const pool = new Pool(
//   process.env.NODE_ENV === "production" ? proConfig : devConfig
// );

// const pool = new Pool(proConfig);

const pool = new Pool({
  connectionString: process.env.DEV_POSTGRES_URL,
  ssl: true,
});

module.exports = pool;
