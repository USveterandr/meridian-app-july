'use client';

interface ProDashboardProps {
  user: { id: string; email: string };
}

export default function ProDashboard({ user }: ProDashboardProps) {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-sm bg-blue-50">
      <h3 className="text-lg font-semibold text-blue-800">Pro Tier Dashboard</h3>
      <p>Welcome, {user.email}! This is your Pro tier dashboard.</p>
      <div className="mt-4">
        <h4 className="font-medium text-blue-700">Features Available:</h4>
        <ul className="list-disc pl-5 mt-2">
          <li>View up to 50 properties</li>
          <li>Advanced search and filters</li>
          <li>Access to all public and pro reports</li>
          <li>Direct contact with agents for listed properties</li>
          <li>Market trend analysis</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-blue-700">Pro Analytics</h4>
        <p>Get insights into property values and market trends.</p>
        {/* Placeholder for analytics charts or data */}
        <div className="mt-2 p-2 bg-white rounded border">
          Analytics charts will be displayed here.
        </div>
      </div>
    </div>
  );
}
