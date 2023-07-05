"use client";

import Authent from "../Componets/auth/authent";
import Navbar from "@/app/Componets/navbar/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../Componets/Loading/Loading";
import styles from "./login.module.scss";

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
          <div className={styles.login}>
            <Authent />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
