import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowRight, Loader2, Shield, Link2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

export default function WithdrawScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const [investmentType, setInvestmentType] = useState<string>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Current investment balances (in a real app, this would come from an API)
  const balances = {
    daily: 1236.24,
    monthly: 51000,
    lumpsum: 65000
  };
  
  const handleWithdrawAll = () => {
    if (!investmentType) {
      toast({
        title: "Please select an investment type first",
        variant: "destructive"
      });
      return;
    }
    
    switch (investmentType) {
      case "daily":
        setWithdrawalAmount(balances.daily.toString());
        break;
      case "monthly":
        setWithdrawalAmount(balances.monthly.toString());
        break;
      case "lumpsum":
        setWithdrawalAmount(balances.lumpsum.toString());
        break;
    }
  };
  
  const handleWithdraw = async () => {
    if (!investmentType) {
      toast({
        title: "Please select an investment type",
        variant: "destructive"
      });
      return;
    }
    
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
      toast({
        title: "Please enter a valid withdrawal amount",
        variant: "destructive"
      });
      return;
    }
    
    const maxAmount = investmentType === "daily" 
      ? balances.daily 
      : investmentType === "monthly" 
        ? balances.monthly 
        : balances.lumpsum;
    
    if (parseFloat(withdrawalAmount) > maxAmount) {
      toast({
        title: "Insufficient balance",
        description: `You can withdraw up to ${formatCurrency(maxAmount)}`,
        variant: "destructive"
      });
      return;
    }
    
    if (!withdrawalMethod) {
      toast({
        title: "Please select a withdrawal method",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Withdrawal initiated successfully!",
        description: `${formatCurrency(parseFloat(withdrawalAmount))} will be transferred within 24 hours.`,
        variant: "default"
      });
      
      // Navigate back to dashboard after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error processing withdrawal",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatCurrency = (value: number) => {
    return "₹" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const getInvestmentTypeLabel = (type: string) => {
    switch (type) {
      case "daily": return "Daily Savings";
      case "monthly": return "Monthly Investment";
      case "lumpsum": return "Lump Sum Investment";
      default: return "";
    }
  };
  
  return (
    <>
      <Head>
        <title>Withdraw Funds - 2PC Savings App</title>
        <meta name='description' content='Withdraw from your investment' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Withdraw Funds
            </h1>
          </div>
          
          <Card className="mb-6 border border-blue-100">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Balances</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Savings</span>
                  <span className="font-medium text-gray-800">{formatCurrency(balances.daily)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Investment</span>
                  <span className="font-medium text-gray-800">{formatCurrency(balances.monthly)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lump Sum Investment</span>
                  <span className="font-medium text-gray-800">{formatCurrency(balances.lumpsum)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select investment type
                  </label>
                  <Select
                    value={investmentType}
                    onValueChange={setInvestmentType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Savings</SelectItem>
                      <SelectItem value="monthly">Monthly Investment</SelectItem>
                      <SelectItem value="lumpsum">Lump Sum Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Enter amount to withdraw
                    </label>
                    <button 
                      onClick={handleWithdrawAll}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <Link2 className="h-3 w-3 mr-1" />
                      Withdraw all
                    </button>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="w-full"
                  />
                  {investmentType && (
                    <p className="text-xs text-gray-500 mt-1">
                      Available: {formatCurrency(
                        investmentType === "daily" 
                          ? balances.daily 
                          : investmentType === "monthly" 
                            ? balances.monthly 
                            : balances.lumpsum
                      )}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select withdrawal method
                  </label>
                  <Select
                    value={withdrawalMethod}
                    onValueChange={setWithdrawalMethod}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose withdrawal method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">UPI ID</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleWithdraw}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Withdraw Now
                <ArrowRight size={18} />
              </>
            )}
          </Button>
          
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
            <Shield size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Withdrawals processed within 1 working day. Capital remains protected.
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start gap-2">
            <AlertCircle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-yellow-700">
              Withdrawing before the end of your investment term may affect your returns.
            </p>
          </div>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}