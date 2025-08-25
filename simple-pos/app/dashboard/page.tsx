import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">SimplePOS Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                New Order
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Kitchen Display
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                Cashier
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Today's Stats</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Orders: <span className="font-bold">0</span></p>
              <p className="text-gray-600">Revenue: <span className="font-bold">$0.00</span></p>
              <p className="text-gray-600">Active Tables: <span className="font-bold">0</span></p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-2">
              <p className="text-green-600">✓ Online</p>
              <p className="text-green-600">✓ Database Connected</p>
              <p className="text-green-600">✓ Auth Active</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            <strong>Note:</strong> This is a placeholder dashboard. Full functionality will be implemented in upcoming stories.
          </p>
        </div>
      </div>
    </div>
  );
}