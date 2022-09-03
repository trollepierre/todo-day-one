import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    getTodoList {
      id
      createdAt
      type
      isDone
      text
      title
    }
  }
`;
