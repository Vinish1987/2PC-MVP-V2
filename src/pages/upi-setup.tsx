import React, { useState, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Calendar, ArrowLeft, ArrowRight, Loader2, BadgeCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

export default function UPISetupScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const { amount, duration } = router.query;
  const [upiApp, setUpiApp] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Determine if we're coming from daily, monthly, or lump sum
  const investmentType = useMemo(() => {
    const path = router.asPath;
    if (path.includes("daily-returns")) return "daily";
    if (path.includes("monthly-returns")) return "monthly";
    if (path.includes("lump-sum")) return "lumpsum";
    return "daily"; // Default
  }, [router.asPath]);
  
  const investmentAmount = useMemo(() => {
    return typeof amount === "string" ? parseFloat(amount) : 0;
  }, [amount]);
  
  const investmentDuration = useMemo(() => {
    return typeof duration === "string" ? parseInt(duration) : 12;
  }, [duration]);
  
  // Format the start date (today + 1 day)
  const startDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }, []);
  
  const formatCurrency = (value: number) => {
    return "₹" + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const getInvestmentText = () => {
    switch (investmentType) {
      case "daily":
        return `You're saving ${formatCurrency(investmentAmount)} daily`;
      case "monthly":
        return `You're investing ${formatCurrency(investmentAmount)} monthly for ${getDurationText(investmentDuration)}`;
      case "lumpsum":
        return `You're investing ${formatCurrency(investmentAmount)} as a one-time payment`;
      default:
        return "";
    }
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
  
  const getDeductionText = () => {
    switch (investmentType) {
      case "daily":
        return `We'll auto-deduct ${formatCurrency(investmentAmount)} daily from your bank account starting ${startDate}.`;
      case "monthly":
        return `We'll auto-deduct ${formatCurrency(investmentAmount)} monthly from your bank account starting ${startDate}.`;
      case "lumpsum":
        return `We'll deduct ${formatCurrency(investmentAmount)} from your bank account on ${startDate}.`;
      default:
        return "";
    }
  };
  
  const handleSetupUPI = async () => {
    if (!upiApp) {
      toast({
        title: "Please select a UPI app",
        variant: "destructive"
      });
      return;
    }
    
    if (!upiId || !upiId.includes("@")) {
      toast({
        title: "Please enter a valid UPI ID",
        description: "UPI ID should be in format username@bankcode",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "UPI Mandate Created Successfully!",
        description: "Your auto-debit has been set up.",
        variant: "default"
      });
      
      // Navigate to dashboard after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error setting up UPI mandate",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBack = () => {
    switch (investmentType) {
      case "daily":
        router.push("/daily-returns-preview");
        break;
      case "monthly":
        router.push("/monthly-returns-preview");
        break;
      case "lumpsum":
        router.push("/lump-sum-returns-preview");
        break;
      default:
        router.push("/investment-setup");
    }
  };
  
  return (
    <>
      <Head>
        <title>UPI Auto-Debit Setup - 2PC Savings App</title>
        <meta name='description' content='Setup your UPI auto-debit for automated savings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Let's Automate Your Savings
            </h1>
            <p className="text-gray-600 mt-2">
              Set up a UPI auto-debit so your daily/monthly savings happen automatically. It's secure, easy, and keeps your goals on track.
            </p>
          </div>
          
          <Card className="mb-6 border border-blue-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Your Investment Plan</h2>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-800 font-medium">
                  {getInvestmentText()}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select UPI App
                  </label>
                  <Select
                    value={upiApp}
                    onValueChange={setUpiApp}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your UPI app" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpay">Google Pay</SelectItem>
                      <SelectItem value="phonepe">PhonePe</SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your UPI ID
                  </label>
                  <Input
                    placeholder="e.g. vini12345@okicici"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your UPI ID is usually your username@bankcode
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6 border border-green-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Confirmation</h2>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  {getDeductionText()}
                </p>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <BadgeCheck className="h-4 w-4 text-blue-600" />
                <p className="text-sm text-gray-700">
                  Secure and RBI compliant
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleSetupUPI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Setting Up...
              </>
            ) : (
              <>
                Setup UPI Auto-Debit
                <ArrowRight size={18} />
              </>
            )}
          </Button>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={handleBack}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Returns Preview
            </Button>
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
            <Shield size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              You can pause or change this anytime from your dashboard.
            </p>
          </div>
        </div>
        <BottomNavigation />
      </main>
    </>
  );
}