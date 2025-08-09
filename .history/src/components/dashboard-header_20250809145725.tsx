import { Menu, Bell, Crown, Sparkles } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="relative bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur-sm border-b border-slate-700/50 px-4 py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-indigo-600/5"></div>
      <div className="relative max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Meridian
            </h1>
            <p className="text-xs text-purple-300">Wealth Empire</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="relative p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
            <Bell className="w-5 h-5 text-purple-200" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
          </button>
          <button 
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-purple-200" />
          </button>
        </div>
      </div>
    </header>
  );
}