"use client";

import BasicForm from "../Componets/basicForm/page";
import Navbar from "@/app/Componets/navbar/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function register() {
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

          <BasicForm />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
