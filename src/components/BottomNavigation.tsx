import React from "react";
import { useRouter } from "next/router";
import { Home, BarChart2, List, User, Scan } from "lucide-react";

export default function BottomNavigation() {
  const router = useRouter();
  const currentPath = router.pathname;

  // Check if the current page should show bottom navigation
  const shouldShowNavigation = () => {
    // Don't show on UPI setup screen or investment-setup screen
    if (currentPath === '/upi-setup' || currentPath === '/investment-setup') {
      return false;
    }
    return true;
  };

  const isActive = (path: string) => {
    if (path === '/profile-and-settings-screen' && currentPath === '/profile-and-settings-screen') {
      return true;
    }
    if (path === '/dash-investment-setup' && currentPath === '/dash-investment-setup') {
      return true;
    }
    return currentPath === path;
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  if (!shouldShowNavigation()) {
    return null;
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50'>
      {/* Main navigation bar */}
      <div className='bg-[#5E5ADB] text-white h-16 flex items-center justify-around px-2 shadow-lg'>
        {/* Home */}
        <button
          onClick={() => navigateTo('/dashboard')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
            isActive('/dashboard') ? 'text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          <Home size={24} />
          <span className='text-xs mt-1 font-medium'>Home</span>
        </button>

        {/* Investment */}
        <button
          onClick={() => navigateTo('/dash-investment-setup')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
            isActive('/dash-investment-setup') ? 'text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          <BarChart2 size={24} />
          <span className='text-xs mt-1 font-medium'>Investment</span>
        </button>

        {/* Center button placeholder to maintain spacing */}
        <div className='w-16 h-full'></div>

        {/* Transaction */}
        <button
          onClick={() => navigateTo('/transaction-history')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
            isActive('/transaction-history') ? 'text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          <List size={24} />
          <span className='text-xs mt-1 font-medium'>Transaction</span>
        </button>

        {/* Account */}
        <button
          onClick={() => navigateTo('/profile-and-settings-screen')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
            isActive('/profile-and-settings-screen') || isActive('/smart-loan-screen') ? 'text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          <User size={24} />
          <span className='text-xs mt-1 font-medium'>Account</span>
        </button>
      </div>

      {/* Floating center button */}
      <button
        onClick={() => navigateTo('/upi-scan')}
        className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-[#5E5ADB] rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95'
      >
        <Scan size={24} />
        <span className='text-xs mt-1 font-medium'>Scan UPI</span>
      </button>
    </div>
  );
}