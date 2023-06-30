"use client";

import Authent from "../Componets/auth/page";
import Navbar from "@/app/Componets/navbar/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../Componets/Loading/page";

export default function login() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsReady(false);
        router.push("/offerBoard");
      } else {
        setIsReady(true);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {isReady ? (
        <div>
          <Navbar />
          <Authent />
          <Loading></Loading>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}
