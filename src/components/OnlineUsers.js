import React from "react";
import { gql, useSubscription } from "@apollo/client";

const GET_ONLINE_USERS = gql`
  subscription getOnlineUsers {
    online_users {
      id
      user {
        name
      }
    }
  }
`;

export default function OnlineUsers() {
  const { loading, error, data } = useSubscription(GET_ONLINE_USERS);

  if (loading) return <div />;

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { online_users } = data;
  console.log(data);

  return (
    <div className="flex space-x-2 justify-center items-center">
      {online_users.map((user) => (
        <div key={user.id}>
          <img
            src={`https://api.adorable.io/avatars/64/${user.user.name}@adorable.png`}
            className="h-5 w-5 rounded-full"
            alt={user.user.name}
          />
        </div>
      ))}
    </div>
  );
}
