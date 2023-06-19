"use client"
import React from 'react'
import style from "./paginator.module.scss"
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { setPage } from "@/app/redux/services/filtersSlice";

interface PaginatorProps {
   statePage: boolean;
 }


export default function paginator({ statePage }: PaginatorProps) {
    
const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.filters.page);

    const handlePage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.value === "Next" ? statePage?dispatch(setPage(page + 1)): null : page==1?null:dispatch(setPage(page - 1));         
    }
    
  return (
     <div className={style.contPaginator}>
        <button  onClick={handlePage}>Prev</button>
        <span>{page}</span>
        <button value="Next" onClick={handlePage}>Next</button>
     </div> 
  )
  }