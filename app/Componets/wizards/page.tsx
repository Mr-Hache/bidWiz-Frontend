"use client";
import { useGetWizardsQuery, User } from "../../redux/services/userApi";
import Wizard from '../wizard/page'
import Paginator from '../paginator/page'
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";

import { setWizards } from "@/app/redux/services/wizardsSlice";
import { useEffect } from "react";

export default function wizards() {
 const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.filters.page);
    const wizards = useAppSelector((state) => state.wizards.wizards);
    const { data } = useGetWizardsQuery({});

    useEffect(() => {
        if (!wizards || wizards.length === 0) {
        dispatch(setWizards(data));
        }
    }, [wizards, dispatch, data]);


    return (
        <div>
            {wizards&&wizards.map((wizardUser: User) => {
                return <Wizard key={wizardUser._id} wizardUser={wizardUser} />
            })}
            <Paginator />
        </div>
    )
}