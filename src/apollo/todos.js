import { gql } from "@apollo/client";

export const ALL_TODOS = gql`
  query AllTodos {
    allTodos {
      id
      title
      completed
    }
  }
`;
