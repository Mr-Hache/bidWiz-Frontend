"use client";
import { useGetWizardsQuery, User } from "../../redux/services/userApi";
import Wizard from '../wizard/page'
import Paginator from '../paginator/page'
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";

import { setWizards } from "@/app/redux/services/wizardsSlice";
import { useEffect, useState } from "react";

import style from "./wizards.module.scss"


export default function wizards() {
  const size = 9;
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.filters.page);
  const wizards = useAppSelector((state) => state.wizards.wizards);
  const { data } = useGetWizardsQuery({});
  const [statePage, setStatePage] = useState(true);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const allowPage = Math.ceil(totalPage / size);
    if(page == allowPage) {
      setStatePage(false);
    }
    else {
      setStatePage(true);
    }
  }, [page, totalPage])


  useEffect(() => {
    fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/wizards/count`)
      .then(response => {
        if (!response.ok) {
          throw new Error('ERROR Request');
        }
        return response.json();
      })
      .then(data => {
        setTotalPage(data);

      })
      .catch(error => {
        console.log(error);
      });
  })

  useEffect(() => {
    if (!wizards || wizards.length === 0) {
      dispatch(setWizards(data));
    }
  }, [wizards, dispatch, data]);


  useEffect(() => {
    fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/wizards?page=${page}&size=${size}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('ERROR Request');
        }
        return response.json();
      })
      .then(data => {
        dispatch(setWizards(data));
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);

  return (
    <div className={style.contCard}>
      {wizards && wizards.map((wizardUser: User) => {
        return <Wizard key={wizardUser._id} wizardUser={wizardUser} />
      })}
      <Paginator statePage={statePage}/>
    </div>
  )
}