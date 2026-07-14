import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, type User } from "@/lib/db/schema";

type NeonAuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export async function syncUserFromNeonAuth(neonUser: NeonAuthUser): Promise<User> {
  const existing = await db.query.users.findFirst({
    where: eq(users.neonAuthUserId, neonUser.id),
  });

  const name = neonUser.name ?? null;

  if (existing) {
    if (existing.email !== neonUser.email || existing.name !== name) {
      const [updated] = await db
        .update(users)
        .set({
          email: neonUser.email,
          name,
        })
        .where(eq(users.id, existing.id))
        .returning();

      return updated;
    }

    return existing;
  }

  const [created] = await db
    .insert(users)
    .values({
      neonAuthUserId: neonUser.id,
      email: neonUser.email,
      name,
    })
    .returning();

  return created;
}

export async function syncUserFromSession(session: {
  user: NeonAuthUser;
}): Promise<User> {
  return syncUserFromNeonAuth(session.user);
}
