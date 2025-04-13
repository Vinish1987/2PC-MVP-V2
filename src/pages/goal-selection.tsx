import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Plane, Car, GraduationCap, Smartphone, Plus } from "lucide-react";

interface GoalChipProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function GoalChip({ icon, label, isSelected, onClick }: GoalChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 w-full ${
        isSelected 
          ? "bg-blue-100 border-2 border-blue-500 shadow-md" 
          : "bg-white border border-gray-200 shadow-sm hover:shadow hover:border-gray-300"
      }`}
    >
      <div className={`p-2 rounded-full ${isSelected ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-500"}`}>
        {icon}
      </div>
      <span className={`font-medium ${isSelected ? "text-blue-700" : "text-gray-700"}`}>{label}</span>
    </button>
  );
}

export default function GoalSelectionScreen() {
  const router = useRouter();
  const [goalSelected, setGoalSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('there');

  useEffect(() => {
    // In a real app, you would fetch the user's name from an API or local storage
    // For demo purposes, we'll use a hardcoded name or get it from query params
    const { name } = router.query;
    if (name && typeof name === 'string') {
      setUserName(name);
    } else {
      // Simulate getting user's name
      const mockNames = ['Vinish', 'Rahul', 'Priya', 'Amit', 'Sneha'];
      setUserName(mockNames[Math.floor(Math.random() * mockNames.length)]);
    }
  }, [router.query]);

  const goals = [
    { id: "travel", label: "Travel / Trip", icon: <Plane size={20} /> },
    { id: "vehicle", label: "Bike / Car", icon: <Car size={20} /> },
    { id: "education", label: "Child's Education", icon: <GraduationCap size={20} /> },
    { id: "electronics", label: "Phone / Laptop", icon: <Smartphone size={20} /> },
    { id: "other", label: "Something Else", icon: <Plus size={20} /> }
  ];

  const handleGoalSelect = (goalId: string) => {
    setGoalSelected(goalId);
  };

  const handleNext = () => {
    if (!goalSelected) {
      alert("Please select a savings goal to continue");
      return;
    }

    setIsLoading(true);
    
    // In a real app, you might want to save this selection to a user profile
    // For now, we'll just simulate a delay and navigate
    setTimeout(() => {
      router.push("/investment-setup");
    }, 500);
  };

  const handleSkip = () => {
    router.push("/investment-setup");
  };

  return (
    <>
      <Head>
        <title>Select Your Goal - 2PC Savings App</title>
        <meta name='description' content='Select your savings goal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-between p-4 sm:p-6'>
        <div className='w-full max-w-md mx-auto mt-8 mb-auto'>
          <div className='mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              Hey {userName}, what are you investing/saving for?
            </h1>
            <p className='text-gray-600 mt-2'>
              Select a goal that matches your savings objective
            </p>
          </div>
          
          <div className="space-y-3 animate-fadeIn">
            {goals.map((goal) => (
              <GoalChip
                key={goal.id}
                icon={goal.icon}
                label={goal.label}
                isSelected={goalSelected === goal.id}
                onClick={() => handleGoalSelect(goal.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto mt-8 space-y-3">
          <Button 
            onClick={handleNext} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl"
            disabled={isLoading}
          >
            Next
          </Button>
          
          <div className="text-center">
            <button 
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Skip for now
            </button>
          </div>
        </div>
      </main>
    </>
  );
}