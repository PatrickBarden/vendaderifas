import { Routes, Route } from 'react-router-dom';
import { AppProviders } from '@/app/providers/AppProviders';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminCampaignsPage } from '@/features/admin/pages/AdminCampaignsPage';
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { CampaignDetailsPage } from '@/features/campaigns/pages/CampaignDetailsPage';
import { CampaignsPage } from '@/features/campaigns/pages/CampaignsPage';
import { UserDashboardPage } from '@/features/dashboard/pages/UserDashboardPage';
import { HomePage } from '@/features/home/pages/HomePage';
import { WinnersPage } from '@/features/winners/pages/WinnersPage';

export function AppRouter() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaign/:id" element={<CampaignDetailsPage />} />
          <Route path="winners" element={<WinnersPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="campaigns" element={<AdminCampaignsPage />} />
        </Route>
      </Routes>
    </AppProviders>
  );
}
