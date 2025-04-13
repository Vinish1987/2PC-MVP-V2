import React, { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, ArrowRight, Info, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BottomNavigation from "@/components/BottomNavigation";

export default function LumpSumReturnsPreviewScreen() {
  const router = useRouter();
  const { amount, duration } = router.query;
  
  const investmentAmount = useMemo(() => {
    return typeof amount === "string" ? parseFloat(amount) : 0;
  }, [amount]);
  
  const investmentDuration = useMemo(() => {
    return typeof duration === "string" ? parseInt(duration) : 12;
  }, [duration]);
  
  // Calculate year-by-year growth with 2% monthly returns (compounded)
  const yearlyBreakdown = useMemo(() => {
    const breakdown = [];
    let currentAmount = investmentAmount;
    
    // Calculate for 3 years maximum
    const yearsToShow = Math.min(3, Math.ceil(investmentDuration / 12));
    
    for (let year = 1; year <= yearsToShow; year++) {
      let yearlyAmount = currentAmount;
      
      // Compound monthly for each year (12 months)
      for (let month = 1; month <= 12; month++) {
        yearlyAmount = yearlyAmount * 1.02; // 2% monthly growth
      }
      
      breakdown.push({
        year,
        startAmount: currentAmount,
        endAmount: yearlyAmount,
        growth: yearlyAmount - currentAmount
      });
      
      currentAmount = yearlyAmount;
    }
    
    return breakdown;
  }, [investmentAmount, investmentDuration]);
  
  // Calculate traditional FD returns (assuming 6% annual)
  const fdReturns = useMemo(() => {
    const years = investmentDuration / 12;
    return investmentAmount * Math.pow(1.06, years);
  }, [investmentAmount, investmentDuration]);
  
  const finalAmount = useMemo(() => {
    return yearlyBreakdown.length > 0 
      ? yearlyBreakdown[yearlyBreakdown.length - 1].endAmount 
      : investmentAmount;
  }, [yearlyBreakdown, investmentAmount]);
  
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
        <title>Lump Sum Growth Forecast - 2PC Savings App</title>
        <meta name='description' content='Preview your lump sum investment growth' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Your Lump Sum Growth Forecast
            </h1>
            <p className="text-gray-600 mt-2">
              One-time investment of {formatCurrency(investmentAmount)} for {getDurationText(investmentDuration)}
            </p>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Growth Over Time</h2>
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
                      <th className="text-left py-2 font-medium text-gray-600">Time Period</th>
                      <th className="text-right py-2 font-medium text-gray-600">Growth Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyBreakdown.map((item) => (
                      <tr key={item.year} className="border-b border-gray-100">
                        <td className="py-3 text-gray-800">{item.year} {item.year === 1 ? "Year" : "Years"}</td>
                        <td className="py-3 text-right">
                          <div className="text-gray-800 font-medium">
                            {formatCurrency(item.endAmount)}
                          </div>
                          <div className="text-xs text-green-600">
                            +{formatCurrency(item.growth)} growth
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Investment Comparison</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">With 2PC</span>
                    <span className="text-sm font-bold text-blue-600">{formatCurrency(finalAmount)}</span>
                  </div>
                  <Progress value={100} className="h-3 bg-gray-100" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Traditional FD</span>
                    <span className="text-sm font-medium text-gray-700">{formatCurrency(fdReturns)}</span>
                  </div>
                  <Progress 
                    value={(fdReturns / finalAmount) * 100} 
                    className="h-3 bg-gray-100" 
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-blue-800 font-medium text-center">
                    {formatCurrency(investmentAmount)} invested will become {formatCurrency(finalAmount)} in {getDurationText(investmentDuration)} with 2PC
                  </p>
                  <p className="text-sm text-blue-600 mt-1 text-center">
                    Traditional FD would return only {formatCurrency(fdReturns)}
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
              Back to Edit Amount/Duration
            </Button>
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
            <Shield size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Fixed 2% monthly return with full capital protection
            </p>
          </div>
        </div>
      </main>
    </>
  );
}