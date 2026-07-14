import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";

export async function getSession() {
  const { data: session, error } = await auth.getSession();
  return { session: session ?? null, error };
}

export async function requireSession() {
  const { session } = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return session;
}
