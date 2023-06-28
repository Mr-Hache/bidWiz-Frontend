"use client"

import Navbar from "@/app/Componets/navbar/navbar";
import AdminDashboard from "../adminDashboard/adminDashboard";
import styles from "./ProtectionAdmin.module.scss";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectionAdmin = () => {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsReady(true);
          fetch(
              `https://bidwiz-backend-production-db77.up.railway.app/users/user/${user.uid}`
            ).then ((response) => response.json())
              .then((data) => {
                  if (data.name === "bidwiz.admin") {
                      setIsReady(true);
                  }  else {
                      setIsReady(false);
                      router.push("/login");
                  }
              })
              .catch((error) => console.error(error));
  
        } else {
          setIsReady(false);
          router.push("/login");
        }
      });
      return () => unsubscribe();
    }, []);
  
    return (
      <div>
        {isReady ? (
          <div className={styles.adminPage}>
            <Navbar />
            <br />
            <div>
              <div className={styles.title}>
                <h1>Dashboard Admin</h1>
              </div>
              <AdminDashboard />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    );
}
export default ProtectionAdmin