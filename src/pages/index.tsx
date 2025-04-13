import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page
    router.push("/login");
  }, [router]);

  return (
    <>
      <Head>
        <title>2PC Savings App</title>
        <meta name='description' content='Start saving smarter with 2PC' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <main className='min-h-screen bg-[#E4E1FF] flex items-center justify-center p-4 sm:p-6'>
        <div className='text-center space-y-4 bg-white p-8 rounded-xl shadow-md animate-fadeIn'>
          <h1 className='text-4xl font-bold text-[#5E5ADB]'>2PC Savings App</h1>
          <p className='text-lg text-gray-600'>Redirecting to login...</p>
        </div>
      </main>
    </>
  );
}