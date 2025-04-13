
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield, Wallet, ArrowLeft, ArrowRight, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

export default function SmartLoanScreen() {
  const router = useRouter();
  const { toast } = useToast();
  
  // User's investment details (in a real app, this would come from an API)
  const totalInvestment = 50000;
  const maxLoanAmount = 10000;
  const minLoanAmount = 1000;
  const stepAmount = 1000;
  
  const [loanAmount, setLoanAmount] = useState<number>(5000);
  const [autoRepay, setAutoRepay] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  
  // Calculate repayment details
  const repaymentMonths = Math.ceil(loanAmount / 1000);
  const monthlyReturn = totalInvestment * 0.02; // 2% monthly return
  
  const handleSliderChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minLoanAmount && value <= maxLoanAmount) {
      setLoanAmount(value);
    }
  };
  
  const handleGetLoan = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsApproved(true);
      
      toast({
        title: "Loan Approved!",
        description: `₹${loanAmount} will be credited within 24 hours`,
        variant: "default"
      });
      
      // Navigate back to dashboard after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error processing loan request",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLoanHistory = () => {
    router.push('/loan-history-screen');
  };
  
  const formatCurrency = (value: number) => {
    return "₹" + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <>
      <Head>
        <title>Smart Loans - 2PC Savings App</title>
        <meta name="description" content="Take a loan against your investment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20">
        <div className="w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="mr-auto text-[#5E5ADB]"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3A2F78]">
              Smart Loans
            </h1>
            <p className="text-[#5E5ADB] mt-2">
              Borrow against your investment with no interest or EMIs
            </p>
          </div>
          
          {/* Eligibility Card */}
          <Card className="mb-6 border-0 shadow-lg overflow-hidden rounded-2xl relative">
            {isApproved && (
              <>
                <div className="absolute top-2 left-2">
                  <Sparkles size={20} className="text-[#FFD700] opacity-70" />
                </div>
                <div className="absolute bottom-2 right-2">
                  <Sparkles size={20} className="text-[#FFD700] opacity-70" />
                </div>
              </>
            )}
            <CardContent className="p-6 text-white bg-gradient-to-br from-[#5E5ADB] to-[#8B87F8]">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-3">Loan Eligibility</h2>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-white" />
                      You're eligible for {formatCurrency(maxLoanAmount)} loan
                    </p>
                    <p className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-white" />
                      Repay easily from your 2% monthly returns
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Loan Amount Card */}
          <Card className="mb-6 border-0 shadow-md rounded-2xl overflow-hidden">
            <CardContent className="p-5 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#E4E1FF] p-2 rounded-full">
                  <Wallet className="h-5 w-5 text-[#5E5ADB]" />
                </div>
                <h2 className="text-lg font-semibold text-[#3A2F78]">Select loan amount</h2>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[#5E5ADB]">Min: {formatCurrency(minLoanAmount)}</span>
                  <span className="text-sm text-[#5E5ADB]">Max: {formatCurrency(maxLoanAmount)}</span>
                </div>
                
                <Slider
                  id="loanAmount"
                  value={[loanAmount]}
                  min={minLoanAmount}
                  max={maxLoanAmount}
                  step={stepAmount}
                  onValueChange={handleSliderChange}
                  className="mb-4"
                />
                
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={handleInputChange}
                  min={minLoanAmount}
                  max={maxLoanAmount}
                  className="text-center text-lg font-bold text-[#5E5ADB] border-[#5E5ADB] mb-4"
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between p-3 bg-[#E4E1FF]/30 rounded-lg">
                  <div>
                    <Label htmlFor="auto-repay" className="font-medium text-[#3A2F78]">
                      Auto repay from returns
                    </Label>
                    <p className="text-sm text-[#5E5ADB]/70">
                      We'll use your monthly returns to repay the loan
                    </p>
                  </div>
                  <Switch 
                    id="auto-repay"
                    checked={autoRepay} 
                    onCheckedChange={setAutoRepay} 
                  />
                </div>
              </div>
              
              <div className="bg-[#E4E1FF]/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#3A2F78]">Monthly Return</span>
                  <span className="font-medium text-[#5E5ADB]">{formatCurrency(monthlyReturn)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#3A2F78]">Repayment Duration</span>
                  <span className="font-medium text-[#5E5ADB]">{repaymentMonths} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#3A2F78]">Total Loan Amount</span>
                  <span className="font-medium text-[#5E5ADB]">{formatCurrency(loanAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Get Loan Button */}
          <Button 
            onClick={handleGetLoan}
            className="w-full bg-[#FFA500] hover:bg-[#FFA500]/90 text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : isApproved ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Loan Approved!
              </>
            ) : (
              <>
                Get My Loan
                <ArrowRight size={18} />
              </>
            )}
          </Button>
          
          {/* Footer Pill */}
          <div className="mt-6 p-4 bg-white rounded-full shadow-sm flex items-center justify-center">
            <p className="text-sm text-[#3A2F78] font-medium text-center">
              No interest. No EMIs. Pay from your profits.
            </p>
          </div>
          
          {/* View Loan History Link */}
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={handleViewLoanHistory}
              className="text-[#5E5ADB] hover:text-[#5E5ADB]/80"
            >
              View your loan history
            </Button>
          </div>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}
