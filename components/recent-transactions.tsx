import { AlertCircle, CheckCircle } from "lucide-react";

export function RecentTransactions() {
  const transactions = [
    {
      name: "Golden Corral: Weekend Dinner",
      description: "Buffet, Fountain Drink",
      amount: "-$22.56",
      category: "Food",
      date: "Aug 2",
      type: "expense",
    },
    {
      name: "Gaming shop",
      amount: "-$60",
      category: "Entertainment",
      date: "Jul 17",
      type: "expense",
    },
    {
      name: "Housing",
      amount: "-$3,500",
      category: "Housing",
      date: "Jul 17",
      type: "expense",
    },
    {
      name: "Purchase from Innova Centro",
      amount: "-$48",
      category: "Shopping",
      date: "Jul 16",
      type: "expense",
    },
    {
      name: "Pago de limpieza",
      amount: "-$1,000",
      category: "Housing",
      date: "Jul 4",
      type: "expense",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Food":
        return "bg-orange-100 text-orange-800";
      case "Entertainment":
        return "bg-purple-100 text-purple-800";
      case "Housing":
        return "bg-blue-100 text-blue-800";
      case "Shopping":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionIcon = (type: string) => {
    return type === "expense" ? (
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-4 h-4 text-red-600" />
      </div>
    ) : (
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-4 h-4 text-green-600" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-start space-x-3">
            {getTransactionIcon(transaction.type)}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900">{transaction.name}</div>
              {transaction.description && (
                <div className="text-sm text-gray-500">{transaction.description}</div>
              )}
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(transaction.category)}`}>
                  {transaction.category}
                </span>
                <span className="text-xs text-gray-500">{transaction.date}</span>
              </div>
            </div>
            <div className={`font-semibold ${
              transaction.type === "expense" ? "text-red-600" : "text-green-600"
            }`}>
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}