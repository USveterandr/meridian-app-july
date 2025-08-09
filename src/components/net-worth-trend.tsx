import { TrendingUp } from "lucide-react";

export function NetWorthTrend() {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Net Worth Trend</h3>
      </div>
      
      <div className="relative h-32">
        <svg className="w-full h-full" viewBox="0 0 300 100">
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <line x1="0" y1="25" x2="300" y2="25" stroke="#e5e7eb" strokeWidth="1"/>
          <line x1="0" y1="50" x2="300" y2="50" stroke="#e5e7eb" strokeWidth="1"/>
          <line x1="0" y1="75" x2="300" y2="75" stroke="#e5e7eb" strokeWidth="1"/>
          
          {/* Trend line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points="0,80 50,70 100,65 150,60 200,55 250,50 300,45"
          />
          
          {/* Area under curve */}
          <polygon
            fill="url(#trendGradient)"
            points="0,80 50,70 100,65 150,60 200,55 250,50 300,45 300,100 0,100"
          />
          
          {/* Data points */}
          <circle cx="0" cy="80" r="3" fill="#10b981"/>
          <circle cx="50" cy="70" r="3" fill="#10b981"/>
          <circle cx="100" cy="65" r="3" fill="#10b981"/>
          <circle cx="150" cy="60" r="3" fill="#10b981"/>
          <circle cx="200" cy="55" r="3" fill="#10b981"/>
          <circle cx="250" cy="50" r="3" fill="#10b981"/>
          <circle cx="300" cy="45" r="3" fill="#10b981"/>
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 text-xs text-gray-500">100000</div>
        <div className="absolute left-0 top-1/4 text-xs text-gray-500">75000</div>
        <div className="absolute left-0 top-1/2 text-xs text-gray-500">50000</div>
        <div className="absolute left-0 top-3/4 text-xs text-gray-500">25000</div>
        <div className="absolute left-0 bottom-0 text-xs text-gray-500">0</div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  );
}