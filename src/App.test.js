import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./modules/Todos/Todos', () => () => <div data-testid="Todos"/>)

it('should render Day One Pierre Trollé Test technique text', () => {
  render(<App />);
  const header = screen.getByText(/Day One Pierre Trollé Test technique/i);
  expect(header).toBeInTheDocument();
});

it('should render Todos components', () => {
  render(<App />);
  const todosComponent = screen.getByTestId(/Todos/i);
  expect(todosComponent).toBeInTheDocument();
});
