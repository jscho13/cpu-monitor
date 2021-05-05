import React from 'react';
import App from '../App';
import { sleep } from './test.utils';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(1.2)
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders OK status', async () => {
  act(() => {
    render(<App />);
  });
  const okStatus = screen.getByText(/OK/);
  expect(okStatus).toBeInTheDocument();
});

it('renders HIGH LOAD status', async () => {
  act(() => {
    render(<App pollInterval={100} />);
  });
  await act(() => sleep(1200));
  const hlStatus = screen.getByText(/HIGH LOAD/);
  expect(hlStatus).toBeInTheDocument();
});

it('renders OK status after HIGH LOAD', async () => {
  act(() => {
    render(<App pollInterval={100} />);
  });
  await act(() => sleep(1200));
  const hlStatus = screen.getByText(/HIGH LOAD/);
  expect(hlStatus).toBeInTheDocument();

  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(0.5)
  })

  await act(() => sleep(1200));
  const okStatus = screen.getByText(/OK/);
  expect(okStatus).toBeInTheDocument();
});

