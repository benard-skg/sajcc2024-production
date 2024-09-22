// hooks/useUserData.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getFirestore, doc, getDoc } from "firebase/firestore";

export function useUserData() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.uid) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", session.user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    }

    fetchUserData();
  }, [session]);

  return userData;
}