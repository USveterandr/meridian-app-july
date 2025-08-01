'use client';

import FreeDashboard from './free-dashboard';
import ProDashboard from './pro-dashboard';
import EnterpriseDashboard from './enterprise-dashboard';

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
    <div>
      <h2 className="text-xl font-bold">Dashboard for {user.email}</h2>
      <p className="text-gray-600">Your current subscription tier is: <span className="font-semibold capitalize">{subscriptionTier}</span></p>
      
      {subscriptionTier === 'free' && <FreeDashboard user={user} />}
      {subscriptionTier === 'pro' && <ProDashboard user={user} />}
      {subscriptionTier === 'enterprise' && <EnterpriseDashboard user={user} />}

      {subscriptionTier !== 'free' && subscriptionTier !== 'pro' && subscriptionTier !== 'enterprise' && (
        <p className="mt-4 text-red-500">Invalid subscription tier detected. Please contact support.</p>
      )}
    </div>
  );
}
