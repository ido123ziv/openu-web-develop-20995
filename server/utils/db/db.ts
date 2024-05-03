import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
});

export default pool;
