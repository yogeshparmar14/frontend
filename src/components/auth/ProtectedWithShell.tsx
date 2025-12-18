'use client';
import type { Role } from '@/features/auth/authSlice';
import Protected from '@/components/auth/Protected';
import AppShell from '@/components/layout/AppShell';

export default function ProtectedWithShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: Role;
}) {
  return (
    <Protected role={role}>
      <AppShell>{children}</AppShell>
    </Protected>
  );
}
