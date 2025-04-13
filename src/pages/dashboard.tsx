import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowUpRight, 
  PiggyBank, 
  TrendingUp, 
  Calendar, 
  Settings, 
  Plus, 
  ArrowDown, 
  RefreshCw,
  ChevronRight,
  BarChart3,
  Coins,
  DollarSign
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function DashboardScreen() {
  const router = useRouter();
  const [quickSaveAmount, setQuickSaveAmount] = useState<number>(20);
  
  const handleQuickSaveAmountSelect = (amount: number) => {
    setQuickSaveAmount(amount);
  };
  
  const handleQuickSave = () => {
    alert(`Quick save of ₹${quickSaveAmount} added to your daily savings!`);
  };

  const handleAddMore = (planType: string) => {
    router.push('/add-more');
  };
  
  const handleWithdraw = () => {
    router.push('/withdraw');
  };

  const handleClaimCoins = () => {
    router.push('/upi-rewards-screen');
  };

  const handleSmartLoan = () => {
    router.push('/smart-loan-screen');
  };

  const handleLoanHistory = () => {
    router.push('/loan-history-screen');
  };
  
  return (
    <>
      <Head>
        <title>Dashboard - 2PC Savings App</title>
        <meta name='description' content='Your 2PC savings dashboard' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          {/* Top Greeting */}
          <div className='flex justify-between items-start mb-6'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                Hello, Vinish
              </h1>
              <p className='text-green-600 font-medium mt-1 flex items-center'>
                <TrendingUp className='h-4 w-4 mr-1' />
                Your Investment Growth: 2.5% this month
              </p>
            </div>
            <Button variant='ghost' size='icon'>
              <Settings className='h-5 w-5' />
            </Button>
          </div>
          
          {/* Daily Savings Card */}
          <Card className='mb-6 border-0 shadow-md rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
                  <PiggyBank className='h-6 w-6 mr-2 text-[#5E5ADB]' />
                  Daily Savings
                </h2>
                <span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full'>
                  Active
                </span>
              </div>
              
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Saved Today</span>
                  <span className='font-medium'>₹20</span>
                </div>
                
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Total Saved</span>
                  <span className='font-medium'>₹1,236.24</span>
                </div>
                
                <div>
                  <div className='flex justify-between mb-1'>
                    <span className='text-sm text-gray-600'>Goal Progress</span>
                    <span className='text-sm text-gray-600'>20% of ₹8,208.20</span>
                  </div>
                  <Progress value={20} className='h-2 bg-gray-100' />
                </div>
                
                <div className='flex gap-2 pt-2'>
                  <Button variant='outline' size='sm' className='flex-1 border-[#5E5ADB] text-[#5E5ADB]' onClick={() => handleAddMore('daily')}>
                    <Plus className='h-4 w-4 mr-1' />
                    Add More
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1 border-[#5E5ADB] text-[#5E5ADB]' onClick={handleWithdraw}>
                    <ArrowDown className='h-4 w-4 mr-1' />
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Monthly Recurring Investment Card */}
          <Card className='mb-6 border-0 shadow-md rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
                  <Calendar className='h-6 w-6 mr-2 text-[#5E5ADB]' />
                  Monthly Investment
                </h2>
                <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full'>
                  Active
                </span>
              </div>
              
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>This Month</span>
                  <span className='font-medium'>₹5,000</span>
                </div>
                
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Total So Far</span>
                  <span className='font-medium'>₹51,000</span>
                </div>
                
                <div>
                  <div className='flex justify-between mb-1'>
                    <span className='text-sm text-gray-600'>Goal Progress</span>
                    <span className='text-sm text-gray-600'>45% of ₹1,00,000</span>
                  </div>
                  <Progress value={45} className='h-2 bg-gray-100' />
                </div>
                
                <div className='flex gap-2 pt-2'>
                  <Button variant='outline' size='sm' className='flex-1 border-[#5E5ADB] text-[#5E5ADB]' onClick={() => handleAddMore('monthly')}>
                    <Plus className='h-4 w-4 mr-1' />
                    Add More
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1 border-[#5E5ADB] text-[#5E5ADB]' onClick={handleWithdraw}>
                    <ArrowDown className='h-4 w-4 mr-1' />
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lump Sum Investment Card */}
          <Card className='mb-6 border-0 shadow-md rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
                  <TrendingUp className='h-6 w-6 mr-2 text-[#5E5ADB]' />
                  Lump Sum Investment
                </h2>
                <span className='text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full'>
                  Active
                </span>
              </div>
              
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Amount Invested</span>
                  <span className='font-medium'>₹50,000</span>
                </div>
                
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Growth</span>
                  <span className='font-medium text-green-600'>₹15,000 return earned</span>
                </div>
                
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Next Return Date</span>
                  <span className='font-medium'>15 Nov 2024</span>
                </div>
                
                <div className='flex gap-2 pt-2'>
                  <Button variant='outline' size='sm' className='flex-1 border-[#5E5ADB] text-[#5E5ADB]' onClick={handleWithdraw}>
                    <ArrowDown className='h-4 w-4 mr-1' />
                    Withdraw
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1 border-[#5E5ADB] text-[#5E5ADB]'>
                    <RefreshCw className='h-4 w-4 mr-1' />
                    Reinvest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* UPI Rewards Card */}
          <Card className='mb-6 border-0 shadow-lg rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6 bg-[#5E5ADB] text-white'>
              <div className='flex items-start gap-4'>
                <div className='bg-white/20 p-3 rounded-full'>
                  <span className='text-2xl'>🪙</span>
                </div>
                <div className='flex-1'>
                  <h2 className='text-lg font-bold text-white mb-1'>
                    💰 Earn 2% Coins When You Pay via UPI
                  </h2>
                  <p className='text-white/80 text-sm mb-3'>
                    Use twopc@ybl for payments and earn Coins worth ₹ every time.
                  </p>
                  
                  <div className='bg-white/20 rounded-lg p-3 mb-4'>
                    <p className='text-white font-medium'>
                      Coins Earned This Month: 122 (₹122)
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleClaimCoins}
                    className='w-full bg-white hover:bg-white/90 text-[#5E5ADB] font-medium rounded-lg transition-all duration-200'
                  >
                    <Coins className='h-4 w-4 mr-2' />
                    Claim More Coins
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Coin Wallet Summary Card - New addition */}
          <Card className='mb-6 border-0 shadow-md rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6 bg-white'>
              <div className='flex items-start gap-4'>
                <div className='bg-[#E4E1FF] p-3 rounded-full'>
                  <span className='text-xl'>🪙</span>
                </div>
                <div className='flex-1'>
                  <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
                    💼 Coin Wallet
                  </h2>
                  <p className='text-gray-600 mt-1 mb-3'>
                    You've earned 122 Coins = ₹122
                  </p>
                  <Button 
                    variant='outline'
                    onClick={() => router.push('/coin-wallet-screen')}
                    className='border-[#5E5ADB] text-[#5E5ADB] hover:bg-[#5E5ADB]/10'
                  >
                    Open Wallet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Smart Loan Card */}
          <Card className='mb-6 border-0 shadow-md rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex items-start gap-4'>
                <div className='bg-[#E4E1FF] p-3 rounded-full'>
                  <DollarSign className='h-6 w-6 text-[#5E5ADB]' />
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <h2 className='text-lg font-semibold text-gray-800'>Smart Loans</h2>
                    <span className='text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full'>
                      New
                    </span>
                  </div>
                  <p className='text-gray-600 text-sm mt-1 mb-3'>
                    Borrow up to ₹10,000 against your investment. Repay from your monthly returns.
                  </p>
                  <div className='flex gap-2'>
                    <Button 
                      onClick={handleSmartLoan}
                      className='flex-1 bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white rounded-lg transition-all duration-200'
                    >
                      Apply for Loan
                    </Button>
                    <Button 
                      onClick={handleLoanHistory}
                      variant='outline'
                      className='flex-1 border-[#5E5ADB] text-[#5E5ADB] hover:bg-[#5E5ADB]/10 rounded-lg transition-all duration-200'
                    >
                      Loan History
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Growth Graph */}
          <Card className='mb-6 border-0 shadow-md rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold text-gray-800 flex items-center'>
                  <BarChart3 className='h-6 w-6 mr-2 text-[#5E5ADB]' />
                  Your Growth Over Time
                </h2>
                <Button variant='ghost' size='sm' className='text-xs text-[#5E5ADB]'>
                  View Details
                </Button>
              </div>
              
              <div className='h-40 bg-[#E4E1FF]/50 rounded-lg flex items-center justify-center border border-[#E4E1FF]'>
                <div className='text-center text-gray-500'>
                  <BarChart3 className='h-8 w-8 mx-auto mb-2 text-[#5E5ADB]/40' />
                  <p>Investment vs Returns Graph</p>
                  <p className='text-xs'>(Placeholder for actual chart)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Save Slider */}
          <Card className='mb-6 border-0 shadow-md rounded-xl overflow-hidden'>
            <CardContent className='p-4 sm:p-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Quick Save</h2>
              
              <div className='grid grid-cols-3 gap-2 mb-4'>
                {[10, 20, 50, 100, 250, 500].map((amount) => (
                  <Button
                    key={amount}
                    type='button'
                    variant={quickSaveAmount === amount ? 'default' : 'outline'}
                    onClick={() => handleQuickSaveAmountSelect(amount)}
                    className={`relative rounded-lg transition-all duration-200 ${
                      quickSaveAmount === amount 
                        ? 'bg-[#5E5ADB] text-white' 
                        : 'border-[#5E5ADB] text-[#5E5ADB]'
                    }`}
                  >
                    <span className='font-medium'>₹{amount}</span>
                  </Button>
                ))}
              </div>
              
              <Button 
                onClick={handleQuickSave}
                className='w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white rounded-lg py-3 transition-all duration-200'
              >
                <PiggyBank className='h-5 w-5 mr-2' />
                Quick Save ₹{quickSaveAmount}
              </Button>
            </CardContent>
          </Card>
          
          {/* Add New Investment Button */}
          <Button 
            onClick={() => router.push('/dash-investment-setup')}
            className='w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white py-4 rounded-lg flex items-center justify-center transition-all duration-200 text-base uppercase font-medium'
          >
            <Plus className='h-5 w-5 mr-2' />
            Add New Investment
          </Button>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}