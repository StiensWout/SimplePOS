'use server';

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export type UserRole = 'admin' | 'waiter' | 'kitchen' | 'cashier';

export async function updateUserRole(role: UserRole, organizationId?: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
        ...(organizationId && { organizationId })
      }
    });

    // Revalidate the dashboard and onboarding pages
    revalidatePath('/dashboard');
    revalidatePath('/onboarding');
    
    return { success: true, role };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error: 'Failed to update role' };
  }
}