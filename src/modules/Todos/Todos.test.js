import { render, screen } from '@testing-library/react'
import Todos from './Todos'
import { MockedProvider } from "@apollo/client/testing"
import { GET_TODOS } from '../../gpl-helpers/todos-queries'
import { dummyTodo } from '../../dummies/dummyTodo'

describe('Todos', () => {
  it('should render Loading when no respond from apollo', async () => {
    const mocks = []
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Todos/>
      </MockedProvider>
    )
    expect(await screen.findByText("Loading...")).toBeInTheDocument()
  })

  it('should render todos when apollo returns some todos', async () => {
    const mocks = [
      {
        request: {
          query: GET_TODOS,
        },
        result: {
          data: {
            getTodoList: [dummyTodo()]
          }
        }
      }
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Todos/>
      </MockedProvider>
    )
    expect(await screen.findByText("dummy title")).toBeInTheDocument();
  })

  // TODO: test the list is sorted by createdDate
  // TODO: test the list is filtered by type
  // TODO: test the list is filtered by status
})
