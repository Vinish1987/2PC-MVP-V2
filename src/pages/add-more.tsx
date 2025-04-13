import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PiggyBank, Plus, ArrowRight, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

export default function AddMoreScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Current investment details (in a real app, this would come from an API)
  const currentSavings = 1236.24;
  const goalAmount = 8208.20;
  
  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
  };
  
  const handleAddMore = async () => {
    if (!amount) {
      toast({
        title: "Please select or enter an amount",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedPlan) {
      toast({
        title: "Please select a plan to add to",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Amount added successfully!",
        description: `₹${amount} has been added to your ${selectedPlan}.`,
        variant: "default"
      });
      
      // Navigate back to dashboard after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error adding amount",
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
  
  return (
    <>
      <Head>
        <title>Add More to Your Investment - 2PC Savings App</title>
        <meta name='description' content='Top up your existing investment' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Add More to Your Investment
            </h1>
          </div>
          
          <Card className="mb-6 border border-blue-100">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <PiggyBank className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Current Investment</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">You've saved so far</span>
                  <span className="font-medium text-gray-800">{formatCurrency(currentSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your goal</span>
                  <span className="font-medium text-gray-800">{formatCurrency(goalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">How much would you like to add today?</h2>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[10, 20, 50, 100, 250, 500].map((presetAmount) => (
                  <Button
                    key={presetAmount}
                    type="button"
                    variant={amount === presetAmount.toString() ? "default" : "outline"}
                    onClick={() => handleAmountSelect(presetAmount.toString())}
                    className="relative"
                  >
                    <span className="font-medium">₹{presetAmount}</span>
                  </Button>
                ))}
              </div>
              
              <div className="mb-6">
                <Input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose which plan to add to
                </label>
                <Select
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Savings</SelectItem>
                    <SelectItem value="monthly">Monthly Investment</SelectItem>
                    <SelectItem value="lumpsum">Lump Sum Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleAddMore}
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
                Add Now
                <ArrowRight size={18} />
              </>
            )}
          </Button>
          
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
            <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Your next return will reflect this addition automatically.
            </p>
          </div>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}