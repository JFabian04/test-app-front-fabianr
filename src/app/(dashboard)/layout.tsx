import { ReactNode } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function DashboardLayoutWrapper({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
