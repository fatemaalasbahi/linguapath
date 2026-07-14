import Link from "next/link";
import { AuthLoading, AuthView } from "@neondatabase/auth-ui";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { ProtectedRouteSkeleton } from "@/components/auth/ProtectedRouteSkeleton";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <div className="mx-auto w-full max-w-md px-4 sm:px-0">
        <AuthHeader />
      </div>

      <main className="flex flex-1 items-center justify-center px-4 pb-12">
        <AuthCard>
          <div className="space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Create your account
              </h1>
              <p className="text-sm leading-relaxed text-neutral-600">
                Start preparing for your language exam.
              </p>
            </div>

            <AuthLoading>
              <ProtectedRouteSkeleton />
            </AuthLoading>
            <AuthView path="sign-up" />

            <p className="text-center text-sm text-neutral-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
              >
                Sign in
              </Link>
            </p>
          </div>
        </AuthCard>
      </main>
    </div>
  );
}
