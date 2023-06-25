"use client";

import React from "react";
import { useEffect, useState } from "react";

export interface UserFormValues {
  totalEarned: number;
  user_info: {
    name: string;
    image: string;
  };
}

export default function adminTableEarners() {
  const [earnersData, setEarnersData] = useState<UserFormValues[]>([]);

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
      <h1>Highest Earners</h1>
      <div>
        <ul>
          {earnersData.slice(0, 5).map((seller) => (
            <li>
              <img
                src={seller.user_info.image}
                alt={""}
                width="50"
                height="50"
              />
              <p>{seller.user_info.name}</p>
              <p> U$D {seller.totalEarned}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
