import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos($filters: TodoFiltersInput, $orderBy: Ordering) {
    getTodoList(filters: $filters, orderBy: $orderBy) {
      id
      createdAt
      type
      isDone
      text
      title
    }
  }
`;
