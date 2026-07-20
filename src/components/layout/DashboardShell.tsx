import { AppMobileNav } from "./AppMobileNav";
import { AppSidebar } from "./AppSidebar";

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <AppSidebar className="hidden md:flex" />
        <div className="flex min-h-screen flex-1 flex-col pb-24 md:pb-0">
          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
      <AppMobileNav className="md:hidden" />
    </div>
  );
}
