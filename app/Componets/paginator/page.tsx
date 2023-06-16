"use client"
import React from 'react'
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { setPage } from "@/app/redux/services/filtersSlice";



export default function paginator() {
    
const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.filters.page);

    const handlePage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.value === "Next" ? dispatch(setPage(page + 1)) : page==1?null:dispatch(setPage(page - 1)); 
        
    }



    
  return (
     <div>
        <button  onClick={handlePage}>Prev</button>
        <span>{page}</span>
        <button value="Next" onClick={handlePage}>Next</button>
     </div> 
  )
  }