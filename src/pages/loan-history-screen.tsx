import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

// Mock loan data - in a real app, this would come from an API
const mockLoans = [
  {
    id: "LOAN202403",
    dateTaken: "March 20, 2025",
    amount: 5000,
    repaymentPlan: {
      months: 5,
      monthlyAmount: 1000
    },
    repayments: [
      { month: "April", amount: 1000, status: "completed" },
      { month: "May", amount: 1000, status: "completed" },
      { month: "June", amount: 1000, status: "pending" },
      { month: "July", amount: 1000, status: "pending" },
      { month: "August", amount: 1000, status: "pending" }
    ],
    status: "active",
    progress: 40
  },
  {
    id: "LOAN202402",
    dateTaken: "February 10, 2025",
    amount: 10000,
    repaymentPlan: {
      months: 10,
      monthlyAmount: 1000
    },
    repayments: [
      { month: "February", amount: 1000, status: "completed" },
      { month: "March", amount: 1000, status: "completed" },
      { month: "April", amount: 1000, status: "completed" },
      { month: "May", amount: 1000, status: "completed" },
      { month: "June", amount: 1000, status: "completed" },
      { month: "July", amount: 1000, status: "completed" },
      { month: "August", amount: 1000, status: "completed" },
      { month: "September", amount: 1000, status: "completed" },
      { month: "October", amount: 1000, status: "completed" },
      { month: "November", amount: 1000, status: "completed" }
    ],
    status: "completed",
    progress: 100
  }
];

export default function LoanHistoryScreen() {
  const router = useRouter();
  
  // Calculate summary data
  const totalLoansTaken = mockLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const activeLoan = mockLoans.find(loan => loan.status === "active");
  const activeLoanAmount = activeLoan ? activeLoan.amount : 0;
  const activeLoanRemaining = activeLoan 
    ? activeLoan.amount - (activeLoan.repayments.filter(r => r.status === "completed").length * activeLoan.repaymentPlan.monthlyAmount) 
    : 0;
  
  const handleNewLoan = () => {
    router.push("/smart-loan-screen");
  };
  
  const formatCurrency = (value: number) => {
    return "₹" + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <>
      <Head>
        <title>Loan History - 2PC Savings App</title>
        <meta name='description' content='View your loan history and repayment timeline' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
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
            <h1 className="text-xl font-bold text-gray-800 mr-auto">
              Loan History
            </h1>
          </div>
          
          {/* Summary Card */}
          <Card className="mb-6 border-0 shadow-sm overflow-hidden bg-gradient-to-br from-navy-700 to-navy-800">
            <CardContent className="p-5 text-white">
              <h2 className="text-lg font-semibold mb-4">Loan Summary</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white/80">Total Loans Taken</p>
                  <p className="text-lg font-bold">{formatCurrency(totalLoansTaken)}</p>
                </div>
                
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white/80">Active Loan</p>
                  <p className="text-lg font-bold">{formatCurrency(activeLoanAmount)}</p>
                </div>
                
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white/80">Remaining</p>
                  <p className="text-lg font-bold">{formatCurrency(activeLoanRemaining)}</p>
                </div>
                
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-sm text-white/80">Repayment Type</p>
                  <p className="text-md font-medium">Auto from Returns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {mockLoans.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800">Repayment Timeline</h2>
              
              {mockLoans.map((loan) => (
                <Card key={loan.id} className="border border-gray-200 overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">Loan ID:</span>
                          <span className="text-sm font-medium">#{loan.id}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-gray-500">Date Taken:</span>
                          <span className="text-sm">{loan.dateTaken}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        loan.status === "active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {loan.status === "active" ? "Active" : "Completed"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-gray-600">Amount</span>
                        <p className="text-lg font-semibold">{formatCurrency(loan.amount)}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600">Repayment Plan</span>
                        <p className="font-medium">{loan.repaymentPlan.months} months ({formatCurrency(loan.repaymentPlan.monthlyAmount)}/month)</p>
                      </div>
                    </div>
                    
                    {loan.status === "active" && (
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{loan.progress}% repaid</span>
                          <span className="text-sm text-gray-600">{formatCurrency(loan.amount * (loan.progress / 100))} of {formatCurrency(loan.amount)}</span>
                        </div>
                        <Progress value={loan.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Repayments Made</h3>
                      <div className="space-y-2">
                        {loan.repayments.map((repayment, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-2">
                              {repayment.status === "completed" ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Clock className="h-4 w-4 text-amber-500" />
                              )}
                              <span className="text-gray-800">{repayment.month}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{formatCurrency(repayment.amount)}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                repayment.status === "completed" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-amber-100 text-amber-700"
                              }`}>
                                {repayment.status === "completed" ? "Paid" : "Pending"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No loans yet</h3>
                <p className="text-gray-600 mb-6">You haven't taken any loans from your investment yet.</p>
                
                <Button 
                  onClick={handleNewLoan}
                  className="bg-navy-700 hover:bg-navy-800 text-white"
                >
                  Need funds urgently? Get a Smart Loan
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Footer Notes */}
          <div className="mt-6 space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
              <AlertCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Your returns will resume after loan repayment is completed.
              </p>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                All loans are interest-free and repaid directly from your investment returns.
              </p>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}