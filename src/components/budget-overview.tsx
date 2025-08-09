import { AlertCircle, Shield, Target, TrendingDown, Flame } from "lucide-react";

export function BudgetOverview() {
  const budgetItems = [
    {
      category: "Healthcare",
      spent: 150,
      budget: 200,
      status: "close",
      statusText: "Close to Limit",
      icon: Shield,
      achievement: "Health Guardian",
    },
    {
      category: "Entertainment",
      spent: 285,
      budget: 300,
      status: "over",
      statusText: "Over Budget",
      hasAlert: true,
      icon: Flame,
      achievement: "Fun Seeker",
    },
    {
      category: "Shopping",
      spent: 520,
      budget: 400,
      status: "over",
      statusText: "Over Budget",
      hasAlert: true,
      icon: Target,
      achievement: "Deal Hunter",
    },
    {
      category: "Transportation",
      spent: 420,
      budget: 500,
      status: "close",
      statusText: "Close to Limit",
      icon: TrendingDown,
      achievement: "Road Warrior",
    },
    {
      category: "Food",
      spent: 720,
      budget: 800,
      status: "good",
      statusText: "On Track",
      icon: Shield,
      achievement: "Nutrition Master",
    },
  ];

  const getProgressWidth = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "over":
        return "text-red-400";
      case "close":
        return "text-orange-400";
      default:
        return "text-emerald-400";
    }
  };

  const getProgressGradient = (status: string) => {
    switch (status) {
      case "over":
        return "from-red-500 to-pink-500";
      case "close":
        return "from-orange-500 to-yellow-500";
      default:
        return "from-emerald-500 to-teal-500";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-y-16 -translate-x-16"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Budget Mastery
          </h3>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            <span className="text-xs font-medium text-blue-300">5 Categories</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {budgetItems.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getProgressGradient(item.status)} bg-opacity-20 flex items-center justify-center`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">{item.category}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      {item.hasAlert && <AlertCircle className="w-3 h-3 text-red-400" />}
                      <span className="text-xs text-purple-300">{item.achievement}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    ${item.spent} / ${item.budget}
                  </div>
                  <div className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.statusText}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressGradient(item.status)} relative overflow-hidden`}
                    style={{ width: `${getProgressWidth(item.spent, item.budget)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute -top-1 right-0 text-xs text-slate-400 font-medium">
                  {Math.round(getProgressWidth(item.spent, item.budget))}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-200">Budget Challenge</p>
              <p className="text-xs text-emerald-300 mt-1">Stay under budget in 3+ categories</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-400">2/5</div>
              <div className="text-xs text-emerald-300">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}