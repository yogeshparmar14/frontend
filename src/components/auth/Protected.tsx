"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux';
import type { Role } from '@/features/auth/authSlice';

export default function Protected({ children, role }: { children: React.ReactNode; role?: Role }) {
  const router = useRouter();
  const { user, accessToken } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!accessToken) {
      router.replace('/login');
      return;
    }
    if (role && user && user.role !== role) {
      router.replace('/');
    }
  }, [accessToken, role, user, router]);

  if (!accessToken) return null;
  if (role && user && user.role !== role) return null;
  return <>{children}</>;
}
