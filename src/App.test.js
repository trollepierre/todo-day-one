import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Day One Pierre Trollé Test technique text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Day One Pierre Trollé Test technique/i);
  expect(linkElement).toBeInTheDocument();
});
