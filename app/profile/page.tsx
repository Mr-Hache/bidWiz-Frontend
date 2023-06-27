import Navbar from "@/app/Componets/navbar/navbar";
import EditProfile from "../Componets/editProfile/page";

import UnableAccount from "../Componets/UnableAccount/page";
import JobsPanel from "../Componets/JobsPanel/page";
import Accordion from "../Componets/accordion/accordion";

export default async function profile() {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>My Profile</h1>
      <Accordion title="Edit Profile">
        <EditProfile />
      </Accordion>
      <Accordion title="Jobs Panel">
        <JobsPanel />
      </Accordion>
      <Accordion title="Unable Account">
        <UnableAccount />
      </Accordion>
    </div>
  );
}
