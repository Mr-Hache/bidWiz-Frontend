"use client";

import React from "react";
import { useEffect, useState } from "react";

export interface UserFormValues {
  name: string;
  experience: {
    expJobs: number;
  };
  image: string;
}

export default function adminTableSeller() {
  const [sellerData, setSellerData] = useState<UserFormValues[]>([]);

  useEffect(() => {
    fetch(
      "https://bidwiz-backend-production-db77.up.railway.app/users/top-sellers"
    )
      .then((response) => response.json())
      .then((data) => {
        setSellerData(data);
      });
  }, []);

  return (
    <div>
      <h1>Best Sellers</h1>
      <div>
        <ul>
          {sellerData.slice(0, 5).map((seller) => (
            <li>
              <img src={seller.image} alt={""} width="50" height="50" />
              <p>{seller.name}</p>
              <p>{seller.experience.expJobs}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
