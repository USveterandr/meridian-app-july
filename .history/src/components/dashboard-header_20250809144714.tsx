import { Menu } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Budgetwise</h1>
        </div>
        <button className="p-2">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
}