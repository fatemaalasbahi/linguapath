import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { getPostAuthRedirect } from "@/lib/auth/redirects";
import { syncUserFromSession } from "@/lib/auth/sync-user";

export const dynamic = "force-dynamic";

export default async function AuthRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = await auth.getSession();

  if (session?.user) {
    const appUser = await syncUserFromSession(session);
    redirect(await getPostAuthRedirect(appUser.id));
  }

  return <>{children}</>;
}
