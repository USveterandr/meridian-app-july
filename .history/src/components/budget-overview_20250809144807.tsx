import { AlertCircle } from "lucide-react";

export function BudgetOverview() {
  const budgetItems = [
    {
      category: "Healthcare",
      spent: 150,
      budget: 200,
      status: "close",
      statusText: "Close to Limit",
    },
    {
      category: "Entertainment",
      spent: 285,
      budget: 300,
      status: "over",
      statusText: "Over Budget",
      hasAlert: true,
    },
    {
      category: "Shopping",
      spent: 520,
      budget: 400,
      status: "over",
      statusText: "Over Budget",
      hasAlert: true,
    },
    {
      category: "Transportation",
      spent: 420,
      budget: 500,
      status: "close",
      statusText: "Close to Limit",
    },
    {
      category: "Food",
      spent: 720,
      budget: 800,
      status: "over",
      statusText: "Over Budget",
      hasAlert: true,
    },
  ];

  const getProgressWidth = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "over":
        return "text-red-600";
      case "close":
        return "text-orange-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
      <div className="space-y-4">
        {budgetItems.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{item.category}</span>
                {item.hasAlert && <AlertCircle className="w-4 h-4 text-red-500" />}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  ${item.spent} / ${item.budget}
                </div>
                <div className={`text-xs ${getStatusColor(item.status)}`}>
                  {item.statusText}
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  item.status === "over" ? "bg-red-500" : 
                  item.status === "close" ? "bg-orange-500" : "bg-green-500"
                }`}
                style={{ width: `${getProgressWidth(item.spent, item.budget)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}