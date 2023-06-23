import React, { useEffect } from "react";
import {
  useGetUsersQuery,
  useDisableUserMutation,
} from "../../redux/services/userApi";
import { User } from "../../redux/services/userApi";

function AdminDisabled() {
  const { data: users, refetch } = useGetUsersQuery(null);
  const [disableUser, { isLoading: disableLoading }] = useDisableUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDisableUser = async (userId: string) => {
    try {
      await disableUser({ _id: userId });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Disable Panel</h1>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          overflowY: "scroll",
          maxHeight: "400px",
          width: "400px", // Puedes ajustar el ancho según tus necesidades
          backgroundColor: "white",
        }}
      >
        {users?.map((user: User) => (
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
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.reviews}</p>
            </div>
            {!user.isDisabled && (
              <button
                onClick={() => handleDisableUser(user._id)}
                disabled={disableLoading}
                style={{ marginLeft: "auto" }}
              >
                Disable User
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDisabled;
