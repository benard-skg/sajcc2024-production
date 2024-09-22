// app/profile/page.js
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from '../firebase/clientApp';
import LogOutButton  from "@/components/LogOutButton";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/signin');
  }, [session, status, router]);

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.uid) {
        try {
          const db = getFirestore(app);
          const userDoc = await getDoc(doc(db, "users", session.user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setError("User data not found. Please complete your profile.");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("An error occurred while fetching your data. Please try again later.");
        }
      }
    }

    if (session) fetchUserData();
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <LogOutButton />
      <div className="space-y-2">
        <p><strong>Email:</strong> {session.user.email}</p>
        <p><strong>Full Name:</strong> {userData.fullName}</p>
        <p><strong>Region:</strong> {userData.region}</p>
        <p><strong>Chess ID:</strong> {userData.chessId}</p>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Team Info</h2>
      <div className="space-y-2">
        <p><strong>Team Name:</strong> {userData.team?.name || 'N/A'}</p>
        <p><strong>Rank:</strong> {userData.team?.rank || 'N/A'}</p>
        <p><strong>Join Date:</strong> {userData.team?.joinDate ? new Date(userData.team.joinDate).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
}