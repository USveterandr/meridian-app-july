import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';
import { DashboardHeader } from '@/components/dashboard-header';
import { WelcomeSection } from '@/components/welcome-section';

// Placeholder for user authentication logic
// In a real app, you'd get the user session from a cookie or auth library
const getUser = async () => {
  // Simulate a logged-in user for now
  // Replace with actual authentication logic
  return { id: 'user-id-placeholder', email: 'user@example.com' };
};

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login'); // Redirect to login if user is not authenticated
  }

  // Placeholder for fetching user's subscription tier
  // In a real application, you would fetch this from your database
  const subscriptionTier = 'free'; // Default to 'free' for now

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <DashboardHeader />
      <div className="px-4 py-6">
        <WelcomeSection />
        <div className="mt-8">
          <DashboardClient user={user} subscriptionTier={subscriptionTier} />
        </div>
      </div>
    </div>
  );
}
