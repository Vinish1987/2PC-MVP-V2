import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  CreditCard,
  Phone
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function ProfileAndSettingsScreen() {
  const router = useRouter();
  
  const handleLogout = () => {
    router.push("/login");
  };
  
  return (
    <>
      <Head>
        <title>Profile & Settings - 2PC Savings App</title>
        <meta name='description' content='Manage your profile and app settings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Profile & Settings
            </h1>
          </div>
          
          {/* User Profile Card */}
          <Card className="mb-6 border border-gray-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Vinish Kumar</h2>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={() => alert("Edit profile clicked")}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          {/* Settings Options */}
          <Card className="mb-6 border border-gray-200">
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    onClick={() => alert("Payment methods clicked")}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-800">Payment Methods</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    onClick={() => alert("Notifications clicked")}
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-800">Notifications</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    onClick={() => alert("Security clicked")}
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-800">Security</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    onClick={() => alert("Help & Support clicked")}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-800">Help & Support</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    onClick={() => alert("Contact Us clicked")}
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-800">Contact Us</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Logout Button */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
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