

"use client"

import React from 'react';
import style from "./paginator.module.scss";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { setPage } from "@/app/redux/services/filtersSlice";

interface PaginatorProps {
  statePage: boolean;
   totalWizards : number;

}

 

export default function Paginator({ totalWizards,  statePage }: PaginatorProps) {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.filters.page);

 const totalPages =  Math.ceil(totalWizards / 9); 
  let paginatorView:number[] = [page];
  const paginatorMax = 3
  const mediumLeft = paginatorMax % 2 !== 0? Math.floor(paginatorMax/2): paginatorMax/2 ;
  const mediumRight = paginatorMax % 2 !== 0? Math.floor(paginatorMax/2): paginatorMax/2 -1;

  const paginatorLeft = page > mediumLeft ?  mediumLeft : page -1;
  const paginatorRight = page + mediumRight <= totalPages ? mediumRight : totalPages - page;

if(paginatorLeft > 0){
  let numPaginatorLeft = page - 1;
  for (let i = 1; i <= paginatorLeft; i++) {
    paginatorView.unshift(numPaginatorLeft);
    numPaginatorLeft--;
  }
}

if(paginatorRight > 0){
  let numPaginatorRight = page + 1;
  for (let i = 1; i <= paginatorRight; i++) {
    paginatorView.push(numPaginatorRight);
    numPaginatorRight++;
  }
}

if(paginatorView.length < paginatorMax){
  if(paginatorView[0] > 1){
    let numPaginatorLeft = paginatorView[0] - 1;
    for (let i = paginatorView.length; i < paginatorMax; i++) {
      paginatorView.unshift(numPaginatorLeft);
      numPaginatorLeft--;
    }
  }else if(paginatorView[paginatorView.length -1] < totalPages){
    let numPaginatorRight = paginatorView[paginatorView.length -1] + 1;
    for (let i = paginatorView.length; i < paginatorMax; i++) {
      paginatorView.push(numPaginatorRight);
      numPaginatorRight++;
    }
  }
}


  if (page > totalPages) return null;



  return (
    <div className={style.contPaginator}>
      <button onClick={() => dispatch(setPage(1))} disabled={page === 1} className={style.btnFirst}> First </button>
      <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1} className={style.btn}> Prev </button>
{

  paginatorView.map((item, index) => {
    return (
      <button className={item == page?style.btnSelected:style.btnSelect} key={index} onClick={() => dispatch(setPage(item))}>
        {item}
      </button>
    )
  }
  )
}
      <button onClick={() => dispatch(setPage(page + 1))} disabled={page === totalPages} className={style.btn}> Next </button>
      <button onClick={() => dispatch(setPage(totalPages))} disabled={page === totalPages} className={style.btnFirst}> Last </button>
    </div>)
}
