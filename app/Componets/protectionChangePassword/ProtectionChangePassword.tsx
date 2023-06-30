"use client";
import {auth} from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import FormChangePassword from "../formChangePassword/formChangePassword";
import {useRouter} from "next/navigation"
import Loading from "../Loading/page";

const ProtectionChangePassword = () => {
    const [isReady, setIsReady] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsReady(false)
                router.push("/offerBoard");
            } else {
                setIsReady(true);
            }
        });
        return () => unsubscribe();
    }, []);

  return (
    <div>
        {
            isReady? <div>
            <Navbar />
            <br />
            <br />
            <br />
            <br />
            <br />
            <FormChangePassword></FormChangePassword>
        </div> : <Loading></Loading>
        }
    </div>
  )
}

export default ProtectionChangePassword