import { Plus, TrendingUp } from "lucide-react";

export function WelcomeSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Isaac</h2>
        <p className="text-gray-600 mt-1">Here's your financial overview for today</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="bg-yellow-100 px-4 py-2 rounded-full">
          <span className="text-sm font-medium text-yellow-800">⚡ 75/100 - Good</span>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Expense</span>
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total Balance</span>
          <span className="text-green-600 text-sm">$</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">$218,829.7</div>
        <div className="flex items-center space-x-1 mt-1">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600">+2.5% from last month</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Monthly Subscriptions</span>
          <span className="text-red-500 text-sm">📊</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">$105.95</div>
        <div className="text-sm text-gray-600 mt-1">5 active subscriptions</div>
      </div>
    </div>
  );
}