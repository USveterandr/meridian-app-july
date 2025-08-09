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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <DashboardHeader />
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
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