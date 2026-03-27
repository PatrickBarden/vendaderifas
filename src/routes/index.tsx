import { Routes, Route } from 'react-router-dom';
import { AppProviders } from '@/app/providers/AppProviders';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminCampaignsPage } from '@/features/admin/pages/AdminCampaignsPage';
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage';
import { AdminPaymentsPage } from '@/features/admin/pages/AdminPaymentsPage';
import { AdminOrdersPage } from '@/features/admin/pages/AdminOrdersPage';
import { AdminReportsPage } from '@/features/admin/pages/AdminReportsPage';
import { AdminTicketsPage } from '@/features/admin/pages/AdminTicketsPage';
import { AdminUsersPage } from '@/features/admin/pages/AdminUsersPage';
import { RequireRole } from '@/features/auth/components/RequireRole';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { CampaignDetailsPage } from '@/features/campaigns/pages/CampaignDetailsPage';
import { CampaignsPage } from '@/features/campaigns/pages/CampaignsPage';
import { UserDashboardPage } from '@/features/dashboard/pages/UserDashboardPage';
import { HomePage } from '@/features/home/pages/HomePage';
import { WinnersPage } from '@/features/winners/pages/WinnersPage';
import { AboutPage } from '@/features/about/pages/AboutPage';

export function AppRouter() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaign/:id" element={<CampaignDetailsPage />} />
          <Route path="winners" element={<WinnersPage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireRole allowed={['admin']} redirectTo="/dashboard" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="campaigns" element={<AdminCampaignsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="tickets" element={<AdminTicketsPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>
        </Route>
      </Routes>
    </AppProviders>
  );
}
