"use client";

import React from "react";
import { useEffect, useState } from "react";

export interface UserFormValues {
  totalPaid: number;
  user_info: {
    name: string;
  };
}

export default function adminTableSeller() {
  const [buyerData, setBuyerData] = useState<UserFormValues[]>([]);
  const [earnersData, setEarnersData] = useState<UserFormValues[]>([]);

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/jobs/top-buyers"
    )
      .then((response) => response.json())
      .then((data) => {
        setBuyerData(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/jobs/top-earners"
    )
      .then((response) => response.json())
      .then((data) => {
        setEarnersData(data);
      });
  }, []);

  return (
    <div>
      <h1>Sellers</h1>
      <div>
        <ul>
          {buyerData.map((buyer) => (
            <li>
              <p>{buyer.user_info.name}</p>
              <p>Total Paid: {buyer.totalPaid}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
