import Navbar from "@/app/Componets/navbar/navbar";
import EditProfile from "../Componets/editProfile/page";

import UnableAccount from "../Componets/UnableAccount/page";
import JobsPanel from "../Componets/JobsPanel/page";

export default async function profile(){

    return (
        <div>
            <Navbar/>
            <br />
            <br />
            <br />
            <br />
            <br />
            <EditProfile/>
            <JobsPanel></JobsPanel>
            <UnableAccount></UnableAccount>
        </div>
    )
}