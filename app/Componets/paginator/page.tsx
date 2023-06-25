"use client"
 
import React from 'react';
import style from "./paginator.module.scss";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { setPage } from "@/app/redux/services/filtersSlice";

interface PaginatorProps {
  statePage: boolean;
}

export default function Paginator({ statePage }: PaginatorProps) {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.filters.page);
  const totalPages = 5; 

  const handlePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (value === "Next" && page < totalPages) {
      statePage ? dispatch(setPage(page + 1)) : null;
    } else if (value === "Prev" && page > 1) {
      dispatch(setPage(page - 1));
    }
  }

  const isLastPage = page === totalPages;
  const isFirstPage = page === 1;

  return (
    <div className={style.contPaginator}>
      <button onClick={handlePage} value="Prev" disabled={isFirstPage}>
        Prev
      </button>
      <span>{page}</span>
      <button onClick={handlePage} value="Next" disabled={isLastPage}>
        Next
      </button>
    </div>
  );
}