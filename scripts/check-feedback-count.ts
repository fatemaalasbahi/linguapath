import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

async function main() {
  const databaseUrl =
    process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const rows = await sql`SELECT COUNT(*)::int AS count FROM feedback`;
  console.log("feedback_row_count", rows[0]?.count ?? 0);
}

main();
