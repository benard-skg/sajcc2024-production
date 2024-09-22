// components/LogOutButton.js
"use client";

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function LogOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
      Log Out
    </Button>
  );
}