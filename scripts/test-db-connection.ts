import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

const EXPECTED_TABLES = [
  "users",
  "exam_profiles",
  "assessments",
  "practice_submissions",
  "study_plans",
  "progress",
  "feedback",
] as const;

async function main() {
  const databaseUrl =
    process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error(
      "Database connection failed: DATABASE_URL_UNPOOLED or DATABASE_URL is not set in .env.local.",
    );
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    const connectionCheck = await sql`SELECT 1 AS ok`;
    if (connectionCheck[0]?.ok !== 1) {
      throw new Error("Connection check returned an unexpected result.");
    }

    console.log("Connection check: OK");

    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    const tableNames = tables.map((row) => String(row.table_name));
    const missingTables = EXPECTED_TABLES.filter(
      (table) => !tableNames.includes(table),
    );

    if (missingTables.length > 0) {
      console.error("Missing expected tables:");
      for (const table of missingTables) {
        console.error(`- ${table}`);
      }
      process.exit(1);
    }

    console.log("All 7 expected tables exist:");
    for (const table of EXPECTED_TABLES) {
      console.log(`- ${table}`);
    }

    const ratingColumn = await sql`
      SELECT column_name, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'feedback'
        AND column_name = 'rating'
    `;

    if (ratingColumn.length === 0) {
      console.error('Missing expected column: feedback.rating');
      process.exit(1);
    }

    if (ratingColumn[0]?.is_nullable !== "NO") {
      console.error('Expected feedback.rating to be NOT NULL.');
      process.exit(1);
    }

    const ratingCheck = await sql`
      SELECT conname
      FROM pg_constraint
      WHERE conname = 'feedback_rating_check'
    `;

    if (ratingCheck.length === 0) {
      console.error('Missing expected constraint: feedback_rating_check');
      process.exit(1);
    }

    console.log("Feedback rating column and CHECK constraint verified.");

    console.log("Database test completed successfully.");
  } catch (error) {
    console.error("Database test failed.");
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
}

main();
