import React, { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, ArrowRight, Info, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BottomNavigation from "@/components/BottomNavigation";

export default function MonthlyReturnsPreviewScreen() {
  const router = useRouter();
  const { amount, duration, goalName } = router.query;
  
  const monthlyAmount = useMemo(() => {
    return typeof amount === "string" ? parseFloat(amount) : 0;
  }, [amount]);
  
  const investmentDuration = useMemo(() => {
    return typeof duration === "string" ? parseInt(duration) : 12;
  }, [duration]);
  
  // Calculate month-by-month growth with 2% monthly returns
  const monthlyBreakdown = useMemo(() => {
    const breakdown = [];
    let totalInvestment = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthlyInvestment = monthlyAmount;
      const interestEarned = (totalInvestment + monthlyInvestment) * 0.02;
      const newTotal = totalInvestment + monthlyInvestment + interestEarned;
      
      breakdown.push({
        month,
        monthlyInvestment,
        previousTotal: totalInvestment,
        interestEarned,
        newTotal
      });
      
      totalInvestment = newTotal;
    }
    
    return breakdown;
  }, [monthlyAmount]);
  
  const totalWithReturns = useMemo(() => {
    return monthlyBreakdown.length > 0 
      ? monthlyBreakdown[monthlyBreakdown.length - 1].newTotal 
      : 0;
  }, [monthlyBreakdown]);
  
  const totalWithoutReturns = useMemo(() => {
    return monthlyAmount * 12;
  }, [monthlyAmount]);
  
  const handleContinue = () => {
    router.push("/upi-setup");
  };
  
  const handleChangeAmount = () => {
    router.push("/investment-setup");
  };
  
  const formatCurrency = (value: number) => {
    return "₹" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const getDurationText = (months: number) => {
    switch (months) {
      case 6: return "6 months";
      case 12: return "1 year";
      case 24: return "2 years";
      case 36: return "3 years";
      default: return months + " months";
    }
  };
  
  return (
    <>
      <Head>
        <title>Monthly Returns Preview - 2PC Savings App</title>
        <meta name='description' content='Preview your monthly investment returns' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Your Investment Growth Plan
            </h1>
            <p className="text-gray-600 mt-2">
              {goalName ? `For your goal: ${goalName} • ` : ""}
              {formatCurrency(monthlyAmount)} monthly for {getDurationText(investmentDuration)}
            </p>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Month-by-Month Breakdown</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-blue-600"
                  onClick={handleChangeAmount}
                >
                  <Edit2 size={16} />
                  <span>Change Amount</span>
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-600">Month</th>
                      <th className="text-right py-2 font-medium text-gray-600">Investment + Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyBreakdown.map((item) => (
                      <tr key={item.month} className="border-b border-gray-100">
                        <td className="py-3 text-gray-800">Month {item.month}</td>
                        <td className="py-3 text-right">
                          <div className="text-gray-800">
                            {formatCurrency(item.monthlyInvestment)} + 2% = {formatCurrency(item.newTotal)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.month > 1 && `2% on ${formatCurrency(item.previousTotal + item.monthlyInvestment)}`}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Total After 12 Months</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">With 2PC</span>
                    <span className="text-sm font-bold text-blue-600">{formatCurrency(totalWithReturns)}</span>
                  </div>
                  <Progress value={100} className="h-3 bg-gray-100" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Without 2PC</span>
                    <span className="text-sm font-medium text-gray-700">{formatCurrency(totalWithoutReturns)}</span>
                  </div>
                  <Progress 
                    value={(totalWithoutReturns / totalWithReturns) * 100} 
                    className="h-3 bg-gray-100" 
                  />
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-start gap-2">
                  <div className="text-green-600 mt-0.5 flex-shrink-0">
                    <Info size={16} />
                  </div>
                  <p className="text-sm text-green-700">
                    You'll earn an extra {formatCurrency(totalWithReturns - totalWithoutReturns)} with 2PC's 2% monthly returns!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2"
          >
            Continue to Payment Setup
            <ArrowRight size={18} />
          </Button>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={handleChangeAmount}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Modify Amount or Duration
            </Button>
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
            <Shield size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              2% Monthly Return | Capital Safe like FD
            </p>
          </div>
        </div>
      </main>
    </>
  );
}