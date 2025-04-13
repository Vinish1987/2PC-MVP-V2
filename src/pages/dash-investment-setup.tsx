
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PiggyBank, Calendar, IndianRupee, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";

export default function DashInvestmentSetupScreen() {
  const router = useRouter();
  const [dailyAmount, setDailyAmount] = useState<string>("");
  const [monthlyAmount, setMonthlyAmount] = useState<string>("");
  const [lumpSumAmount, setLumpSumAmount] = useState<string>("");
  const [monthlyDuration, setMonthlyDuration] = useState<string>("12");
  const [lumpSumDuration, setLumpSumDuration] = useState<string>("12");
  const [goalName, setGoalName] = useState<string>("");
  
  const handleDailyAmountSelect = (amount: string) => {
    setDailyAmount(amount);
  };
  
  const handleSetupDailySavings = () => {
    if (!dailyAmount) {
      alert("Please select or enter a daily savings amount");
      return;
    }
    router.push({
      pathname: "/daily-returns-preview",
      query: { amount: dailyAmount }
    });
  };
  
  const handleSetupMonthlyInvestment = () => {
    if (!monthlyAmount) {
      alert("Please enter a monthly investment amount");
      return;
    }
    router.push({
      pathname: "/monthly-returns-preview",
      query: { 
        amount: monthlyAmount,
        duration: monthlyDuration,
        goalName: goalName || undefined
      }
    });
  };
  
  const handleSetupLumpSum = () => {
    if (!lumpSumAmount) {
      alert("Please enter a lump sum investment amount");
      return;
    }
    router.push({
      pathname: "/lump-sum-returns-preview",
      query: { 
        amount: lumpSumAmount,
        duration: lumpSumDuration
      }
    });
  };

  return (
    <>
      <Head>
        <title>Investment Setup - 2PC Savings App</title>
        <meta name="description" content="Setup your investment plan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20">
        <div className="w-full max-w-md mx-auto mt-8 mb-16">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] font-inter">
              Grow Your Wealth, Safely and Simply
            </h1>
            <p className="text-[#5E5ADB] mt-2 text-base font-medium">
              Choose how you want to invest and grow your money
            </p>
          </div>
          
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-[#F2F1FF] p-1 rounded-full">
              <TabsTrigger 
                value="daily" 
                className="flex items-center gap-2 rounded-full data-[state=active]:bg-white data-[state=active]:text-[#5E5ADB] data-[state=active]:font-medium data-[state=active]:border-[#5E5ADB] data-[state=active]:shadow-sm"
              >
                <PiggyBank size={16} />
                <span>Daily</span>
              </TabsTrigger>
              <TabsTrigger 
                value="monthly" 
                className="flex items-center gap-2 rounded-full data-[state=active]:bg-white data-[state=active]:text-[#5E5ADB] data-[state=active]:font-medium data-[state=active]:border-[#5E5ADB] data-[state=active]:shadow-sm"
              >
                <Calendar size={16} />
                <span>Monthly</span>
              </TabsTrigger>
              <TabsTrigger 
                value="lumpsum" 
                className="flex items-center gap-2 rounded-full data-[state=active]:bg-white data-[state=active]:text-[#5E5ADB] data-[state=active]:font-medium data-[state=active]:border-[#5E5ADB] data-[state=active]:shadow-sm"
              >
                <IndianRupee size={16} />
                <span>Lump Sum</span>
              </TabsTrigger>
            </TabsList>
            
            <Card className="border-0 rounded-2xl shadow-md overflow-hidden">
              <CardContent className="p-6">
                <TabsContent value="daily" className="mt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-3">
                      How much would you like to save daily?
                    </label>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[10, 20, 50, 100, 250, 500].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={dailyAmount === amount.toString() ? "default" : "outline"}
                          onClick={() => handleDailyAmountSelect(amount.toString())}
                          className={`relative rounded-lg transition-all duration-200 ${
                            dailyAmount === amount.toString() 
                              ? "bg-[#5E5ADB] text-white" 
                              : "border-[#5E5ADB] text-[#5E5ADB]"
                          }`}
                        >
                          <span className="font-medium">₹{amount}</span>
                        </Button>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <Input
                        id="dailyAmount"
                        type="number"
                        placeholder="Or enter custom amount"
                        value={dailyAmount}
                        onChange={(e) => setDailyAmount(e.target.value)}
                        className="w-full rounded-lg border-gray-200 text-[#5E5ADB]"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSetupDailySavings}
                      className="w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white py-6 h-12 rounded-lg font-medium"
                    >
                      Setup Daily Savings
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-3">
                      Enter amount you want to invest monthly
                    </label>
                    
                    <div className="mb-4">
                      <Input
                        id="monthlyAmount"
                        type="number"
                        placeholder="Monthly investment amount"
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(e.target.value)}
                        className="w-full rounded-lg border-gray-200 text-[#5E5ADB]"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-3">
                        Investment Duration
                      </label>
                      <Select
                        value={monthlyDuration}
                        onValueChange={setMonthlyDuration}
                      >
                        <SelectTrigger className="w-full rounded-lg border-gray-200">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">1 year</SelectItem>
                          <SelectItem value="24">2 years</SelectItem>
                          <SelectItem value="36">3 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-3">
                        Name your goal (optional)
                      </label>
                      <Input
                        placeholder="e.g. Trip to Italy 2025"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        className="w-full rounded-lg border-gray-200 text-[#5E5ADB]"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSetupMonthlyInvestment}
                      className="w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white py-6 h-12 rounded-lg font-medium"
                    >
                      Setup Monthly Investment
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="lumpsum" className="mt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-3">
                      Enter your one-time investment amount
                    </label>
                    
                    <div className="mb-4">
                      <Input
                        id="lumpSumAmount"
                        type="number"
                        placeholder="One-time investment amount"
                        value={lumpSumAmount}
                        onChange={(e) => setLumpSumAmount(e.target.value)}
                        className="w-full rounded-lg border-gray-200 text-[#5E5ADB]"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-[#2D2D2D] mb-3">
                        Investment Duration
                      </label>
                      <Select
                        value={lumpSumDuration}
                        onValueChange={setLumpSumDuration}
                      >
                        <SelectTrigger className="w-full rounded-lg border-gray-200">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">1 year</SelectItem>
                          <SelectItem value="24">2 years</SelectItem>
                          <SelectItem value="36">3 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      onClick={handleSetupLumpSum}
                      className="w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white py-6 h-12 rounded-lg font-medium"
                    >
                      Setup Lump Sum
                    </Button>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
            
            <div className="mt-4 p-4 bg-[#EEF3FF] border border-[#EEF3FF] rounded-lg flex items-start gap-2">
              <Info size={18} className="text-[#5E5ADB] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5E5ADB]">
                2% monthly return guaranteed. Capital safe like FD.
              </p>
            </div>
          </Tabs>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}
