import React, { useState, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  Search, 
  PiggyBank, 
  Calendar, 
  IndianRupee, 
  ArrowDown, 
  Award,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";

// Mock transaction data with more variety
const mockTransactions = [
  {
    id: "tx1",
    type: "credit",
    category: "monthly",
    amount: 5000,
    description: "₹5000 Added to Monthly Investment",
    subtext: "2% Return Applied",
    date: "March 31, 2025",
    time: "10:45 AM"
  },
  {
    id: "tx2",
    type: "debit",
    category: "withdrawal",
    amount: 1000,
    description: "₹1000 Withdrawn from Daily Savings",
    subtext: null,
    date: "March 30, 2025",
    time: "02:15 PM"
  },
  {
    id: "tx3",
    type: "credit",
    category: "daily",
    amount: 500,
    description: "₹500 Added to Daily Savings",
    subtext: null,
    date: "March 30, 2025",
    time: "09:00 AM"
  },
  {
    id: "tx4",
    type: "credit",
    category: "rewards",
    amount: 250,
    description: "₹250 Reward Bonus",
    subtext: "Referral Program",
    date: "March 29, 2025",
    time: "11:30 AM"
  },
  {
    id: "tx5",
    type: "credit",
    category: "lumpsum",
    amount: 10000,
    description: "₹10000 Added to Lump Sum Investment",
    subtext: null,
    date: "March 28, 2025",
    time: "03:45 PM"
  },
  {
    id: "tx6",
    type: "credit",
    category: "daily",
    amount: 500,
    description: "₹500 Added to Daily Savings",
    subtext: null,
    date: "March 28, 2025",
    time: "09:00 AM"
  },
  {
    id: "tx7",
    type: "credit",
    category: "rewards",
    amount: 120,
    description: "₹120 Interest Earned",
    subtext: "2% Return Applied",
    date: "March 27, 2025",
    time: "12:00 PM"
  },
  {
    id: "tx8",
    type: "credit",
    category: "daily",
    amount: 500,
    description: "₹500 Added to Daily Savings",
    subtext: null,
    date: "March 27, 2025",
    time: "09:00 AM"
  }
];

export default function TransactionHistoryScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  
  // Filter transactions based on selected category and search query
  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions;
    
    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(tx => tx.category === activeFilter);
    }
    
    // Apply search filter if search query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.description.toLowerCase().includes(query) || 
        (tx.subtext && tx.subtext.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [activeFilter, searchQuery]);
  
  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, typeof filteredTransactions> = {};
    
    // Helper to get relative date label
    const getDateLabel = (dateStr: string) => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const todayStr = today.toLocaleDateString("en-IN", { 
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      
      const yesterdayStr = yesterday.toLocaleDateString("en-IN", { 
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      
      if (dateStr === todayStr) return "Today";
      if (dateStr === yesterdayStr) return "Yesterday";
      return dateStr;
    };
    
    // Group transactions
    filteredTransactions.forEach(tx => {
      const dateLabel = getDateLabel(tx.date);
      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(tx);
    });
    
    return groups;
  }, [filteredTransactions]);
  
  // Get transaction icon based on category
  const getTransactionIcon = (category: string) => {
    switch (category) {
      case "daily":
        return <PiggyBank className="h-5 w-5 text-green-600" />;
      case "monthly":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "lumpsum":
        return <IndianRupee className="h-5 w-5 text-purple-600" />;
      case "withdrawal":
        return <ArrowDown className="h-5 w-5 text-red-600" />;
      case "rewards":
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return category === "credit" 
          ? <ArrowDownLeft className="h-5 w-5 text-green-600" />
          : <ArrowUpRight className="h-5 w-5 text-red-600" />;
    }
  };
  
  return (
    <>
      <Head>
        <title>Transaction History - 2PC Savings App</title>
        <meta name='description' content='View your transaction history' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Transaction History
            </h1>
            <div className="flex items-center gap-2">
              {showSearch ? (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                >
                  <X size={18} />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowSearch(true)}
                >
                  <Search size={18} />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </div>
          </div>
          
          {showSearch && (
            <div className="mb-4 animate-fadeIn">
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          )}
          
          <div className="mb-6">
            <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="lumpsum" className="text-xs">Lump Sum</TabsTrigger>
                <TabsTrigger value="withdrawal" className="text-xs">Withdrawal</TabsTrigger>
                <TabsTrigger value="rewards" className="text-xs">Rewards</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <PiggyBank className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No activity yet</h3>
              <p className="text-gray-500 max-w-xs">
                Start saving today to see your transaction history here!
              </p>
              <Button 
                className="mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/investment-setup")}
              >
                Start Saving
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([dateLabel, transactions]) => (
                <div key={dateLabel}>
                  <h2 className="text-sm font-medium text-gray-500 mb-2">{dateLabel}</h2>
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <Card key={transaction.id} className="border border-gray-200 overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                transaction.type === "credit" 
                                  ? "bg-green-100" 
                                  : "bg-red-100"
                              }`}>
                                {getTransactionIcon(transaction.category)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{transaction.description}</p>
                                {transaction.subtext && (
                                  <p className="text-xs text-blue-600">{transaction.subtext}</p>
                                )}
                                <p className="text-xs text-gray-500">{transaction.date} – {transaction.time}</p>
                              </div>
                            </div>
                            <div className={`font-medium ${
                              transaction.type === "credit" 
                                ? "text-green-600" 
                                : "text-red-600"
                            }`}>
                              {transaction.type === "credit" ? "₹+" : "₹–"}{transaction.amount}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <BottomNavigation />
    </>
  );
}