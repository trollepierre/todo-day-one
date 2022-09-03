import { gql } from '@apollo/client';

export const GET_TODO = gql`
  query GetTodo($id: ID!) {
    getTodoById(id: $id) {
      id
      createdAt
      type
      isDone
      text
      title
    }
  }
`;
