"use client";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import EditProfile from "../editProfile/page";
import UnableAccount from "../UnableAccount/page";
import Accordion from "../accordion/accordion";
import styles from "../ProtectionProfile/ProtectionProfile.module.scss";

import { useRouter } from "next/navigation";
import WizardPanel from "../WizardPanel/page";
import UserPanel from "../UserPanel/page";

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
      {isReady ? (
        <div>
          <Navbar />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className={styles.containerAccordion}>
            <Accordion title="Edit Profile">
              <EditProfile />
            </Accordion>
            <Accordion title="Wizard Panel">
              <WizardPanel />
            </Accordion>
            <Accordion title="User Panel">
              <UserPanel />
            </Accordion>
            <Accordion title="Management Account">
              <UnableAccount />
            </Accordion>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default ProtectionProfile;
