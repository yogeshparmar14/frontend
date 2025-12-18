'use client';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/redux';

export default function Header() {
  const { user } = useAppSelector((s) => s.auth);
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <Link href="/" className="font-semibold">
        SportNexus
      </Link>
      <div className="text-sm">{user?.name ?? user?.email}</div>
    </header>
  );
}
