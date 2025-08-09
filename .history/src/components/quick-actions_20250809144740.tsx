import { Receipt, Smartphone, Target, TrendingUp, CreditCard } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: Receipt,
      label: "Add Expense / Scan Receipt",
    },
    {
      icon: Smartphone,
      label: "Install on Device",
    },
    {
      icon: Target,
      label: "Set Budget Goal",
    },
    {
      icon: TrendingUp,
      label: "Add Investment",
    },
    {
      icon: CreditCard,
      label: "Manage Subscriptions",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <action.icon className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}