import Navbar from "@/app/Componets/navbar/navbar";
import EditProfile from "../Componets/editProfile/page";

import UnableAccount from "../Componets/UnableAccount/page";
import JobsPanel from "../Componets/JobsPanel/page";
import Accordion from "../Componets/accordion/accordion";
import styles from "./profile.module.scss";

export default async function profile() {
  return (
    <div>
      <Navbar />
      <br />
      <div className={styles.containerAccordion}>
        <Accordion title="Edit Profile">
          <EditProfile />
        </Accordion>
        <Accordion title="Jobs Panel">
          <JobsPanel />
        </Accordion>
        <Accordion title="Management Account">
          <UnableAccount />
        </Accordion>
      </div>
    </div>
  );
}
