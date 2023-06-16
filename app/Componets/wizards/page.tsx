"use client";
import { useGetWizardsQuery, User } from "../../redux/services/userApi";
import Wizard from '../wizard/page'



export default function wizards() {
    const { data } = useGetWizardsQuery({});


    console.log(data)
    return (
        <div>
            {data&&data.map((wizardUser: User) => {
                return <Wizard key={wizardUser._id} wizardUser={wizardUser} />
            })}
        </div>
    )
}