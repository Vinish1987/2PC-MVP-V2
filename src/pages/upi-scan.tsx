import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scan, ArrowLeft, Camera, Loader2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function UPIScanScreen() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Simulate scanning process
  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulate a successful scan after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
    }, 2000);
  };

  // Simulate payment process
  const handlePay = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Scan & Pay - 2PC Savings App</title>
        <meta name='description' content='Scan UPI QR code and pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex flex-col items-center justify-start p-4 sm:p-6 pb-20'>
        <div className='w-full max-w-md mx-auto mt-6 sm:mt-10 mb-16'>
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-bold text-gray-800">
              Scan & Pay
            </h1>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative">
                {isScanning ? (
                  <div className="flex flex-col items-center">
                    <Loader2 size={40} className="text-blue-500 animate-spin mb-2" />
                    <p className="text-gray-600">Scanning...</p>
                  </div>
                ) : scanned ? (
                  <div className="flex flex-col items-center">
                    <div className="text-green-500 mb-2">✓</div>
                    <p className="text-gray-800 font-medium">QR Code Scanned Successfully</p>
                    <p className="text-gray-600 text-sm mt-2">Pay to: Merchant Name</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Camera size={40} className="text-gray-400 mb-2" />
                    <p className="text-gray-600">Position QR code in the frame</p>
                  </div>
                )}
              </div>
              
              {!isScanning && !scanned && (
                <Button 
                  onClick={handleStartScan}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              )}
              
              {scanned && (
                <div className="w-full space-y-4">
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">₹500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To</span>
                      <span className="font-medium">Merchant Name</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handlePay}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  >
                    Pay ₹500.00
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-gray-500">
            <p>Scan any UPI QR code to make a payment</p>
            <p className="mt-1">Secure and instant payments</p>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </>
  );
}