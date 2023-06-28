"use client";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import EditProfile from "../editProfile/page";
import JobsPanel from "../JobsPanel/page";
import UnableAccount from "../UnableAccount/page";
import {useRouter} from "next/navigation"



const ProtectionProfile = () => {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsReady(true);
  
        } else {
            setIsReady(false);
            router.push("/login");  
        }
      });
      return () => unsubscribe();
    }, []);
    return (
      <div>
        {
          isReady?  <div>
          <Navbar />
          <br />
          <br />
          <br />
          <br />
          <br />
          <EditProfile />
          <JobsPanel></JobsPanel>
          <UnableAccount></UnableAccount>
        </div> : <div>loading...</div>
        }
      </div>
     
    );
}

export default ProtectionProfile