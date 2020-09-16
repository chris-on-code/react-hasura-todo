import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos {
      id
      title
      created_at
      is_completed
    }
  }
`;

export default function Todos() {
  const { loading, error, data } = useQuery(GET_MY_TODOS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  console.log(data);

  return (
    <div>
      {data.todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
