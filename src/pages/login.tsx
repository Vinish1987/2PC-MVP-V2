import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginSignupScreen() {
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [isNewUser, setIsNewUser] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setTimer(30);
    setCanResend(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const validateInput = () => {
    if (loginMethod === "phone") {
      if (!contactInfo || contactInfo.length < 10) {
        alert("Please enter a valid phone number");
        return false;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!contactInfo || !emailRegex.test(contactInfo)) {
        alert("Please enter a valid email address");
        return false;
      }
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call the API here
      // const response = await fetch('/api/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     contactType: loginMethod, 
      //     contactInfo 
      //   })
      // });
      
      setShowOtpSection(true);
      startTimer();
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call the API here to verify OTP and check if user exists
      // const response = await fetch('/api/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     contactType: loginMethod, 
      //     contactInfo, 
      //     otp 
      //   })
      // });
      // const data = await response.json();
      // const isNewUser = data.isNewUser;

      // For prototype, assume 123456 always works
      if (otp === "123456") {
        // Simulate checking if user is new or existing
        // For demo purposes, we'll randomly determine if user is new
        // In a real app, this would come from the API response
        const mockIsNewUser = Math.random() > 0.5;
        setIsNewUser(mockIsNewUser);
        
        // Redirect based on user status
        if (mockIsNewUser) {
          router.push("/goal-selection");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert("Invalid OTP. For this prototype, use 123456.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    handleSendOtp();
  };

  const handleTabChange = (value: string) => {
    setLoginMethod(value as "phone" | "email");
    setContactInfo("");
    setShowOtpSection(false);
    setOtp("");
  };

  return (
    <>
      <Head>
        <title>Login - 2PC Savings App</title>
        <meta name="description" content="Login to 2PC Savings App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6">
        <div className="w-full max-w-md mx-auto mt-10 sm:mt-16">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5E5ADB]">2PC – Start Saving Smarter</h1>
            <p className="text-gray-600 mt-2 text-base">Login or create an account to get started</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Welcome!</h2>
              <p className="text-gray-500 mt-1">Sign up to get started.</p>
            </div>
            
            {!showOtpSection ? (
              <>
                <Tabs 
                  defaultValue="phone" 
                  className="w-full" 
                  onValueChange={handleTabChange}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="phone" className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>Phone</span>
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>Email</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="phone" className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Enter phone number
                      </label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-3 border border-r-0 border-gray-300 bg-gray-100 rounded-l-md">
                          +91
                        </div>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="12345 67890"
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          className="rounded-l-none"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSendOtp} 
                      className="w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white rounded-lg py-6 text-base font-medium transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        'Send Code'
                      )}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="email" className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Enter Your Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="youremail@example.com"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        className="rounded-md"
                        disabled={isLoading}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSendOtp} 
                      className="w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white rounded-lg py-6 text-base font-medium transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        'Send Code'
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-medium text-gray-800">ENTER OTP</h3>
                </div>
                
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <div className="text-center text-sm">
                  <p className="text-gray-500">
                    {canResend ? (
                      <button 
                        onClick={handleResendOtp} 
                        className="text-[#5E5ADB] hover:text-[#5E5ADB]/80 font-medium"
                      >
                        Resend Code
                      </button>
                    ) : (
                      <>Resend Code in <span className="font-medium">{timer}s</span></>
                    )}
                  </p>
                </div>
                
                <Button 
                  onClick={handleVerifyOtp} 
                  className="w-full bg-[#5E5ADB] hover:bg-[#5E5ADB]/90 text-white rounded-lg py-6 text-base font-medium transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}