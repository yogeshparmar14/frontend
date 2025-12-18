"use client";
import ProtectedWithShell from "@/components/auth/ProtectedWithShell";
import { useMeQuery } from "@/features/auth/authApi";

export default function AdminPage() {
  const { data } = useMeQuery();
  return (
    <ProtectedWithShell role="Admin">
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Admin</h1>
        {data?.success && (
          <p>Welcome, {data.data.name ?? data.data.email}! You have Admin access.</p>
        )}
      </div>
    </ProtectedWithShell>
  );
}
