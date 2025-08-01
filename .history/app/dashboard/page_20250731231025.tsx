import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server'; // Assuming you have a Supabase client setup
import { DashboardClient } from './dashboard-client'; // We will create this client component next

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login'); // Redirect to login if user is not authenticated
  }

  // Placeholder for fetching user's subscription tier
  // In a real application, you would fetch this from your database
  const subscriptionTier = 'free'; // Default to 'free' for now

  return (
    <div>
      <h1>Welcome to your Dashboardh1>
      <DashboardClient user={user} subscriptionTier={subscriptionTier} />
    </div>
  );
}
