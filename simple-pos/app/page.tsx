import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = await auth();
  
  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to SimplePOS
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The volunteer-first point-of-sale system for local organizations
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/sign-in"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-3">🚀 Simple Setup</h2>
            <p className="text-gray-600">
              Get your event up and running in minutes with our intuitive interface designed for volunteers.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-3">📱 Mobile First</h2>
            <p className="text-gray-600">
              Take orders on any device. Our responsive design works perfectly on phones, tablets, and computers.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-3">🔄 Real-Time Updates</h2>
            <p className="text-gray-600">
              Orders flow instantly from waiters to kitchen displays with live status updates across all devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}