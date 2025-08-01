'use client';

interface FreeDashboardProps {
  user: { id: string; email: string };
}

export default function FreeDashboard({ user }: FreeDashboardProps) {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Free Tier Dashboard</h3>
      <p>Welcome, {user.email}! This is your Free tier dashboard.</p>
      <div className="mt-4">
        <h4 className="font-medium">Features Available:</h4>
        <ul className="list-disc pl-5 mt-2">
          <li>View up to 5 properties</li>
          <li>Basic search filters</li>
          <li>Access to public reports</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium">Upgrade to Pro</h4>
        <p>Unlock more properties, advanced filters, and exclusive reports.</p>
        {/* Add a button or link to upgrade here later */}
      </div>
    </div>
  );
}
