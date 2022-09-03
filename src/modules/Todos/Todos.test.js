import { render, screen } from '@testing-library/react'
import Todos from './Todos'
import { MockedProvider } from "@apollo/client/testing"
import { GET_TODOS } from '../../gpl-helpers/todos-queries'
import { dummyTodo } from '../../dummies/dummyTodo'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom')

describe('Todos', () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(() => {})
  })
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
          variables: { filters: { types: ['RH', 'Marketing', 'Communication', 'Tech'], isDone: undefined}, orderBy: 'DATE_ASC' }

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
  // TODO: test the list is filtered by business todo
  // TODO: test the list is filtered by reset filters
})
