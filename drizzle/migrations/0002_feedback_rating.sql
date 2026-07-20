ALTER TABLE "feedback" ADD COLUMN "rating" integer;
--> statement-breakpoint
UPDATE "feedback" SET "rating" = 3 WHERE "rating" IS NULL;
--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_rating_check" CHECK ("rating" >= 1 AND "rating" <= 5);
--> statement-breakpoint
ALTER TABLE "feedback" ALTER COLUMN "rating" SET NOT NULL;
