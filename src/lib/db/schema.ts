import { relations, sql } from "drizzle-orm";
import {
  check,
  date,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  neonAuthUserId: text("neon_auth_user_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const examProfiles = pgTable("exam_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  language: text("language").notNull(),
  examType: text("exam_type").notNull(),
  scoringModel: text("scoring_model").notNull(),
  currentScore: integer("current_score"),
  targetScore: integer("target_score"),
  currentLevel: text("current_level"),
  targetLevel: text("target_level"),
  examDate: date("exam_date"),
  studyHoursPerWeek: integer("study_hours_per_week"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const assessments = pgTable("assessments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  examProfileId: uuid("exam_profile_id")
    .notNull()
    .references(() => examProfiles.id, { onDelete: "cascade" }),
  assessmentType: text("assessment_type").notNull(),
  inputContent: text("input_content").notNull(),
  aiScore: integer("ai_score"),
  aiLevel: text("ai_level"),
  strengths: text("strengths"),
  weaknesses: text("weaknesses"),
  recommendations: text("recommendations"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const practiceSubmissions = pgTable("practice_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  examProfileId: uuid("exam_profile_id")
    .notNull()
    .references(() => examProfiles.id, { onDelete: "cascade" }),
  submissionType: text("submission_type").notNull(),
  studentResponse: text("student_response").notNull(),
  aiFeedback: text("ai_feedback").notNull(),
  score: integer("score"),
  level: text("level"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

import type { StudyPlanContent } from "@/lib/study-plan/schemas";

export const studyPlans = pgTable("study_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  examProfileId: uuid("exam_profile_id")
    .notNull()
    .references(() => examProfiles.id, { onDelete: "cascade" }),
  planContent: jsonb("plan_content").$type<StudyPlanContent>().notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const progress = pgTable("progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  examProfileId: uuid("exam_profile_id")
    .notNull()
    .references(() => examProfiles.id, { onDelete: "cascade" }),
  activityType: text("activity_type").notNull(),
  score: integer("score"),
  level: text("level"),
  notes: text("notes"),
  completedAt: timestamp("completed_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const feedback = pgTable(
  "feedback",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    feedbackType: text("feedback_type").notNull(),
    rating: integer("rating").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "feedback_rating_check",
      sql`${table.rating} >= 1 AND ${table.rating} <= 5`,
    ),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  examProfiles: many(examProfiles),
  assessments: many(assessments),
  practiceSubmissions: many(practiceSubmissions),
  studyPlans: many(studyPlans),
  progressRecords: many(progress),
  feedback: many(feedback),
}));

export const examProfilesRelations = relations(examProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [examProfiles.userId],
    references: [users.id],
  }),
  assessments: many(assessments),
  practiceSubmissions: many(practiceSubmissions),
  studyPlans: many(studyPlans),
  progressRecords: many(progress),
}));

export const assessmentsRelations = relations(assessments, ({ one }) => ({
  user: one(users, {
    fields: [assessments.userId],
    references: [users.id],
  }),
  examProfile: one(examProfiles, {
    fields: [assessments.examProfileId],
    references: [examProfiles.id],
  }),
}));

export const practiceSubmissionsRelations = relations(
  practiceSubmissions,
  ({ one }) => ({
    user: one(users, {
      fields: [practiceSubmissions.userId],
      references: [users.id],
    }),
    examProfile: one(examProfiles, {
      fields: [practiceSubmissions.examProfileId],
      references: [examProfiles.id],
    }),
  }),
);

export const studyPlansRelations = relations(studyPlans, ({ one }) => ({
  user: one(users, {
    fields: [studyPlans.userId],
    references: [users.id],
  }),
  examProfile: one(examProfiles, {
    fields: [studyPlans.examProfileId],
    references: [examProfiles.id],
  }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
  examProfile: one(examProfiles, {
    fields: [progress.examProfileId],
    references: [examProfiles.id],
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ExamProfile = typeof examProfiles.$inferSelect;
export type NewExamProfile = typeof examProfiles.$inferInsert;
export type Assessment = typeof assessments.$inferSelect;
export type NewAssessment = typeof assessments.$inferInsert;
export type PracticeSubmission = typeof practiceSubmissions.$inferSelect;
export type NewPracticeSubmission = typeof practiceSubmissions.$inferInsert;
export type StudyPlan = typeof studyPlans.$inferSelect;
export type NewStudyPlan = typeof studyPlans.$inferInsert;
export type ProgressRecord = typeof progress.$inferSelect;
export type NewProgressRecord = typeof progress.$inferInsert;
export type Feedback = typeof feedback.$inferSelect;
export type NewFeedback = typeof feedback.$inferInsert;
