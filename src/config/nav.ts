import type { Role } from '@/features/auth/authSlice';

export type NavChild = { label: string; href: string };
export type NavEntry = {
  label: string;
  icon?: 'dashboard' | 'bag' | 'store' | 'stack' | 'user';
  href?: string; // if present, acts as a direct link
  children?: NavChild[]; // if present, acts as a collapsible group
};

export const navByRole: Record<Role, NavEntry[]> = {
  Admin: [
    { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
    {
      label: 'Order',
      icon: 'bag',
      children: [
        { label: 'To Be Submitted', href: '#' },
        { label: 'Orders Submitted', href: '#' },
        { label: 'Completed Order', href: '#' },
        { label: 'Abnormal Orders', href: '#' },
      ],
    },
    { label: 'Marketplace', icon: 'store', children: [] },
    { label: 'Store', icon: 'store', href: '#' },
    { label: 'Stock', icon: 'stack', href: '#' },
    { label: 'Personal', icon: 'user', href: '#' },
  ],
  User: [
    { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
    {
      label: 'Order',
      icon: 'bag',
      children: [
        { label: 'To Be Submitted', href: '#' },
        { label: 'Orders Submitted', href: '#' },
        { label: 'Completed Order', href: '#' },
        { label: 'Abnormal Orders', href: '#' },
      ],
    },
    { label: 'Marketplace', icon: 'store', children: [] },
    { label: 'Store', icon: 'store', href: '#' },
    { label: 'Stock', icon: 'stack', href: '#' },
    { label: 'Personal', icon: 'user', href: '#' },
  ],
};
