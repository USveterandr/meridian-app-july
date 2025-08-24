import { TrendingUp } from "lucide-react";

export function Investments() {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Investments</span>
        <TrendingUp className="w-4 h-4 text-blue-600" />
      </div>
      <div className="text-3xl font-bold text-gray-900">$95,647.5</div>
      <div className="flex items-center space-x-1 mt-1">
        <TrendingUp className="w-4 h-4 text-blue-600" />
        <span className="text-sm text-blue-600">+12.3% portfolio gain</span>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Budget Used</span>
          <span className="text-purple-600 text-sm">🎯</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">42.8%</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-gray-800 h-2 rounded-full" style={{ width: "42.8%" }} />
        </div>
      </div>
    </div>
  );
}