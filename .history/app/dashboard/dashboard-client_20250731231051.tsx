'use client';

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
      <h2>Dashboard for {user.email}</h2>
      <p>Your current subscription tier is: {subscriptionTier}</p>
      {/* Content will be rendered based on subscriptionTier */}
      {subscriptionTier === 'free' && <p>Free tier content goes here.</p>}
      {subscriptionTier === 'pro' && <p>Pro tier content goes here.</p>}
      {subscriptionTier === 'enterprise' && <p>Enterprise tier content goes here.</p>}
    </div>
  );
}
