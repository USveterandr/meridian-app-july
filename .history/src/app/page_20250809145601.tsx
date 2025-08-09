import { DashboardHeader } from "@/components/dashboard-header";
import { WelcomeSection } from "@/components/welcome-section";
import { QuickActions } from "@/components/quick-actions";
import { FinancialOverview } from "@/components/financial-overview";
import { ActiveSubscriptions } from "@/components/active-subscriptions";
import { BudgetOverview } from "@/components/budget-overview";
import { RecentTransactions } from "@/components/recent-transactions";
import { NetWorthTrend } from "@/components/net-worth-trend";
import { Investments } from "@/components/investments";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Luxury background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-black/80"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <DashboardHeader />
      <main className="relative max-w-md mx-auto px-4 py-6 space-y-6">
        <WelcomeSection />
        <QuickActions />
        <FinancialOverview />
        <ActiveSubscriptions />
        <BudgetOverview />
        <Investments />
        <NetWorthTrend />
        <RecentTransactions />
      </main>
    </div>
  );
}