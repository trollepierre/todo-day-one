import { render, screen } from '@testing-library/react'
import App from './App'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

jest.mock('./modules/Todos/Todos', () => () => <div data-testid="Todos"/>)

describe('App', () => {
  it('should render Day One Pierre Trollé Test technique text', () => {
    render(<App/>)
    const header = screen.getByText(/Day One Pierre Trollé Test technique/i)
    expect(header).toBeInTheDocument()
  })

  it('should render Todos component', () => {
    render(<App/>)
    const todosComponent = screen.getByTestId(/Todos/i)
    expect(todosComponent).toBeInTheDocument()
  })

  it.skip('should render Todo component', () => {
    // TODO: to achieve it, extract BrowserRoutes and test here its child thanks to MemoryRouter
    const { container } = render(
      <MemoryRouter initialEntries={['/todo/5']}>
        <App />
      </MemoryRouter>,
    )
    expect(container).toMatchSnapshot()
  })
})
