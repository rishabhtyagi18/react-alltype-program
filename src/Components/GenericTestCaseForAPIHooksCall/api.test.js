// __tests__/apiClient.test.js
import { getData } from './api';

describe('getData', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return data when fetch succeeds', async () => {
      const mockData = { id: 1, title: 'Test Post' };
      fetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });
  
      const data = await getData('https://jsonplaceholder.typicode.com/posts/1');
      expect(data).toEqual(mockData);
    });
  
    it('should throw error on failed fetch', async () => {
      fetch.mockResolvedValue({ ok: false });
  
      await expect(getData('https://jsonplaceholder.typicode.com/posts/1'))
        .rejects
        .toThrow('API Error');
    });
  });
  
