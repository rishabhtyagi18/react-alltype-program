// __tests__/useFetchData.test.js
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react'; // ✅ NEW
import { useFetchData } from './useFetchData'; // Adjust the import path as necessary

describe('useFetchData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data after fetch', async () => {
    const mockData = { id: 1, title: 'Test Post' };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() =>
      useFetchData('https://jsonplaceholder.typicode.com/posts/1')
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    fetch.mockResolvedValue({ ok: false });

    const { result } = renderHook(() =>
      useFetchData('https://jsonplaceholder.typicode.com/posts/1')
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
