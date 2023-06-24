"use client";

import React from "react";
import { useEffect, useState } from "react";

export interface UserFormValues {
  totalPaid: number;
  user_info: {
    name: string;
    image: string;
  };
}

export default function adminTableBuyer() {
  const [buyerData, setBuyerData] = useState<UserFormValues[]>([]);

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/jobs/top-buyers"
    )
      .then((response) => response.json())
      .then((data) => {
        setBuyerData(data);
      });
  }, []);

  return (
    <div>
      <h1>Best Buyers</h1>
      <div>
        <ul>
          {buyerData.map((buyer) => (
            <li>
              <img
                src={buyer.user_info.image}
                alt={""}
                width="50"
                height="50"
              />
              <p>{buyer.user_info.name}</p>
              <p>U$D {buyer.totalPaid}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
