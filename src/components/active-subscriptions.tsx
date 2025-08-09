import { ChevronRight } from "lucide-react";

export function ActiveSubscriptions() {
  const subscriptions = [
    {
      name: "Netflix",
      category: "Entertainment",
      price: "$15.99",
      initial: "N",
      bgColor: "bg-red-500",
    },
    {
      name: "Spotify",
      category: "Music",
      price: "$9.99",
      initial: "S",
      bgColor: "bg-green-500",
    },
    {
      name: "Dropbox",
      category: "Cloud Storage",
      price: "$11.99",
      initial: "D",
      bgColor: "bg-blue-500",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Subscriptions</h3>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-3">
        {subscriptions.map((subscription, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${subscription.bgColor} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-sm font-semibold">{subscription.initial}</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{subscription.name}</div>
                <div className="text-sm text-gray-500">{subscription.category}</div>
              </div>
            </div>
            <div className="font-semibold text-gray-900">{subscription.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}