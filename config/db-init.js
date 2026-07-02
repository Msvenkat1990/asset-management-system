const { Client } = require("pg");
require("dotenv").config();

async function ensureDatabase() {
  const dbName = process.env.DB_NAME;

  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    port: 5432,
  });

  try {
    await client.connect();
    
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName],
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
    } else {
      console.log(`Database already exists: ${dbName}`);
    }

    await client.end();
  } catch (err) {
    process.exit(1);
  }
}

module.exports = ensureDatabase;
