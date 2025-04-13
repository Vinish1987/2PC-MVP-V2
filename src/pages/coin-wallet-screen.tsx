
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowDown, 
  ArrowUp, 
  Sparkles,
  Plus,
  Minus
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

type ActivityItem = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  time: string;
};

type GroupedActivities = {
  [key: string]: ActivityItem[];
};

export default function CoinWalletScreen() {
  const router = useRouter();
  
  // Mock data for coin balance and transactions
  const coinBalance = 122;
  const recentActivity: ActivityItem[] = [
    {
      id: "coin1",
      type: "credit",
      amount: 2,
      description: "from ₹100 UPI",
      date: "Today",
      time: "10:45 AM"
    },
    {
      id: "coin2",
      type: "debit",
      amount: 25,
      description: "Reinvested",
      date: "Today",
      time: "09:30 AM"
    },
    {
      id: "coin3",
      type: "credit",
      amount: 4,
      description: "from QR Payment",
      date: "Yesterday",
      time: "06:15 PM"
    },
    {
      id: "coin4",
      type: "credit",
      amount: 10,
      description: "from ₹500 UPI",
      date: "Yesterday",
      time: "11:20 AM"
    },
    {
      id: "coin5",
      type: "debit",
      amount: 50,
      description: "Withdrawn to Bank",
      date: "Mar 29, 2025",
      time: "03:45 PM"
    }
  ];
  
  // Group transactions by date
  const groupedActivity = recentActivity.reduce<GroupedActivities>((groups, activity) => {
    if (!groups[activity.date]) {
      groups[activity.date] = [];
    }
    groups[activity.date].push(activity);
    return groups;
  }, {});
  
  const handleWithdrawToBank = () => {
    // In a real app, this would navigate to a withdrawal flow
    alert("Navigating to withdraw coins to bank...");
  };
  
  const handleReinvest = () => {
    // In a real app, this would navigate to a reinvestment flow
    alert("Navigating to reinvest coins...");
  };
  
  return (
    <>
      <Head>
        <title>Coin Wallet - 2PC Savings App</title>
        <meta name="description" content="Manage your earned coins" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20">
        <div className="w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="mr-auto"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-[#3A2F78] mr-auto">
              Coin Wallet
            </h1>
          </div>
          
          {/* Main Coin Balance Card */}
          <Card className="mb-6 border-0 shadow-lg overflow-hidden rounded-2xl relative">
            <div className="absolute top-2 left-2">
              <Sparkles size={20} className="text-[#FFD700] opacity-70" />
            </div>
            <div className="absolute bottom-2 right-2">
              <Sparkles size={20} className="text-[#FFD700] opacity-70" />
            </div>
            <CardContent className="p-6 text-white bg-gradient-to-br from-[#5E5ADB] to-[#8B87F8]">
              <h2 className="text-lg font-bold mb-3">Your Coin Balance</h2>
              
              <div className="flex items-center justify-center my-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl text-[#FFD700]">🪙</span>
                  <div className="text-center">
                    <div className="text-3xl font-bold animate-pulse">
                      {coinBalance}
                    </div>
                    <div className="text-white/80 text-sm">
                      = ₹{coinBalance}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button 
                  className="flex-1 bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white border-0 py-4"
                  onClick={handleWithdrawToBank}
                >
                  <ArrowDown size={16} className="mr-2" />
                  Withdraw
                </Button>
                <Button 
                  className="flex-1 bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white border border-white/20 py-4"
                  onClick={handleReinvest}
                >
                  <ArrowUp size={16} className="mr-2" />
                  Reinvest
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity Section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#3A2F78] mb-3">Recent Activity</h2>
            
            <div className="space-y-4">
              {Object.entries(groupedActivity).map(([date, activities]) => (
                <div key={date}>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{date}</h3>
                  
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <Card key={activity.id} className="border-0 shadow-sm rounded-xl overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                activity.type === "credit" 
                                  ? "bg-green-100" 
                                  : "bg-red-100"
                              }`}>
                                {activity.type === "credit" ? (
                                  <div className="flex items-center">
                                    <span className="text-green-600 mr-0.5">🟢</span>
                                    <Plus size={14} className="text-green-600" />
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <span className="text-red-600 mr-0.5">🔴</span>
                                    <Minus size={14} className="text-red-600" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">
                                  {activity.type === "credit" ? "+" : "–"}{activity.amount} Coins {activity.description}
                                </p>
                                <p className="text-xs text-gray-500">{activity.time}</p>
                              </div>
                            </div>
                            <div className={`font-medium ${
                              activity.type === "credit" 
                                ? "text-green-600" 
                                : "text-red-600"
                            }`}>
                              {activity.type === "credit" ? "+" : "–"}{activity.amount}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer Tip */}
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-4 bg-[#D8D5F5]">
              <div className="flex items-start gap-3">
                <div className="text-[#5E5ADB] mt-0.5">
                  💡
                </div>
                <p className="text-sm text-[#3A2F78]">
                  Use <span className="font-medium">twopc@ybl</span> for UPI and earn more Coins!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}
