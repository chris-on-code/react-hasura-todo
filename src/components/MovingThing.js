import React from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";

const GET_VOTES = gql`
  subscription {
    votes {
      votes
    }
  }
`;

const UPDATE_VOTES = gql`
  mutation update_votes {
    update_votes(where: { id: { _eq: 1 } }, _inc: { votes: 1 }) {
      affected_rows
      returning {
        votes
      }
    }
  }
`;

export default function MovingThing() {
  const { loading, error, data } = useSubscription(GET_VOTES);
  const [mutate] = useMutation(UPDATE_VOTES);

  if (loading) return <div />;

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const votes = data.votes[0].votes;
  console.log(votes);

  return (
    <div>
      {votes} <button onClick={() => mutate()}>Update</button>
    </div>
  );
}
