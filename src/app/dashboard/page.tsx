"use client";
import Protected from "@/components/auth/Protected";
import ProtectedWithShell from "@/components/auth/ProtectedWithShell";
import { useMeQuery, useLogoutMutation } from "@/features/auth/authApi";

export default function DashboardPage() {
  const { data, isLoading, isError } = useMeQuery();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  return (
    <ProtectedWithShell>
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button
            onClick={() => logout()}
            disabled={loggingOut}
            className="px-3 py-2 rounded bg-gray-900 text-white"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-600">Failed to load profile</p>}
        {data?.success && (
          <div className="space-y-1">
            <p><span className="font-medium">ID:</span> {data.data.id}</p>
            <p><span className="font-medium">Email:</span> {data.data.email}</p>
            <p><span className="font-medium">Name:</span> {data.data.name ?? "-"}</p>
            <p><span className="font-medium">Role:</span> {data.data.role}</p>
          </div>
        )}
      </div>
    </ProtectedWithShell>
  );
}
