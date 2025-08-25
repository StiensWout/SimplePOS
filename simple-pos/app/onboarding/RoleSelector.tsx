'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserRole, type UserRole } from '@/app/actions/updateUserRole';

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRoleSelect = async (role: UserRole) => {
    setSelectedRole(role);
    setIsLoading(true);
    
    try {
      const result = await updateUserRole(role);
      
      if (result.success) {
        // Redirect to dashboard after successful role assignment
        router.push('/dashboard');
      } else {
        alert('Failed to set role. Please try again.');
        setIsLoading(false);
        setSelectedRole(null);
      }
    } catch (error) {
      console.error('Error setting role:', error);
      alert('An error occurred. Please try again.');
      setIsLoading(false);
      setSelectedRole(null);
    }
  };

  const roles: { id: UserRole; icon: string; title: string; description: string; color: string }[] = [
    {
      id: 'admin',
      icon: '👨‍💼',
      title: 'Admin',
      description: 'Full system access, manage events and settings',
      color: 'blue'
    },
    {
      id: 'waiter',
      icon: '🍽️',
      title: 'Waiter',
      description: 'Take orders and manage tables',
      color: 'green'
    },
    {
      id: 'kitchen',
      icon: '👨‍🍳',
      title: 'Kitchen',
      description: 'View and process incoming orders',
      color: 'orange'
    },
    {
      id: 'cashier',
      icon: '💰',
      title: 'Cashier',
      description: 'Process payments and close orders',
      color: 'purple'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Select Your Role</h2>
      <p className="text-gray-600 mb-4">
        Choose your primary role in the organization. This will determine what features you can access.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            disabled={isLoading}
            className={`p-4 border-2 border-gray-200 rounded-lg transition-all ${
              isLoading && selectedRole === role.id
                ? `border-${role.color}-500 bg-${role.color}-100`
                : `hover:border-${role.color}-500 hover:bg-${role.color}-50`
            } ${isLoading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <h3 className="font-semibold text-lg">
              {role.icon} {role.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{role.description}</p>
            {isLoading && selectedRole === role.id && (
              <p className="text-xs mt-2 text-gray-500">Setting up your role...</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}