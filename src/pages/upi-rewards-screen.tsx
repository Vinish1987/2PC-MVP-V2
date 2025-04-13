import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Coins, 
  Copy, 
  Share2, 
  Gift, 
  ShoppingBag, 
  CreditCard,
  ChevronRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

export default function UPIRewardsScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("earn");
  
  const handleCopyUPI = () => {
    navigator.clipboard.writeText("twopc@ybl");
    toast({
      title: "UPI ID Copied!",
      description: "twopc@ybl has been copied to clipboard",
      variant: "default"
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Earn 2% Coins with 2PC UPI",
        text: "Use twopc@ybl for payments and earn coins worth ₹ every time!",
        url: "https://2pc.app/rewards"
      }).catch(err => {
        console.error("Share failed:", err);
      });
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support sharing",
        variant: "destructive"
      });
    }
  };
  
  return (
    <>
      <Head>
        <title>UPI Rewards - 2PC Savings App</title>
        <meta name="description" content="Earn and redeem coins with 2PC UPI" />
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
              UPI Rewards
            </h1>
          </div>
          
          {/* Coins Summary Card */}
          <Card className="mb-6 border-0 shadow-lg overflow-hidden rounded-2xl relative">
            <div className="absolute top-2 left-2">
              <Sparkles size={20} className="text-[#FFD700] opacity-70" />
            </div>
            <div className="absolute bottom-2 right-2">
              <Sparkles size={20} className="text-[#FFD700] opacity-70" />
            </div>
            <div className="absolute top-2 right-2">
              <Sparkles size={16} className="text-[#FFD700] opacity-70" />
            </div>
            <div className="absolute bottom-2 left-2">
              <Sparkles size={16} className="text-[#FFD700] opacity-70" />
            </div>
            <CardContent className="p-6 text-white bg-gradient-to-br from-[#5E5ADB] to-[#8B87F8]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Your Coins Balance</h2>
                <div className="flex items-center gap-1">
                  <span className="text-2xl text-[#FFD700]">🪙</span>
                  <span className="text-2xl font-bold">122</span>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm mb-4">
                <div className="flex justify-between items-center">
                  <span>Coins Value</span>
                  <span className="font-medium">₹122</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span>Earned This Month</span>
                  <span className="font-medium">₹122</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-white hover:bg-white/90 text-[#5E5ADB]"
                  onClick={() => setActiveTab("redeem")}
                >
                  Redeem Coins
                </Button>
                <Button 
                  className="flex-1 bg-[#FFA500] hover:bg-[#FFA500]/90 text-white border-0"
                  onClick={() => setActiveTab("earn")}
                >
                  Earn More
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs */}
          <Tabs defaultValue="earn" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full bg-[#E4E1FF]/50">
              <TabsTrigger value="earn" className="text-[#3A2F78] data-[state=active]:bg-white">Earn Coins</TabsTrigger>
              <TabsTrigger value="redeem" className="text-[#3A2F78] data-[state=active]:bg-white">Redeem Coins</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeTab === "earn" ? (
            <div className="space-y-6">
              {/* UPI ID Card */}
              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-[#3A2F78] mb-3">Your 2PC UPI ID</h3>
                  
                  <div className="bg-[#E4E1FF]/70 p-4 rounded-lg flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2 text-[#FFD700]">🪙</span>
                      <span className="font-medium text-[#5E5ADB]">twopc@ybl</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCopyUPI}
                        className="border-[#5E5ADB]"
                      >
                        <Copy size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleShare}
                        className="border-[#5E5ADB]"
                      >
                        <Share2 size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Use this UPI ID for all your payments and earn 2% back in coins. 
                    1 Coin = ₹1 that you can reinvest or withdraw.
                  </p>
                </CardContent>
              </Card>
              
              {/* Ways to Earn */}
              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-[#3A2F78] mb-3">Ways to Earn Coins</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-[#E4E1FF] p-2 rounded-full mt-0.5">
                        <ShoppingBag size={16} className="text-[#5E5ADB]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#3A2F78]">Pay with 2PC UPI</p>
                        <p className="text-sm text-gray-600">Earn 2% coins on all payments made using twopc@ybl</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-[#E4E1FF] p-2 rounded-full mt-0.5">
                        <Gift size={16} className="text-[#5E5ADB]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#3A2F78]">Refer Friends</p>
                        <p className="text-sm text-gray-600">Get 50 coins for each friend who joins 2PC</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-[#E4E1FF] p-2 rounded-full mt-0.5">
                        <CreditCard size={16} className="text-[#5E5ADB]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#3A2F78]">Bill Payments</p>
                        <p className="text-sm text-gray-600">Extra 1% coins on utility & credit card bills</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Recent Earnings */}
              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#3A2F78]">Recent Earnings</h3>
                    <Button variant="ghost" size="sm" className="text-xs text-[#5E5ADB]">
                      View All
                    </Button>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between py-2 border-b border-[#E4E1FF]">
                      <div>
                        <p className="font-medium text-[#3A2F78]">Grocery Payment</p>
                        <p className="text-xs text-gray-500">Mar 30, 2025</p>
                      </div>
                      <div className="flex items-center text-green-600 font-medium">
                        <span className="text-sm mr-1 text-[#FFD700]">🪙</span>
                        +10
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-2 border-b border-[#E4E1FF]">
                      <div>
                        <p className="font-medium text-[#3A2F78]">Mobile Recharge</p>
                        <p className="text-xs text-gray-500">Mar 28, 2025</p>
                      </div>
                      <div className="flex items-center text-green-600 font-medium">
                        <span className="text-sm mr-1 text-[#FFD700]">🪙</span>
                        +2
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-[#3A2F78]">Electricity Bill</p>
                        <p className="text-xs text-gray-500">Mar 25, 2025</p>
                      </div>
                      <div className="flex items-center text-green-600 font-medium">
                        <span className="text-sm mr-1 text-[#FFD700]">🪙</span>
                        +15
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* View Coin Wallet Button - New addition */}
              <Card className='border border-[#5E5ADB] shadow-sm rounded-xl overflow-hidden'>
                <CardContent className='p-4 bg-white'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <span className='text-xl text-[#FFD700]'>🪙</span>
                      <div>
                        <p className='font-medium text-[#5E5ADB]'>View My Coin Wallet</p>
                        <p className='text-sm text-gray-600'>You have 122 Coins</p>
                      </div>
                    </div>
                    <Button 
                      variant='outline'
                      onClick={() => router.push('/coin-wallet-screen')}
                      className='border-[#5E5ADB] text-[#5E5ADB]'
                    >
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Redeem Options */}
              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-[#3A2F78] mb-4">Redeem Your Coins</h3>
                  
                  <ul className="space-y-3">
                    <li>
                      <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E4E1FF] hover:bg-[#E4E1FF]/30">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#E4E1FF] p-2 rounded-full">
                            <Coins className="h-4 w-4 text-[#5E5ADB]" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-[#3A2F78]">Add to Investment</p>
                            <p className="text-xs text-gray-500">Boost your savings with coins</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-[#5E5ADB]" />
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E4E1FF] hover:bg-[#E4E1FF]/30">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#E4E1FF] p-2 rounded-full">
                            <CreditCard className="h-4 w-4 text-[#5E5ADB]" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-[#3A2F78]">Bank Transfer</p>
                            <p className="text-xs text-gray-500">Withdraw coins to your bank</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-[#5E5ADB]" />
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E4E1FF] hover:bg-[#E4E1FF]/30">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#E4E1FF] p-2 rounded-full">
                            <Gift className="h-4 w-4 text-[#5E5ADB]" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-[#3A2F78]">Gift Cards</p>
                            <p className="text-xs text-gray-500">Amazon, Flipkart & more</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-[#5E5ADB]" />
                      </button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Redemption History */}
              <Card className="border-0 shadow-md rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#3A2F78]">Redemption History</h3>
                    <Button variant="ghost" size="sm" className="text-xs text-[#5E5ADB]">
                      View All
                    </Button>
                  </div>
                  
                  <div className="text-center py-6">
                    <div className="bg-[#E4E1FF] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-[#5E5ADB]" />
                    </div>
                    <p className="text-[#3A2F78]">No redemptions yet</p>
                    <p className="text-sm text-gray-500 mt-1">Your redemption history will appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Redeem CTA Button */}
              <Button 
                className="w-full bg-[#FFA500] hover:bg-[#FFA500]/90 text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <Coins className="h-5 w-5" />
                Redeem Your 122 Coins Now
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <BottomNavigation />
    </>
  );
}