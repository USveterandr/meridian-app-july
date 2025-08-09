import { Receipt, Smartphone, Target, TrendingUp, CreditCard, Zap, Award, Gem } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: Receipt,
      label: "Add Expense / Scan Receipt",
      reward: "+10 XP",
      color: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-500/25",
    },
    {
      icon: Smartphone,
      label: "Install on Device",
      reward: "+25 XP",
      color: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/25",
    },
    {
      icon: Target,
      label: "Set Budget Goal",
      reward: "+50 XP",
      color: "from-emerald-500 to-teal-500",
      shadowColor: "shadow-emerald-500/25",
    },
    {
      icon: TrendingUp,
      label: "Add Investment",
      reward: "+100 XP",
      color: "from-orange-500 to-red-500",
      shadowColor: "shadow-orange-500/25",
    },
    {
      icon: CreditCard,
      label: "Manage Subscriptions",
      reward: "+15 XP",
      color: "from-indigo-500 to-purple-500",
      shadowColor: "shadow-indigo-500/25",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Power Actions
          </h3>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full border border-yellow-400/30">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-medium text-yellow-300">Earn XP</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`group w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${action.color} hover:scale-[1.02] transition-all duration-300 ${action.shadowColor} shadow-lg relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-white block">{action.label}</span>
                  <div className="flex items-center space-x-1 mt-1">
                    <Zap className="w-3 h-3 text-yellow-300" />
                    <span className="text-xs text-yellow-200 font-medium">{action.reward}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Gem className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-200">Daily Challenge</p>
              <p className="text-xs text-purple-300 mt-1">Complete 3 actions today</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>
              <span className="text-xs text-purple-300 font-medium">1/3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}