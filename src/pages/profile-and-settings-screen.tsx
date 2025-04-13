import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  CreditCard,
  Phone,
  Target,
  Edit,
  Wallet,
  Lock,
  ChevronDown,
  ChevronUp,
  DollarSign,
  History
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function ProfileAndSettingsScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>("profile");
  const [autoSavingEnabled, setAutoSavingEnabled] = useState(true);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleLogout = () => {
    router.push("/login");
  };
  
  const handleEditProfile = () => {
    alert("Edit profile functionality will be implemented here");
  };
  
  const handleEditUPI = () => {
    router.push("/upi-setup");
  };
  
  const handleChangeMobile = () => {
    alert("Change mobile number functionality will be implemented here");
  };
  
  const handleToggleAutoSaving = () => {
    setAutoSavingEnabled(!autoSavingEnabled);
    alert(`Auto-saving has been ${!autoSavingEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleUpdateGoal = () => {
    router.push("/goal-selection");
  };

  const handleSmartLoan = () => {
    router.push("/smart-loan-screen");
  };

  const handleLoanHistory = () => {
    router.push("/loan-history-screen");
  };
  
  return (
    <>
      <Head>
        <title>Account & Settings - 2PC Savings App</title>
        <meta name='description' content='Manage your account and settings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Account & Settings
            </h1>
          </div>
          
          {/* Profile Section */}
          <Card className="mb-4 border border-gray-200 overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              onClick={() => toggleSection("profile")}
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-800">Profile</span>
              </div>
              {expandedSection === "profile" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedSection === "profile" && (
              <CardContent className="p-4 pt-0 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium">Vinish</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mobile</span>
                    <span className="font-medium">+91 90163 88002</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleEditProfile}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
          
          {/* Goals Section */}
          <Card className="mb-4 border border-gray-200 overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              onClick={() => toggleSection("goals")}
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-800">Goals</span>
              </div>
              {expandedSection === "goals" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedSection === "goals" && (
              <CardContent className="p-4 pt-0 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Goal</span>
                    <span className="font-medium">Trip to Italy 2025</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleUpdateGoal}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Rename or Update Goal</span>
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
          
          {/* UPI Info Section */}
          <Card className="mb-4 border border-gray-200 overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              onClick={() => toggleSection("upi")}
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-800">UPI Info</span>
              </div>
              {expandedSection === "upi" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedSection === "upi" && (
              <CardContent className="p-4 pt-0 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">UPI App</span>
                    <span className="font-medium">Google Pay</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">UPI ID</span>
                    <span className="font-medium">vini12345@okicici</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Auto-Debit</span>
                    <span className="font-medium">₹20 daily from ICICI Bank</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleEditUPI}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit UPI Setup</span>
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
          
          {/* Loan Section - Add this new section */}
          <Card className='mb-4 border border-gray-200 overflow-hidden'>
            <button 
              className='w-full flex items-center justify-between p-4 text-left hover:bg-gray-50'
              onClick={() => toggleSection('loans')}
            >
              <div className='flex items-center gap-3'>
                <div className='bg-navy-100 p-2 rounded-full'>
                  <DollarSign className='h-5 w-5 text-navy-700' />
                </div>
                <span className='font-medium text-gray-800'>Loans</span>
              </div>
              {expandedSection === 'loans' ? (
                <ChevronUp className='h-5 w-5 text-gray-400' />
              ) : (
                <ChevronDown className='h-5 w-5 text-gray-400' />
              )}
            </button>
            
            {expandedSection === 'loans' && (
              <CardContent className='p-4 pt-0 border-t border-gray-100'>
                <div className='space-y-4'>
                  <button 
                    className='w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-md'
                    onClick={handleSmartLoan}
                  >
                    <span className='text-gray-700'>Apply for Smart Loan</span>
                    <ChevronRight className='h-5 w-5 text-gray-400' />
                  </button>
                  
                  <button 
                    className='w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-md'
                    onClick={handleLoanHistory}
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-gray-700'>Loan History</span>
                      <span className='text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>Active</span>
                    </div>
                    <ChevronRight className='h-5 w-5 text-gray-400' />
                  </button>
                </div>
              </CardContent>
            )}
          </Card>
          
          {/* Security Section */}
          <Card className="mb-4 border border-gray-200 overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              onClick={() => toggleSection("security")}
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <span className="font-medium text-gray-800">Security</span>
              </div>
              {expandedSection === "security" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedSection === "security" && (
              <CardContent className="p-4 pt-0 border-t border-gray-100">
                <div className="space-y-4">
                  <button 
                    className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-md"
                    onClick={handleChangeMobile}
                  >
                    <span className="text-gray-700">Change Mobile Number</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  <div className="flex items-center justify-between p-2">
                    <span className="text-gray-700">Auto-Saving</span>
                    <Switch 
                      checked={autoSavingEnabled} 
                      onCheckedChange={handleToggleAutoSaving} 
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
          
          {/* Logout Button */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50 mt-6"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-6">
            App Version 1.0.0
          </p>
        </div>
      </main>
      
      <BottomNavigation />
    </>
  );
}