"use client";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import EditProfile from "../editProfile/editProfile";
import UnableAccount from "../UnableAccount/unableAccount";
import Accordion from "../accordion/accordion";
import styles from "../ProtectionProfile/ProtectionProfile.module.scss";
import MyCalendar from "../myCalendar/myCalendar";

import { useRouter } from "next/navigation";
import WizardPanel from "../WizardPanel/wizardPanel";
import UserPanel from "../UserPanel/userPanel";
import Loading from "../Loading/Loading";

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
            <Accordion title="My Calendar">
              <MyCalendar/>
            </Accordion>
            <Accordion title="Management Account">
              <UnableAccount />
            </Accordion>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProtectionProfile;
