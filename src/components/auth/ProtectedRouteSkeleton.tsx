export function ProtectedRouteSkeleton() {
  return (
    <div
      className="space-y-4 animate-pulse"
      aria-busy="true"
      aria-label="Loading authentication"
    >
      <div className="h-10 rounded-md bg-neutral-100" />
      <div className="h-10 rounded-md bg-neutral-100" />
      <div className="h-10 rounded-md bg-neutral-100" />
      <div className="h-10 rounded-md bg-primary-100" />
    </div>
  );
}
