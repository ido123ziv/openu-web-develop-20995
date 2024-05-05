import { Router } from "express";
import db from "../utils/db/db";
const router = Router();

// TESTING ROUTES
router.get("/", () => {
  console.log("in index route");
});

router.get("/hello", (request, response) => {
  console.log("api will respond to hello");
  response.send("Hello world!");
});
router.get("/hello/:username", (request, response) => {
  console.log(request.params);
  const username = request.params.username;
  const response_message = "hello " + username + " !! ";
  response.send(response_message);
});
router.get("/db/tables", async (request, response) => {
  const rowCount = await db.query(
    "SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public';"
  );

  if (!rowCount) throw new Error("No Tables in db");
  console.log(rowCount.rowCount);
  const tables = rowCount.rows.map((item) => item.tablename);
  console.log("found following tables: " + tables);
  response.send(tables);
});

// let's move this to the proper location dear reviewer
router.get("/db/health", (request, response) => {
  const tables = [
    "babysitters",
    "parents",
    "recommendations",
    "parents_babysitters_interactions",
    "moderator_requests",
  ];

  try {
    tables.forEach((element) => {
      if (isValidDb(element) instanceof Error) {
        throw new Error(`Issue with ${element} table`);
      }
    });
    response.send("ALL DB Tables initialized correctly!");
  } catch (error) {
    response.send(error);
  }
});

const isValidDb = async (tableName: string) => {
  console.log(`Table name is ${tableName}`);
  const query = `SELECT * FROM ${tableName}`;
  const rowCount = await db.query(query);
  if (!rowCount || rowCount.rowCount === 0)
    throw new Error(`caught error with ${tableName} table`);
  console.log("Table: " + tableName + " found: " + rowCount.rowCount + " rows");
  return true;
};

export default router;
