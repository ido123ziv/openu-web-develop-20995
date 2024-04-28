import { Pool } from "pg";

const dbConnection = new Pool({
  host: "db",
  user: "docker",
  database: "docker",
  password: "1234",
  port: 5433,
});

export default dbConnection;
