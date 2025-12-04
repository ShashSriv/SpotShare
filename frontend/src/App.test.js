import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ParkPanthers title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/ParkPanthers/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
