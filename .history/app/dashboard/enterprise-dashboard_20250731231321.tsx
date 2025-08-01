'use client';

interface EnterpriseDashboardProps {
  user: { id: string; email: string };
}

export default function EnterpriseDashboard({ user }: EnterpriseDashboardProps) {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-sm bg-purple-50">
      <h3 className="text-lg font-semibold text-purple-800">Enterprise Tier Dashboard</h3>
      <p>Welcome, {user.email}! This is your Enterprise tier dashboard.</p>
      <div className="mt-4">
        <h4 className="font-medium text-purple-700">All Pro Features, Plus:</h4>
        <ul className="list-disc pl-5 mt-2">
          <li>Unlimited property views</li>
          <li>API access for data integration</li>
          <li>Custom report generation</li>
          <li>Dedicated account manager</li>
          <li>Priority support</li>
          <li>Co-branded landing pages</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-purple-700">Enterprise Analytics Portal</h4>
        <p>Comprehensive data analytics and custom reporting tools.</p>
        {/* Placeholder for advanced analytics portal */}
        <div className="mt-2 p-2 bg-white rounded border">
          Enterprise analytics portal will be integrated here.
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-purple-700">Account Management</h4>
        <p>Manage your team, roles, and permissions.</p>
        {/* Placeholder for account management features */}
        <div className="mt-2 p-2 bg-white rounded border">
          Team management interface will be here.
        </div>
      </div>
    </div>
  );
}
