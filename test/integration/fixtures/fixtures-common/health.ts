import { expect } from 'vitest';

export default [
  {
    testName: 'health',
    endpoints: ['/health'],
    response: { is_healthy: true },
  },

  {
    testName: 'health/clock',
    endpoints: ['/health/clock'],
    response: { server_time: expect.any(Number) },
  },
];
