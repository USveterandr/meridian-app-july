import { Plus, TrendingUp, Crown, Zap, Trophy, Star } from "lucide-react";

export function WelcomeSection() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <Crown className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Welcome back, Isaac
        </h2>
        <p className="text-purple-200 mt-1">Your wealth empire awaits your command</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 px-4 py-2 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 animate-pulse"></div>
          <div className="relative flex items-center space-x-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">Level 7 - Wealth Builder</span>
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
              <Star className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Expense</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-purple-200">Total Balance</span>
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-green-400 text-sm font-medium">+$12,450 this month</span>
            </div>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            $218,829.70
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">+2.5% from last month</span>
            <div className="flex-1 bg-slate-700/50 rounded-full h-2 ml-2">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -translate-y-12 -translate-x-12"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-purple-200">Monthly Subscriptions</span>
            <div className="bg-red-500/20 px-2 py-1 rounded-full">
              <span className="text-red-400 text-xs font-medium">5 Active</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">$105.95</div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Optimization potential: $23.50</span>
            <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">Optimize →</button>
          </div>
        </div>
      </div>
    </div>
  );
}