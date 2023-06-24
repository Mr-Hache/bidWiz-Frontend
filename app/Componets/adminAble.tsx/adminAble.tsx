"use client"

import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useAbleUserMutation,
} from "../../redux/services/userApi";
import { User } from "../../redux/services/userApi"

function AdminAble() {
    const { data: users, refetch } = useGetUsersQuery(null);
    const [ableUser, { isLoading: ableLoading }] = useAbleUserMutation();
    const [search, setSearch] = useState("");
  
    useEffect(() => {
      refetch();
    }, [refetch]);
  
    const handleAbleUser = async (userId: string) => {
        console.log("handleAbleUser called with userId: ", userId);
      try {
        const response = await ableUser({ _id: userId });
        console.log("Mutation response: ", response);
        refetch();
      } catch (error) {
        console.error(error);
        console.error("Mutation error: ", error);
      }
    };
  
    const filteredUsers = users?.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <div>
        <h1>Able Panel</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            overflowY: "scroll",
            maxHeight: "400px",
            width: "600px",
            backgroundColor: "white",
          }}
        >
            {filteredUsers?.filter(user => user.isDisabled).sort((a,b) => b.reviews - a.reviews).map((user: User) => (
            <div
            key={user._id}
            style={{
                display: "flex",
                alignItems: "center",
                height: "60px",
                borderBottom: "1px solid gray",
                padding: "10px",
            }}
            >
              <img src={user.image} alt={user.name} width="50" height="50" />
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p>{Number(user.reviews.toFixed(1))}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
              {user.isDisabled && (
                <button
                  onClick={() => handleAbleUser(user._id)}
                  disabled={ableLoading}
                  style={{ marginLeft: "auto" }}
                >
                  Able User
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default AdminAble;
  