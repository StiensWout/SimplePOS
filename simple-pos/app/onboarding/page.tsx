import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function OnboardingPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to SimplePOS! 👋</h1>
        <p className="text-xl text-gray-600 mb-8">
          Hello {user?.firstName || "there"}, let's get you set up.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Your Role</h2>
            <p className="text-gray-600 mb-4">
              Choose your primary role in the organization. This will determine what features you can access.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <h3 className="font-semibold text-lg">👨‍💼 Admin</h3>
                <p className="text-sm text-gray-600 mt-1">Full system access, manage events and settings</p>
              </button>
              
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all">
                <h3 className="font-semibold text-lg">🍽️ Waiter</h3>
                <p className="text-sm text-gray-600 mt-1">Take orders and manage tables</p>
              </button>
              
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all">
                <h3 className="font-semibold text-lg">👨‍🍳 Kitchen</h3>
                <p className="text-sm text-gray-600 mt-1">View and process incoming orders</p>
              </button>
              
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all">
                <h3 className="font-semibold text-lg">💰 Cashier</h3>
                <p className="text-sm text-gray-600 mt-1">Process payments and close orders</p>
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Organization Setup</h2>
            <p className="text-gray-600 mb-4">
              You'll need to be added to an organization by an admin, or create your own if you're setting up a new system.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Create Organization
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Join Existing
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <Link 
              href="/dashboard"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue to Dashboard →
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              You can complete setup later from your dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}