import { fireEvent, render, screen } from '@testing-library/react'
import { TodoDetails } from './TodoDetails'
import { MockedProvider } from "@apollo/client/testing"
import { GET_TODO } from '../../gpl-helpers/todo-queries'
import { dummyTodo } from '../../dummies/dummyTodo'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'id'}),
  Link: ({children}) => <div data-testid="Link">{children}</div>
}))

describe('TodoDetails', () => {
  it('should render Loading when no respond from apollo', async () => {
    const mocks = []
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoDetails/>
      </MockedProvider>
    )
    expect(await screen.findByText("Loading...")).toBeInTheDocument()
  })

  // TODO: testing error

  it('should render todo with details when apollo returns todo', async () => {
    const mocks = [
      {
        request: {
          query: GET_TODO,
          variables: { id: 'id' }

        },
        result: {
          data: {
            getTodoById: dummyTodo()
          }
        }
      }
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoDetails/>
      </MockedProvider>
    )
    expect(await screen.findByText("Title : dummy title")).toBeInTheDocument()
    expect(await screen.findByText("Type : RH")).toBeInTheDocument()
    expect(await screen.findByText("Created at : 2021-10-04T14:27:20.000Z")).toBeInTheDocument()
    expect(await screen.findByText("Is Done : ❌")).toBeInTheDocument()
    expect(await screen.findByText("Go back home")).toBeInTheDocument()
  })
})
