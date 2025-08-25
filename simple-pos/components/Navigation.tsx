import { auth, currentUser } from "@clerk/nextjs/server";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

export default async function Navigation() {
  const { userId } = await auth();
  const user = await currentUser();
  
  const userRole = user?.publicMetadata?.role as string | undefined;

  if (!userId) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">
              SimplePOS
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              
              {(userRole === 'admin' || userRole === 'waiter') && (
                <Link 
                  href="/orders" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Orders
                </Link>
              )}
              
              {(userRole === 'admin' || userRole === 'kitchen') && (
                <Link 
                  href="/kitchen" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Kitchen
                </Link>
              )}
              
              {(userRole === 'admin' || userRole === 'cashier') && (
                <Link 
                  href="/cashier" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cashier
                </Link>
              )}
              
              {userRole === 'admin' && (
                <>
                  <Link 
                    href="/events" 
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Events
                  </Link>
                  <Link 
                    href="/settings" 
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Settings
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">{user?.firstName || "User"}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole || "No role"}</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}