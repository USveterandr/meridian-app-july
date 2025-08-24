'use client';

import FreeDashboard from './free-dashboard';
import ProDashboard from './pro-dashboard';
import EnterpriseDashboard from './enterprise-dashboard';
import { ActiveSubscriptions } from '@/components/active-subscriptions';
import { RecentTransactions } from '@/components/recent-transactions';
import { Investments } from '@/components/investments';

interface User {
  id: string;
  email: string;
}

interface DashboardClientProps {
  user: User;
  subscriptionTier: string;
}

export default function DashboardClient({ user, subscriptionTier }: DashboardClientProps) {
  return (
    <div className="space-y-6">
      {/* Financial Dashboard Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActiveSubscriptions />
        <Investments />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-2">Subscription Tier</h3>
          <p className="text-purple-200 mb-4">Your current tier: <span className="font-semibold capitalize text-emerald-400">{subscriptionTier}</span></p>
          
          {subscriptionTier === 'free' && <FreeDashboard user={user} />}
          {subscriptionTier === 'pro' && <ProDashboard user={user} />}
          {subscriptionTier === 'enterprise' && <EnterpriseDashboard user={user} />}

          {subscriptionTier !== 'free' && subscriptionTier !== 'pro' && subscriptionTier !== 'enterprise' && (
            <p className="mt-4 text-red-400">Invalid subscription tier detected. Please contact support.</p>
          )}
        </div>
      </div>
    </div>
  );
}
